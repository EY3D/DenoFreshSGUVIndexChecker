// Root interface for the API response
export default interface ApiResponse {
    code: number;
    errorMsg: string | null;
    data: Data;
  }
  
  // Interface for the data object
  interface Data {
    records: Record[];
    paginationToken?: string; // Optional since it only exists if next page exists
  }
  
  // Interface for each record in the 'records' array
  interface Record {
    index: Index[];
    date: string; // ISO string format
    updatedTimestamp: string; // ISO string format
    timestamp: string; // ISO string format
  }
  
  // Interface for the 'index' array inside each record
  interface Index {
    hour: string; // ISO string format
    value: number;
  }

  export default interface UVRecord {
    hour: string; // Time in "7:00", "8:00", etc.
    value: number;
  }
