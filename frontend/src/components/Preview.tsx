import { Card, Badge, ProgressBar } from "react-bootstrap";
import type { StudentFormData, PredictionResult } from "../types";

interface Props {
  formData: StudentFormData;
  result: PredictionResult | null;
}

const Row = ({ label, value }: { label: string; value: string | number }) => {
  const empty = value === "" || value === 0;
  return (
    <div
      className="d-flex justify-content-between align-items-center py-0"
      style={{ fontSize: 12 }}
    >
      <span style={{ color: "#94a3b8" }}>{label}</span>
      <span
        className="fw-semibold"
        style={{ color: empty ? "#cbd5e1" : "#334155" }}
      >
        {empty ? "—" : value}
      </span>
    </div>
  );
};

const Heading = ({ icon, title }: { icon: string; title: string }) => (
  <div className="d-flex align-items-center gap-2 pt-2 pb-0">
    <span style={{ fontSize: 13 }}>{icon}</span>
    <span
      className="text-uppercase fw-bold"
      style={{ fontSize: 9, letterSpacing: 1.5, color: "#94a3b8" }}
    >
      {title}
    </span>
  </div>
);

const riskMap = {
  LOW: {
    bg: "success" as const,
    cardBg: "#f0fdf4",
    cardBorder: "#bbf7d0",
    textColor: "#166534",
  },
  MEDIUM: {
    bg: "warning" as const,
    cardBg: "#fffbeb",
    cardBorder: "#fde68a",
    textColor: "#92400e",
  },
  HIGH: {
    bg: "danger" as const,
    cardBg: "#fef2f2",
    cardBorder: "#fecaca",
    textColor: "#991b1b",
  },
};

const Preview = ({ formData, result }: Props) => {
  const key = result?.risk_level.includes("LOW")
    ? "LOW"
    : result?.risk_level.includes("MEDIUM")
      ? "MEDIUM"
      : "HIGH";
  const cfg = result ? riskMap[key] : null;
  const prob = result ? parseFloat(result.probability) : 0;

  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      <div
        className="px-4 py-3 border-bottom d-flex align-items-center gap-3"
        style={{ background: "#fff", flexShrink: 0 }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{ width: 36, height: 36, background: "#eff6ff" }}
        >
          📋
        </div>
        <div>
          <div className="fw-bold" style={{ fontSize: 15 }}>
            Live Preview
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            Updates as you type
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto px-4 pb-4">
        {result && cfg ? (
          <Card
            className="mt-2 mb-2 border"
            style={{
              borderRadius: 14,
              background: cfg.cardBg,
              borderColor: cfg.cardBorder,
            }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <div
                    className="text-uppercase fw-bold"
                    style={{
                      fontSize: 9,
                      letterSpacing: 1.5,
                      color: "#94a3b8",
                    }}
                  >
                    Risk Assessment
                  </div>
                  <div
                    className="fw-bold"
                    style={{ fontSize: 24, color: cfg.textColor }}
                  >
                    {result.probability}
                  </div>
                </div>
                <Badge bg={cfg.bg} className="mt-1">
                  {result.risk_level}
                </Badge>
              </div>
              <ProgressBar
                now={Math.min(prob, 100)}
                variant={cfg.bg}
                style={{ height: 6, borderRadius: 99 }}
                className="mb-2"
              />
              <div
                className="p-2 rounded-3 d-flex gap-2"
                style={{ background: "rgba(255,255,255,0.8)" }}
              >
                <span>💡</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#475569",
                    lineHeight: 1.4,
                  }}
                >
                  {result.action_plan}
                </span>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card
            className="mt-2 mb-2 text-center"
            style={{ borderRadius: 14, border: "2px dashed #e2e8f0" }}
          >
            <Card.Body className="py-3">
              <div style={{ fontSize: 24 }}>🎯</div>
              <div
                className="fw-bold"
                style={{ color: "#475569", fontSize: 13 }}
              >
                Waiting for Data
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>
                Submit to get AI prediction
              </div>
            </Card.Body>
          </Card>
        )}

        <Heading icon="👤" title="Personal" />
        <Row label="Student ID" value={formData.Student_ID} />
        <Row label="Age" value={formData.Age} />
        <Row label="Gender" value={formData.Gender} />
        <Row label="Family Income" value={formData.Family_Income} />
        <Row label="Internet Access" value={formData.Internet_Access} />
        <Row label="Part-Time Job" value={formData.Part_Time_Job} />
        <Row label="Scholarship" value={formData.Scholarship} />
        <Row label="Parental Education" value={formData.Parental_Education} />

        <hr className="my-1" style={{ borderColor: "#f1f5f9" }} />

        <Heading icon="📚" title="Academic" />
        <Row label="Department" value={formData.Department} />
        <Row label="Semester" value={formData.Semester} />
        <Row label="GPA" value={formData.GPA} />
        <Row label="Semester GPA" value={formData.Semester_GPA} />
        <Row label="CGPA" value={formData.CGPA} />

        <hr className="my-1" style={{ borderColor: "#f1f5f9" }} />

        <Heading icon="⏰" title="Lifestyle" />
        <Row label="Study Hours/Day" value={formData.Study_Hours_per_Day} />
        <Row label="Attendance Rate" value={formData.Attendance_Rate} />
        <Row label="Assignment Delay" value={formData.Assignment_Delay_Days} />
        <Row
          label="Travel Time"
          value={
            formData.Travel_Time_Minutes
              ? `${formData.Travel_Time_Minutes} min`
              : ""
          }
        />
        <Row label="Stress Index" value={formData.Stress_Index} />

        <hr className="my-1" style={{ borderColor: "#f1f5f9" }} />

        <Heading icon="🧮" title="Computed" />
        <Row label="Academic Trend" value={formData.Academic_Trend} />
        <Row label="Pressure Index" value={formData.Pressure_Index} />
      </div>
    </div>
  );
};

export default Preview;
