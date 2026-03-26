import { Form, Row, Col } from "react-bootstrap";
import type { StudentFormData } from "../../types";

interface StepProps {
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: string | number) => void;
}

const Toggle = ({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) => (
  <div className="d-flex gap-2">
    {options.map((opt) => (
      <button key={opt} type="button" onClick={() => onChange(opt)} className={`toggle-btn ${value === opt ? "selected" : ""}`}>
        {opt}
      </button>
    ))}
  </div>
);

const Step1Personal = ({ formData, onChange }: StepProps) => (
  <Row className="g-3">
    <Col md={6}>
      <Form.Group>
        <Form.Label>Student ID</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 1001" value={formData.Student_ID || ""} onChange={(e) => onChange("Student_ID", parseInt(e.target.value) || 0)} />
        <div className="field-hint">Unique student identifier</div>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 20" min={15} max={60} value={formData.Age || ""} onChange={(e) => onChange("Age", parseInt(e.target.value) || 0)} />
        <div className="field-hint">Student age in years</div>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Toggle value={formData.Gender} options={["Male", "Female"]} onChange={(v) => onChange("Gender", v)} />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Family Income</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 50000" value={formData.Family_Income || ""} onChange={(e) => onChange("Family_Income", parseFloat(e.target.value) || 0)} />
        <div className="field-hint">Monthly family income</div>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Internet Access</Form.Label>
        <Toggle value={formData.Internet_Access} options={["Yes", "No"]} onChange={(v) => onChange("Internet_Access", v)} />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Part-Time Job</Form.Label>
        <Toggle value={formData.Part_Time_Job} options={["Yes", "No"]} onChange={(v) => onChange("Part_Time_Job", v)} />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Scholarship</Form.Label>
        <Toggle value={formData.Scholarship} options={["Yes", "No"]} onChange={(v) => onChange("Scholarship", v)} />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Parental Education</Form.Label>
        <Form.Select size="sm" value={formData.Parental_Education} onChange={(e) => onChange("Parental_Education", e.target.value)}>
          <option value="">Select level…</option>
          {["None", "High School", "Bachelor's", "Master's", "PhD"].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
  </Row>
);

export default Step1Personal;
