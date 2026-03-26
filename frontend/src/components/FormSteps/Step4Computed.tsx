import { useEffect, useMemo } from "react";
import { Card, Badge, ProgressBar } from "react-bootstrap";
import type { StudentFormData } from "../../types";

interface StepProps {
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: string | number) => void;
}

const Step4Computed = ({ formData, onChange }: StepProps) => {
  const academicTrend = useMemo(() => parseFloat((formData.Semester_GPA - formData.CGPA).toFixed(4)), [formData.Semester_GPA, formData.CGPA]);
  const pressureIndex = useMemo(() => parseFloat((formData.Stress_Index + formData.Travel_Time_Minutes / 10).toFixed(4)), [formData.Stress_Index, formData.Travel_Time_Minutes]);

  useEffect(() => { onChange("Academic_Trend", academicTrend); }, [academicTrend, onChange]);
  useEffect(() => { onChange("Pressure_Index", pressureIndex); }, [pressureIndex, onChange]);

  const trendUp = academicTrend >= 0;
  const pLow = pressureIndex <= 5;
  const pMed = pressureIndex > 5 && pressureIndex <= 8;

  return (
    <div>
      {/* Info banner */}
      <Card className="mb-3 border-0" style={{ background: "#eff6ff", borderRadius: 12 }}>
        <Card.Body className="py-3 text-center">
          <span style={{ fontSize: 14, color: "#2563eb", fontWeight: 500 }}>
            These values are <strong>auto-calculated</strong> from your inputs.
          </span>
        </Card.Body>
      </Card>

      <div className="row g-3">
        {/* Academic Trend */}
        <div className="col-12 col-xl-6">
          <Card className="h-100 border" style={{ borderRadius: 16, background: trendUp ? "#f0fdf4" : "#fef2f2", borderColor: trendUp ? "#bbf7d0" : "#fecaca" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="text-uppercase fw-bold" style={{ fontSize: 10, letterSpacing: 2, color: "#94a3b8" }}>Academic Trend</div>
                  <div className="fw-bold" style={{ fontSize: 36, color: trendUp ? "#16a34a" : "#dc2626", fontVariantNumeric: "tabular-nums" }}>
                    {trendUp ? "+" : ""}{academicTrend.toFixed(2)}
                  </div>
                </div>
                <Badge bg={trendUp ? "success" : "danger"} className="mt-1">
                  {trendUp ? "📈 Improving" : "📉 Declining"}
                </Badge>
              </div>
              <p className="mb-3" style={{ fontSize: 12, fontWeight: 600, color: trendUp ? "#166534" : "#991b1b" }}>
                {trendUp ? "Above cumulative average — improving" : "Below cumulative average — declining"}
              </p>
              <div className="row g-2 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="col-6">
                  <div className="text-center p-2 rounded-3" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Semester GPA</div>
                    <div className="fw-bold fs-5">{formData.Semester_GPA || "—"}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 rounded-3" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>CGPA</div>
                    <div className="fw-bold fs-5">{formData.CGPA || "—"}</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Pressure Index */}
        <div className="col-12 col-xl-6">
          <Card className="h-100 border" style={{ borderRadius: 16, background: pLow ? "#f0fdf4" : pMed ? "#fffbeb" : "#fef2f2", borderColor: pLow ? "#bbf7d0" : pMed ? "#fde68a" : "#fecaca" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="text-uppercase fw-bold" style={{ fontSize: 10, letterSpacing: 2, color: "#94a3b8" }}>Pressure Index</div>
                  <div className="fw-bold" style={{ fontSize: 36, color: pLow ? "#16a34a" : pMed ? "#d97706" : "#dc2626", fontVariantNumeric: "tabular-nums" }}>
                    {pressureIndex.toFixed(2)}
                  </div>
                </div>
                <Badge bg={pLow ? "success" : pMed ? "warning" : "danger"} className="mt-1">
                  {pLow ? "✅ Low" : pMed ? "⚡ Moderate" : "🔥 High"}
                </Badge>
              </div>
              <ProgressBar
                now={Math.min((pressureIndex / 15) * 100, 100)}
                variant={pLow ? "success" : pMed ? "warning" : "danger"}
                className="mb-3"
                style={{ height: 8, borderRadius: 99 }}
              />
              <div className="row g-2 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="col-6">
                  <div className="text-center p-2 rounded-3" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Stress</div>
                    <div className="fw-bold fs-5">{formData.Stress_Index || "—"}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 rounded-3" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Travel</div>
                    <div className="fw-bold fs-5">{formData.Travel_Time_Minutes ? `${formData.Travel_Time_Minutes}m` : "—"}</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step4Computed;
