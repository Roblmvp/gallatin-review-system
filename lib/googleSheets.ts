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
  mtdNew: number;
  mtdUsed: number;
  mtdTotal: number;
  totalGrossMTD: string;
  todaysDeals: Array<{
    customerName: string;
    salesperson: string;
    vehicle: string;
    newUsed: string;
  }>;
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
    mtdNew: 0,
    mtdUsed: 0,
    mtdTotal: 0,
    totalGrossMTD: "$0",
    todaysDeals: [],
  };

  try {
    // Get today's date and format it to match sheet tab names like "Thursday January 1st"
    const today = new Date();
    const sheetName = formatDateForSheetName(today);
    
    const url = `https://docs.google.com/spreadsheets/d/${DELIVERY_LOG_SPREADSHEET_ID}/export?format=csv&gid=0`;
    
    // First, try to get today's specific sheet
    const todayUrl = `https://docs.google.com/spreadsheets/d/${DELIVERY_LOG_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    
    const response = await fetch(todayUrl, { 
      next: { revalidate: 60 }, // Cache for 1 minute for more frequent updates
      redirect: 'follow'
    });
    
    if (!response.ok) {
      console.error("Failed to fetch Delivery Log for today:", response.statusText);
      return defaultStats;
    }
    
    const csvText = await response.text();
    
    // Check if we got an error page (sheet not found)
    if (csvText.includes("<!DOCTYPE html>") || csvText.includes("<HTML>")) {
      console.error("Today's sheet not found:", sheetName);
      return defaultStats;
    }
    
    const lines = csvText.split('\n');
    
    let todaysDeliveries = 0;
    let mtdNew = 0;
    let mtdUsed = 0;
    let totalGrossMTD = "$0";
    const todaysDeals: DeliveryStats['todaysDeals'] = [];
    
    // Parse the CSV to extract data
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for MTD New count
      if (line.includes("MTD New")) {
        const match = line.match(/MTD New,,(\d+)/);
        if (match) mtdNew = parseInt(match[1]) || 0;
      }
      
      // Look for MTD Used count
      if (line.includes("MTD Used")) {
        const match = line.match(/MTD Used,,(\d+)/);
        if (match) mtdUsed = parseInt(match[1]) || 0;
      }
      
      // Look for Total Gross MTD
      if (line.includes("Total Gross MTD")) {
        const match = line.match(/Total Gross MTD,,["']?\$([\d,]+\.?\d*)/);
        if (match) totalGrossMTD = "$" + match[1];
      }
      
      // Count deals (rows that have customer names and deal numbers)
      const columns = parseCSVLine(line);
      
      // Check if this is a deal row (has customer name in expected position and deal number)
      if (columns.length > 15) {
        const customerName = columns[14]?.trim();
        const dealNumber = columns[15]?.trim();
        const newUsed = columns[17]?.trim();
        const soldYear = columns[19]?.trim();
        const soldMake = columns[20]?.trim();
        const soldModel = columns[21]?.trim();
        const salesperson1 = columns[10]?.trim();
        
        // Valid deal row has customer name, deal number that's numeric, and vehicle info
        if (customerName && 
            dealNumber && 
            /^\d+$/.test(dealNumber) && 
            soldYear && 
            soldMake &&
            customerName !== "Customer Name") {
          todaysDeliveries++;
          todaysDeals.push({
            customerName: customerName,
            salesperson: salesperson1 || "Unknown",
            vehicle: `${soldYear} ${soldMake} ${soldModel || ""}`.trim(),
            newUsed: newUsed || "Unknown"
          });
        }
      }
    }
    
    return {
      todaysDeliveries,
      mtdNew,
      mtdUsed,
      mtdTotal: mtdNew + mtdUsed,
      totalGrossMTD,
      todaysDeals,
    };
  } catch (error) {
    console.error("Error fetching Delivery Log:", error);
    return defaultStats;
  }
}

// Format date to match sheet tab names like "Thursday January 1st", "Friday January 2nd"
function formatDateForSheetName(date: Date): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  
  // Add ordinal suffix (1st, 2nd, 3rd, etc.)
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
