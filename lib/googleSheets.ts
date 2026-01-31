// lib/googleSheets.ts
// Fetch salesperson rankings and delivery log from Google Sheets

const RANKINGS_SPREADSHEET_ID = "1rqIYaIWK-rqxCwULE4IPibrLAcn8p9hRX_abJn8lR84";
const RANKINGS_SHEET_NAME = "Current";

const DELIVERY_LOG_SPREADSHEET_ID = "18MsFJckUAR1549ArywXz5tAn7M1q87jb8dzqVQhUWPQ";

export type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

export type DeliveryStats = {
  todaysDeliveries: number;
  todaysDeals: Array<{
    customerName: string;
    salesperson: string;
    vehicle: string;
    newUsed: string;
  }>;
  // MTD from Tracking Sheet
  mtdNewUnits: number;
  mtdUsedUnits: number;
  mtdTotalUnits: number;
  mtdTotalGross: string;
  // Objectives
  newUnitObjective: number;
  usedUnitObjective: number;
  totalUnitObjective: number;
  grossObjective: string;
  // Pacing
  newUnitPacing: number;
  usedUnitPacing: number;
  totalUnitPacing: number;
  // Activity
  mtdCalls: number;
  mtdEmails: number;
  mtdTexts: number;
  mtdVideos: number;
  mtdTotalActivity: number;
  // Leads
  mtdInternetLeads: number;
  mtdPhoneLeads: number;
  mtdWalkIns: number;
  mtdCampaign: number;
  mtdTotalLeads: number;
  // Days
  daysWorked: number;
  totalWorkingDays: number;
};

export async function fetchSalespersonRankings(): Promise<SalespersonRanking[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${RANKINGS_SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(RANKINGS_SHEET_NAME)}`;
    
    const response = await fetch(url, { 
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      console.error("Failed to fetch Google Sheet:", response.statusText);
      return [];
    }
    
    const text = await response.text();
    
    // Parse the JSONP response - remove the callback wrapper
    const jsonString = text.replace(/^\/\*O_o\*\/\n?google\.visualization\.Query\.setResponse\(/, "").replace(/\);$/, "");
    const data = JSON.parse(jsonString);
    
    if (!data.table || !data.table.rows) {
      console.error("Invalid data structure from Google Sheet");
      return [];
    }
    
    // Map columns to our expected structure
    const cols = data.table.cols.map((c: { label: string }) => c.label.toLowerCase().replace(/\s+/g, "_"));
    
    const rankings: SalespersonRanking[] = data.table.rows.map((row: { c: Array<{ v: string | number | null }> }) => {
      const values = row.c.map((cell) => cell?.v ?? null);
      
      // Create object from column names and values
      const obj: Record<string, string | number | null> = {};
      cols.forEach((col: string, index: number) => {
        obj[col] = values[index];
      });
      
      return {
        salesperson: String(obj.salesperson || ""),
        units_sold: Number(obj.units_sold) || 0,
        total_activity: Number(obj.total_activity) || 0,
        closing_pct: Number(obj.closing_pct) || 0,
        google_reviews: Number(obj.google_reviews) || 0,
        total_score: Number(obj.total_score) || 0,
        rank: Number(obj.rank) || 0,
      };
    }).filter((r: SalespersonRanking) => r.salesperson); // Filter out empty rows
    
    return rankings;
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    return [];
  }
}

export async function fetchDeliveryStats(): Promise<DeliveryStats> {
  const defaultStats: DeliveryStats = {
    todaysDeliveries: 0,
    todaysDeals: [],
    mtdNewUnits: 0,
    mtdUsedUnits: 0,
    mtdTotalUnits: 0,
    mtdTotalGross: "$0",
    newUnitObjective: 0,
    usedUnitObjective: 0,
    totalUnitObjective: 0,
    grossObjective: "$0",
    newUnitPacing: 0,
    usedUnitPacing: 0,
    totalUnitPacing: 0,
    mtdCalls: 0,
    mtdEmails: 0,
    mtdTexts: 0,
    mtdVideos: 0,
    mtdTotalActivity: 0,
    mtdInternetLeads: 0,
    mtdPhoneLeads: 0,
    mtdWalkIns: 0,
    mtdCampaign: 0,
    mtdTotalLeads: 0,
    daysWorked: 0,
    totalWorkingDays: 0,
  };

  try {
    // Fetch both today's sheet and tracking sheet in parallel
    const today = new Date();
    const todaySheetName = formatDateForSheetName(today);
    
    const [todayData, trackingData] = await Promise.all([
      fetchSheetCSV(todaySheetName),
      fetchSheetCSV("TRACKING SHEET"),
    ]);

    // Parse today's deliveries
    let todaysDeliveries = 0;
    const todaysDeals: DeliveryStats['todaysDeals'] = [];
    
    if (todayData && !todayData.includes("<!DOCTYPE html>")) {
      const lines = todayData.split('\n');
      for (const line of lines) {
        const columns = parseCSVLine(line);
        if (columns.length > 15) {
          const customerName = columns[14]?.trim();
          const dealNumber = columns[15]?.trim();
          const newUsed = columns[17]?.trim();
          const soldYear = columns[19]?.trim();
          const soldMake = columns[20]?.trim();
          const soldModel = columns[21]?.trim();
          const salesperson1 = columns[10]?.trim();
          
          if (customerName && 
              dealNumber && 
              /^\d+$/.test(dealNumber) && 
              soldYear && 
              soldMake &&
              customerName !== "Customer Name") {
            todaysDeliveries++;
            todaysDeals.push({
              customerName,
              salesperson: salesperson1 || "Unknown",
              vehicle: `${soldYear} ${soldMake} ${soldModel || ""}`.trim(),
              newUsed: newUsed || "Unknown"
            });
          }
        }
      }
    }

    // Start with today's deliveries
    const stats = { ...defaultStats, todaysDeliveries, todaysDeals };
    
    // Parse tracking sheet for MTD stats
    if (trackingData && !trackingData.includes("<!DOCTYPE html>")) {
      const lines = trackingData.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const columns = parseCSVLine(line);
        const lineJoined = columns.join('|').toLowerCase();
        
        // Days Worked
        if (lineJoined.includes("days worked")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 0 && num < 32) stats.daysWorked = num;
        }
        
        // Total Working Days
        if (lineJoined.includes("total working days")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 0 && num < 32) stats.totalWorkingDays = num;
        }
        
        // Unit Objectives - look for rows with objective values
        if (lineJoined.includes("used car") && !lineJoined.includes("gross") && !lineJoined.includes("pvr")) {
          const nums = findAllNumbersInColumns(columns);
          if (nums.length >= 2) {
            stats.usedUnitObjective = nums[0] || 80;
            stats.usedUnitPacing = nums[1] || 0;
          }
        }
        if (lineJoined.includes("new car") && !lineJoined.includes("gross") && !lineJoined.includes("pvr")) {
          const nums = findAllNumbersInColumns(columns);
          if (nums.length >= 2) {
            stats.newUnitObjective = nums[0] || 50;
            stats.newUnitPacing = nums[1] || 0;
          }
        }
        if (lineJoined.includes("total units") && !lineJoined.includes("mtd")) {
          const nums = findAllNumbersInColumns(columns);
          if (nums.length >= 2) {
            stats.totalUnitObjective = nums[0] || 130;
            stats.totalUnitPacing = nums[1] || 0;
          }
        }
        
        // MTD Units from Store Total section
        if (lineJoined.includes("total units mtd") && columns.some(c => c.toLowerCase().includes("store"))) {
          const num = findNumberInColumns(columns, 1);
          if (num > 0) stats.mtdTotalUnits = num;
        }
        
        // New Cars MTD
        if (i > 0 && lines[i-1] && parseCSVLine(lines[i-1]).join('|').toLowerCase().includes("new cars")) {
          if (lineJoined.includes("total units mtd")) {
            const num = findNumberInColumns(columns, 1);
            if (num > 0 && num < 200) stats.mtdNewUnits = num;
          }
        }
        
        // Used Cars MTD
        if (i > 0 && lines[i-1] && parseCSVLine(lines[i-1]).join('|').toLowerCase().includes("used cars")) {
          if (lineJoined.includes("total units mtd")) {
            const num = findNumberInColumns(columns, 1);
            if (num > 0 && num < 200) stats.mtdUsedUnits = num;
          }
        }
        
        // Total Gross MTD (store total)
        if (lineJoined.includes("total gross mtd") && !lineJoined.includes("front") && !lineJoined.includes("back")) {
          const currency = findCurrencyInColumns(columns);
          if (currency) stats.mtdTotalGross = currency;
        }
        
        // Gross Objective
        if (lineJoined.includes("total gross") && lineJoined.includes("objective")) {
          const currency = findCurrencyInColumns(columns);
          if (currency) stats.grossObjective = currency;
        }
        
        // Activity Tracking - MTD Activity section
        if (lineJoined.includes("phone calls") && !lineJoined.includes("per day")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 1000) stats.mtdCalls = num;
        }
        if (lineJoined.includes("emails sent") && !lineJoined.includes("per day")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 1000) stats.mtdEmails = num;
        }
        if ((lineJoined.includes("texts") || lineJoined.match(/\btexts?\b/)) && !lineJoined.includes("per day")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 1000) stats.mtdTexts = num;
        }
        if (lineJoined.includes("videos") && !lineJoined.includes("per day")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 100) stats.mtdVideos = num;
        }
        
        // Total Activity (row that just says "Total" with a big number)
        if ((columns[0]?.trim().toLowerCase() === "total" || columns[1]?.trim().toLowerCase() === "total") && 
            !lineJoined.includes("units") && !lineJoined.includes("gross")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 20000) stats.mtdTotalActivity = num;
        }
        
        // Lead Tracking - MTD Leads section
        if (lineJoined.includes("internet") && !lineJoined.includes("closing") && !lineJoined.includes("report") && !lineJoined.includes("apts")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 100 && num < 1000) stats.mtdInternetLeads = num;
        }
        if (lineJoined.match(/\bphone\b/) && !lineJoined.includes("calls")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 50 && num < 500) stats.mtdPhoneLeads = num;
        }
        if (lineJoined.includes("walk in")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 10 && num < 200) stats.mtdWalkIns = num;
        }
        if (lineJoined.includes("campaign")) {
          const num = findNumberInColumns(columns, 1);
          if (num > 50 && num < 500) stats.mtdCampaign = num;
        }
      }
      
      // Set calculated values if not found directly
      if (stats.mtdTotalUnits === 0 && (stats.mtdNewUnits > 0 || stats.mtdUsedUnits > 0)) {
        stats.mtdTotalUnits = stats.mtdNewUnits + stats.mtdUsedUnits;
      }
      if (stats.mtdTotalActivity === 0) {
        stats.mtdTotalActivity = stats.mtdCalls + stats.mtdEmails + stats.mtdTexts + stats.mtdVideos;
      }
      if (stats.mtdTotalLeads === 0) {
        stats.mtdTotalLeads = stats.mtdInternetLeads + stats.mtdPhoneLeads + stats.mtdWalkIns + stats.mtdCampaign;
      }
      
      // Set default objectives if not found
      if (stats.usedUnitObjective === 0) stats.usedUnitObjective = 80;
      if (stats.newUnitObjective === 0) stats.newUnitObjective = 50;
      if (stats.totalUnitObjective === 0) stats.totalUnitObjective = 130;
      if (stats.grossObjective === "$0") stats.grossObjective = "$275,000";
    }
    
    return stats;
  } catch (error) {
    console.error("Error fetching Delivery Log:", error);
    return defaultStats;
  }
}

async function fetchSheetCSV(sheetName: string): Promise<string | null> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${DELIVERY_LOG_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      redirect: 'follow'
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

function findNumberInColumns(columns: string[], minIndex: number = 0): number {
  for (let i = columns.length - 1; i >= minIndex; i--) {
    const num = parseNumber(columns[i]);
    if (num > 0) return num;
  }
  return 0;
}

function findAllNumbersInColumns(columns: string[]): number[] {
  const nums: number[] = [];
  for (const col of columns) {
    const num = parseNumber(col);
    if (num > 0) nums.push(num);
  }
  return nums;
}

function findCurrencyInColumns(columns: string[]): string | null {
  for (const col of columns) {
    if (col && col.includes("$")) {
      return col.replace(/['"]/g, '').trim();
    }
  }
  return null;
}

function parseNumber(str: string): number {
  if (!str) return 0;
  const cleaned = str.replace(/[$,'"()]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.abs(Math.round(num * 100) / 100);
}

// Format date to match sheet tab names like "Friday January 31st"
function formatDateForSheetName(date: Date): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  
  const ordinal = getOrdinalSuffix(dayNum);
  
  return `${dayName} ${monthName} ${dayNum}${ordinal}`;
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// Helper function to parse CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  
  return result;
}
