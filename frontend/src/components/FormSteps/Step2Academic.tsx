import { Form, Row, Col } from "react-bootstrap";
import type { StudentFormData } from "../../types";

interface StepProps {
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: string | number) => void;
}

const Step2Academic = ({ formData, onChange }: StepProps) => (
  <Row className="g-3">
    <Col md={6}>
      <Form.Group>
        <Form.Label>Department</Form.Label>
        <Form.Select size="sm" value={formData.Department} onChange={(e) => onChange("Department", e.target.value)}>
          <option value="">Select department…</option>
          {["Science", "Arts", "Business", "CS", "Engineering"].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Year / Semester</Form.Label>
        <Form.Select size="sm" value={formData.Semester} onChange={(e) => onChange("Semester", e.target.value)}>
          <option value="">Select year…</option>
          {["Year 1", "Year 2", "Year 3", "Year 4"].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>GPA</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 3.25" step="0.01" min={0} max={4} value={formData.GPA || ""} onChange={(e) => onChange("GPA", parseFloat(e.target.value) || 0)} />
        <div className="field-hint">Overall grade point average (0–4)</div>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group>
        <Form.Label>Semester GPA</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 3.50" step="0.01" min={0} max={4} value={formData.Semester_GPA || ""} onChange={(e) => onChange("Semester_GPA", parseFloat(e.target.value) || 0)} />
        <div className="field-hint">This semester's GPA</div>
      </Form.Group>
    </Col>
    <Col xs={12}>
      <Form.Group>
        <Form.Label>CGPA</Form.Label>
        <Form.Control size="sm" type="number" placeholder="e.g. 3.10" step="0.01" min={0} max={4} value={formData.CGPA || ""} onChange={(e) => onChange("CGPA", parseFloat(e.target.value) || 0)} />
        <div className="field-hint">Cumulative GPA</div>
      </Form.Group>
    </Col>
  </Row>
);

export default Step2Academic;
