export interface StudentFormData {
  Student_ID: number;
  Age: number;
  Gender: string;
  Family_Income: number;
  Internet_Access: string;
  Part_Time_Job: string;
  Scholarship: string;
  Parental_Education: string;
  Department: string;
  Semester: string;
  GPA: number;
  Semester_GPA: number;
  CGPA: number;
  Study_Hours_per_Day: number;
  Attendance_Rate: number;
  Assignment_Delay_Days: number;
  Travel_Time_Minutes: number;
  Stress_Index: number;
  Academic_Trend: number;
  Pressure_Index: number;
}

export interface PredictionResult {
  probability: string;
  risk_level: string;
  action_plan: string;
}

export const INITIAL_FORM_DATA: StudentFormData = {
  Student_ID: 0, Age: 18, Gender: "", Family_Income: 0,
  Internet_Access: "", Part_Time_Job: "", Scholarship: "",
  Parental_Education: "", Department: "", Semester: "",
  GPA: 0, Semester_GPA: 0, CGPA: 0,
  Study_Hours_per_Day: 0, Attendance_Rate: 0,
  Assignment_Delay_Days: 0, Travel_Time_Minutes: 0,
  Stress_Index: 1, Academic_Trend: 0, Pressure_Index: 0,
};
