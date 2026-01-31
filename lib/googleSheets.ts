// lib/googleSheets.ts
// Fetch salesperson rankings from Google Sheets

const SPREADSHEET_ID = "1rqIYaIWK-rqxCwULE4IPibrLAcn8p9hRX_abJn8lR84";
const SHEET_NAME = "Current";

export type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

export async function fetchSalespersonRankings(): Promise<SalespersonRanking[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
    
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
