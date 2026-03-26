import { Form, Row, Col, Card } from "react-bootstrap";
import type { StudentFormData } from "../../types";
import { Smile, Meh, Frown } from "lucide-react";

interface StepProps {
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: string | number) => void;
}

const Step3Lifestyle = ({ formData, onChange }: StepProps) => {
  const stressColor = formData.Stress_Index <= 3 ? "#10b981" : formData.Stress_Index <= 6 ? "#f59e0b" : "#f43f5e";

  return (
    <div>
      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Study Hours / Day</Form.Label>
            <Form.Control size="sm" type="number" placeholder="e.g. 4.5" step="0.5" min={0} max={24} value={formData.Study_Hours_per_Day || ""} onChange={(e) => onChange("Study_Hours_per_Day", parseFloat(e.target.value) || 0)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Attendance Rate %</Form.Label>
            <Form.Control size="sm" type="number" placeholder="e.g. 85" step="0.1" min={0} max={100} value={formData.Attendance_Rate || ""} onChange={(e) => onChange("Attendance_Rate", parseFloat(e.target.value) || 0)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Assignment Delay (Days)</Form.Label>
            <Form.Control size="sm" type="number" placeholder="e.g. 3" min={0} value={formData.Assignment_Delay_Days || ""} onChange={(e) => onChange("Assignment_Delay_Days", parseInt(e.target.value) || 0)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Travel Time (Minutes)</Form.Label>
            <Form.Control size="sm" type="number" placeholder="e.g. 30" min={0} value={formData.Travel_Time_Minutes || ""} onChange={(e) => onChange("Travel_Time_Minutes", parseInt(e.target.value) || 0)} />
          </Form.Group>
        </Col>
      </Row>

      {/* Stress slider */}
      <Card body className="border" style={{ borderRadius: 12, background: "#f8fafc" }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <Form.Label className="mb-0">Stress Index</Form.Label>
            <div className="field-hint mt-0">Self-reported stress (1–10)</div>
          </div>
          <span className="fw-bold" style={{ fontSize: 32, color: stressColor, fontVariantNumeric: "tabular-nums" }}>
            {formData.Stress_Index.toFixed(1)}
          </span>
        </div>
        <Form.Range
          min={1} max={10} step={0.1}
          value={formData.Stress_Index}
          onChange={(e) => onChange("Stress_Index", parseFloat(e.target.value))}
          style={{ accentColor: stressColor }}
        />
        <div className="d-flex justify-content-between mt-2" style={{ fontSize: 11, fontWeight: 600 }}>
          <span className="d-flex align-items-center gap-1" style={{ color: "#10b981" }}><Smile size={16} /> <span>1 · Low</span></span>
          <span className="d-flex align-items-center gap-1" style={{ color: "#f59e0b" }}><Meh size={16} /> <span>5 · Mod</span></span>
          <span className="d-flex align-items-center gap-1" style={{ color: "#f43f5e" }}><Frown size={16} /> <span>10 · High</span></span>
        </div>
      </Card>
    </div>
  );
};

export default Step3Lifestyle;
