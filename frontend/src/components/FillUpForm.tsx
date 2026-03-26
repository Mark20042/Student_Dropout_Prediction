import { useState } from "react";
import { Button, Alert, Spinner } from "react-bootstrap";
import type { StudentFormData, PredictionResult } from "../types";
import Step1Personal from "./FormSteps/Step1Personal";
import Step2Academic from "./FormSteps/Step2Academic";
import Step3Lifestyle from "./FormSteps/Step3Lifestyle";
import Step4Computed from "./FormSteps/Step4Computed";
import { predictDropout } from "../api";
import { FaGraduationCap } from "react-icons/fa";
import { Sparkles } from "lucide-react";

interface Props {
  formData: StudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>;
  onResult: (r: PredictionResult) => void;
  step: number;
  setStep: (s: number) => void;
  steps: { title: string; desc: string }[];
}

const FillUpForm = ({ formData, setFormData, onResult, step, setStep, steps }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const change = (field: keyof StudentFormData, value: string | number) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const submit = async () => {
    setLoading(true);
    setError(null);
    try { onResult(await predictDropout(formData)); }
    catch (e) { setError(e instanceof Error ? e.message : "Prediction failed"); }
    finally { setLoading(false); }
  };

  const content = [
    <Step1Personal formData={formData} onChange={change} />,
    <Step2Academic formData={formData} onChange={change} />,
    <Step3Lifestyle formData={formData} onChange={change} />,
    <Step4Computed formData={formData} onChange={change} />,
  ][step];

  return (
    <div className="d-flex flex-column h-100">
      {/* Mobile stepper */}
      <div className="d-lg-none p-4 border-bottom">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 36, height: 36, background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff" }}>
            <FaGraduationCap size={16} />
          </div>
          <span className="fw-bold fs-6">Predictor</span>
        </div>
        <div className="d-flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className="flex-grow-1 rounded-pill" style={{ height: 6, background: i <= step ? "#0ea5e9" : "#e2e8f0" }} />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="px-4 px-lg-5 pt-3 pt-lg-4 pb-2">
        <div className="d-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: 44, height: 44, background: "#f59e0b", color: "#fff" }}>
          <FaGraduationCap size={20} />
        </div>
        <p className="fw-semibold mb-1" style={{ fontSize: 14, color: "#94a3b8" }}>
          Step {step + 1}/{steps.length}
        </p>
        <h2 className="fw-bold mb-2" style={{ color: "#1e293b", fontSize: 26 }}>
          {steps[step].title}
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", maxWidth: 500, lineHeight: 1.6 }}>
          {steps[step].desc}
        </p>
      </div>

      {/* Form body */}
      <div className="flex-grow-1 overflow-auto px-4 px-lg-5 py-3">
        <div style={{ maxWidth: 700 }}>
          {content}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mx-lg-5 mb-3">
          <Alert variant="danger" className="py-2 d-flex align-items-center gap-2 mb-0">
            <i className="bi bi-exclamation-circle" /> {error}
          </Alert>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 px-lg-5 py-3 border-top d-flex justify-content-between">
        <Button
          variant="light"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          style={{ visibility: step === 0 ? "hidden" : "visible" }}
        >
          ← Back
        </Button>
        {step < steps.length - 1 ? (
          <Button variant="primary" onClick={() => setStep(step + 1)}>
            Continue →
          </Button>
        ) : (
          <Button
            variant="success"
            size="lg"
            onClick={submit}
            disabled={loading}
            className="px-4 d-flex align-items-center justify-content-center gap-2"
          >
            {loading ? <><Spinner size="sm" /> Analyzing…</> : <><Sparkles size={18} /> Get Prediction</>}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FillUpForm;
