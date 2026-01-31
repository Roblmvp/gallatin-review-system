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
  // Days
  daysWorked: number;
  totalWorkingDays: number;
  // Volume Objectives
  newUnitObjective: number;
  usedUnitObjective: number;
  totalUnitObjective: number;
  // Gross Objectives
  newGrossObjective: string;
  usedGrossObjective: string;
  totalGrossObjective: string;
  // MTD Units
  mtdNewUnits: number;
  mtdUsedUnits: number;
  mtdTotalUnits: number;
  // MTD Gross
  mtdNewGross: string;
  mtdUsedGross: string;
  mtdTotalGross: string;
  // Pacing Units
  newUnitPacing: number;
  usedUnitPacing: number;
  totalUnitPacing: number;
  // Pacing Gross
  newGrossPacing: string;
  usedGrossPacing: string;
  totalGrossPacing: string;
  // Daily Activity Averages
  dailyCalls: number;
  dailyEmails: number;
  dailyTexts: number;
  dailyVideos: number;
  dailyTotalActivity: number;
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
    daysWorked: 0,
    totalWorkingDays: 0,
    newUnitObjective: 50,
    usedUnitObjective: 80,
    totalUnitObjective: 130,
    newGrossObjective: "$75,000",
    usedGrossObjective: "$200,000",
    totalGrossObjective: "$275,000",
    mtdNewUnits: 0,
    mtdUsedUnits: 0,
    mtdTotalUnits: 0,
    mtdNewGross: "$0",
    mtdUsedGross: "$0",
    mtdTotalGross: "$0",
    newUnitPacing: 0,
    usedUnitPacing: 0,
    totalUnitPacing: 0,
    newGrossPacing: "$0",
    usedGrossPacing: "$0",
    totalGrossPacing: "$0",
    dailyCalls: 0,
    dailyEmails: 0,
    dailyTexts: 0,
    dailyVideos: 0,
    dailyTotalActivity: 0,
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
    
    // Parse tracking sheet by row positions
    // Based on the CSV structure:
    // Row 0: Title
    // Row 1: Days Worked (col 2 = value)
    // Row 2: Total Working Days (col 2 = value)
    // Row 3: Unit Objective / Tracking header
    // Row 4: Column headers (Sold Pacing, Gross Objective)
    // Row 5: Used Car - col 2=objective(80), col 3=pacing, col 5=gross obj, col 6=gross pacing
    // Row 6: New Car - col 2=objective(50), col 3=pacing, col 5=gross obj, col 6=gross pacing
    // Row 7: Total Units - col 2=objective(130), col 3=pacing, col 5=gross obj, col 6=gross pacing
    // Row 8: New Cars / Used Cars / Store Total headers
    // Row 9: Total Units MTD - col 2=new(33), col 4=used(60), col 6=total(93)
    // Row 10: Total Front Gross MTD
    // Row 11: Total Back Gross MTD
    // Row 12: Total Gross MTD - col 2=new gross, col 4=used gross, col 6=total gross
    // Row 13: Total Units Pacing - col 2=new, col 4=used, col 6=total
    // Row 14: Total Front Gross Pacing
    // Row 15: Total Back Gross Pacing
    // Row 16: Total Gross Pacing - col 2=new, col 4=used, col 6=total
    // Row 17: ACTIVITY TRACKING header
    // Row 18: MTD Activity / MTD LEADS headers
    // Row 19: Phone Calls/Internet - col 6=Calls Per Day value
    // Row 20: Emails Sent/Phone - col 6=Emails Per Day value
    // Row 21: Texts/Walk Ins - col 6=Texts Per Day value
    // Row 22: Videos/Campaign - col 6=Videos Per Day value
    // Row 23: Total - col 6=Total Activity Per Day value
    
    if (trackingData && !trackingData.includes("<!DOCTYPE html>")) {
      const lines = trackingData.split('\n');
      const rows: string[][] = lines.map(line => parseCSVLine(line));
      
      // Days Worked (Row 1, Col C = index 2)
      if (rows[1]) {
        stats.daysWorked = parseNumber(rows[1][2]) || 0;
      }
      
      // Total Working Days (Row 2, Col C = index 2)
      if (rows[2]) {
        stats.totalWorkingDays = parseNumber(rows[2][2]) || 0;
      }
      
      // Row 5: Used Car objectives (C27 in sheet = row index 5 in 0-based after header adjustments)
      // Row 6: New Car objectives (C28 in sheet)
      // Row 7: Total Units objectives (C29 in sheet)
      if (rows[5]) {
        stats.usedUnitObjective = parseNumber(rows[5][2]) || 80;
        stats.usedGrossObjective = parseCurrency(rows[5][5]) || "$200,000";
      }
      if (rows[6]) {
        stats.newUnitObjective = parseNumber(rows[6][2]) || 50;
        stats.newGrossObjective = parseCurrency(rows[6][5]) || "$75,000";
      }
      if (rows[7]) {
        stats.totalUnitObjective = parseNumber(rows[7][2]) || 130;
        stats.totalGrossObjective = parseCurrency(rows[7][5]) || "$275,000";
      }
      
      // Row 9: Total Units MTD (C33, E33, G33 = cols 2, 4, 6)
      if (rows[9]) {
        stats.mtdNewUnits = parseNumber(rows[9][2]) || 0;
        stats.mtdUsedUnits = parseNumber(rows[9][4]) || 0;
        stats.mtdTotalUnits = parseNumber(rows[9][6]) || 0;
      }
      
      // Row 12: Total Gross MTD (C36, E36, G36 = cols 2, 4, 6)
      if (rows[12]) {
        stats.mtdNewGross = parseCurrency(rows[12][2]) || "$0";
        stats.mtdUsedGross = parseCurrency(rows[12][4]) || "$0";
        stats.mtdTotalGross = parseCurrency(rows[12][6]) || "$0";
      }
      
      // Row 13: Total Units Pacing (C37, E37, G37 = cols 2, 4, 6)
      if (rows[13]) {
        stats.newUnitPacing = parseNumber(rows[13][2]) || 0;
        stats.usedUnitPacing = parseNumber(rows[13][4]) || 0;
        stats.totalUnitPacing = parseNumber(rows[13][6]) || 0;
      }
      
      // Row 16: Total Gross Pacing (C40, E40, G40 = cols 2, 4, 6)
      if (rows[16]) {
        stats.newGrossPacing = parseCurrency(rows[16][2]) || "$0";
        stats.usedGrossPacing = parseCurrency(rows[16][4]) || "$0";
        stats.totalGrossPacing = parseCurrency(rows[16][6]) || "$0";
      }
      
      // Daily Activity Averages (G46-G50 = col 6, rows 19-23 in 0-based)
      if (rows[19]) {
        stats.dailyCalls = parseNumber(rows[19][6]) || 0;
      }
      if (rows[20]) {
        stats.dailyEmails = parseNumber(rows[20][6]) || 0;
      }
      if (rows[21]) {
        stats.dailyTexts = parseNumber(rows[21][6]) || 0;
      }
      if (rows[22]) {
        stats.dailyVideos = parseNumber(rows[22][6]) || 0;
      }
      if (rows[23]) {
        stats.dailyTotalActivity = parseNumber(rows[23][6]) || 0;
      }
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

function parseNumber(str: string): number {
  if (!str) return 0;
  const cleaned = str.replace(/[$,'"()]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.abs(Math.round(num));
}

function parseCurrency(str: string): string {
  if (!str) return "$0";
  // Clean up the string
  const cleaned = str.replace(/['"]/g, '').trim();
  if (cleaned.includes("$")) {
    return cleaned;
  }
  // If it's just a number, format as currency
  const num = parseFloat(cleaned.replace(/[,()]/g, ''));
  if (!isNaN(num)) {
    return "$" + Math.abs(num).toLocaleString();
  }
  return "$0";
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
