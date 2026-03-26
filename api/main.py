from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn


app = FastAPI(title="Student Dropout Prediction System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load('student_dropout_logistic_model.pkl')
scaler = joblib.load('student_scaler.pkl')
encoder = joblib.load('student_encoder.pkl')


class StudentRequest(BaseModel):
    Student_ID: int
    Age: int
    Gender: str
    Family_Income: float
    Internet_Access: str
    Study_Hours_per_Day: float
    Attendance_Rate: float
    Assignment_Delay_Days: int
    Travel_Time_Minutes: int
    Part_Time_Job: str
    Scholarship: str
    Stress_Index: float
    GPA: float
    Semester_GPA: float
    CGPA: float
    Semester: str
    Department: str
    Parental_Education: str
    Academic_Trend: float
    Pressure_Index: float
    

@app.get("/api")
async def root():
    return {"message": "Student Dropout API is running!"}

@app.post("/api/predict")
def predict_dropout(student: StudentRequest):
    try:
        
        raw_data = pd.DataFrame([student.dict()])
        
        
        encoded_data = encoder.transform(raw_data)
        
       
        encoded_data = encoded_data.reindex(columns=scaler.feature_names_in_, fill_value=0)
        
      
        scaled_data = scaler.transform(encoded_data)
        
        
        prediction = model.predict(scaled_data)[0]
        probability = model.predict_proba(scaled_data)[0][1]
        prob_percent = probability * 100
       
        if prob_percent <= 30:
            risk_level = "🟢 LOW RISK"
            recommendation = "Student is performing well. Continue standard monitoring."
        elif 31 <= prob_percent <= 60:
            risk_level = "🟠 MEDIUM RISK"
            recommendation = "Student showing signs of struggle. Recommend a counseling check-in."
        else:
            risk_level = "🔴 HIGH RISK"
            recommendation = "Critical intervention required. Immediate academic support advised."
        
        return {
            "prediction_code": int(prediction),
            "risk_level": risk_level,
            "probability": f"{prob_percent:.2f}%",
            "action_plan": recommendation,
            "message": "Comprehensive student risk analysis complete."
        }
    
    except Exception as e:
        return {"error": str(e), "message": "Check if column names match your training data."}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)