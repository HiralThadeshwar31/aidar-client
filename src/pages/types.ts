// types.ts

export interface Note {
  id: string; // Assuming you have a string ID
  note: string;
  physician_id: string; // Assuming this is a string
  created_at: string; // Assuming this is an ISO date string
}

export interface Physician {
  id: string; // Assuming you have a string ID
  name: string; // Added name property
  email: string;
  specialization: string;
  contact_number: string; // Changed to string
}

export interface Vitals {
  heartRate: number[]; // Ensure this is an array of numbers
  bloodPressure: string[]; // Ensure this is an array of strings in "systolic/diastolic" format
  respirationRate: number[]; // Ensure this is an array of numbers
  temperature: number[]; // Ensure this is an array of numbers
  timestamps: string[]; // Assuming this is an array of strings
}

export interface Patient {
  id: string; // Assuming you have a string ID
  name: string;
  email: string;
  dob: string; // Assuming this is an ISO date string
  gender: string;
  contact: string; // Assuming this is a string
}
