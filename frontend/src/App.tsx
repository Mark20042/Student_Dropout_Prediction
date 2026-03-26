import { useState } from "react";
import FillUpForm from "./components/FillUpForm";
import Preview from "./components/Preview";
import WelcomeModal from "./components/WelcomeModal";
import PredictionModal from "./components/PredictionModal";
import { INITIAL_FORM_DATA } from "./types";
import type { StudentFormData, PredictionResult } from "./types";

const STEPS = [
  {
    title: "Personal Details",
    desc: "Get a quick overview of the student's background, demographics, and socioeconomic context.",
  },
  {
    title: "Academic Record",
    desc: "Break down the student's grades, department, and academic standing across semesters.",
  },
  {
    title: "Lifestyle Factors",
    desc: "Capture daily habits like study hours, attendance, commute, and stress levels.",
  },
  {
    title: "AI Analysis",
    desc: "Review the computed features and submit for an AI-powered dropout risk prediction.",
  },
];

const App = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    ...INITIAL_FORM_DATA,
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPrediction, setShowPrediction] = useState(false);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-5"
      style={{ background: "#f1f5f9" }}
    >
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}
      <div
        className="board-card bg-white d-flex w-100"
        style={{ maxWidth: 1800, height: "92vh", maxHeight: 850, minHeight: 600 }}
      >
        <div
          className="d-none d-lg-flex flex-column p-4 pt-5"
          style={{
            width: 420,
            background: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <div className="d-flex align-items-center gap-3 px-3 mb-4">
            <span className="fw-bold fs-5" style={{ color: "#1e293b" }}>
              AI Student Dropout Predictor
            </span>
          </div>

          <div className="d-flex flex-column gap-2 flex-grow-1 px-1">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`step-nav-item d-flex gap-3 align-items-start ${active ? "active" : ""}`}
                >
                  <div
                    className={`step-circle ${active ? "active" : done ? "done" : "pending"}`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <div>
                    <div
                      className="fw-bold"
                      style={{
                        fontSize: 14,
                        color: active ? "#1e293b" : "#94a3b8",
                      }}
                    >
                      {s.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: active ? "#64748b" : "#cbd5e1",
                        marginTop: 2,
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-4 mt-auto">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="d-flex align-items-center justify-content-center gap-2 w-100 border-0"
              style={{
                background: showPreview ? "#f8fafc" : "#eff6ff",
                color: showPreview ? "#64748b" : "#0284c7",
                padding: "12px",
                borderRadius: "12px",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
                boxShadow: showPreview ? "inset 0 2px 4px rgba(0,0,0,0.02)" : "0 2px 8px rgba(2,132,199,0.15)",
              }}
              onMouseEnter={(e) => {
                if (!showPreview) e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                if (!showPreview) e.currentTarget.style.transform = "none";
              }}
            >
              {showPreview ? "← Hide Preview" : "📋 Show Live Preview"}
            </button>
          </div>
        </div>

        <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
          <FillUpForm
            formData={formData}
            setFormData={setFormData}
            onResult={(r) => {
              setResult(r);
              setShowPrediction(true);
            }}
            step={step}
            setStep={setStep}
            steps={STEPS}
          />
        </div>

        {showPreview && (
          <div
            className="d-none d-xl-flex flex-column"
            style={{
              width: 580,
              borderLeft: "1px solid #e2e8f0",
              background: "#fafbfc",
              flexShrink: 0,
            }}
          >
            <Preview formData={formData} result={result} />
          </div>
        )}
      </div>
      {showPrediction && result && (
        <PredictionModal
          result={result}
          onClose={() => setShowPrediction(false)}
        />
      )}
    </div>
  );
};

export default App;
