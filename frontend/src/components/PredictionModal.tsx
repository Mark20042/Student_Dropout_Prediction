import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import type { PredictionResult } from "../types";

interface PredictionModalProps {
  result: PredictionResult;
  onClose: () => void;
}

const getRiskConfig = (risk: string) => {
  const r = risk.toUpperCase();
  if (r.includes("LOW")) return { color: "#10b981", lottie: "/goodjob.json" };
  if (r.includes("MEDIUM")) return { color: "#f59e0b", lottie: "/focus.json" };
  return { color: "#ef4444", lottie: "/advice.json" };
};

const PredictionModal = ({ result, onClose }: PredictionModalProps) => {
  const [closing, setClosing] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);

  const { color, lottie: animationPath } = getRiskConfig(result.risk_level);
  const prob = parseFloat(result.probability);

  const displayRisk = result.risk_level.toUpperCase().includes("RISK")
    ? result.risk_level
    : `${result.risk_level} Risk`;

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: animationPath,
    });
    return () => anim.destroy();
  }, [animationPath]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 350);
  };

  return (
    <div
      className={`welcome-overlay ${closing ? "closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`welcome-card ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ flexDirection: "column", padding: 0 }}
      >

        {/* Top side — Lottie */}
        <div className="prediction-lottie-top">
          <div ref={lottieRef} className="prediction-lottie-anim" />
        </div>

        {/* Bottom side — Content */}
        <div className="prediction-content-bottom">
          <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="text-center mb-4">
              <h2
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: color,
                  textTransform: "uppercase",
                  letterSpacing: -1,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {displayRisk}
              </h2>
              <p style={{ fontSize: 18, color: "#64748b", fontWeight: 600, marginTop: 8 }}>
                AI Predicted Dropout Risk
              </p>
            </div>

            <div className="prediction-prob-section">
              <div className="prediction-prob-label">
                <span>Dropout Probability</span>
                <span style={{ color, fontWeight: 800, fontSize: 22 }}>
                  {prob.toFixed(1)}%
                </span>
              </div>
              <div className="prediction-prob-track">
                <div
                  className="prediction-prob-fill"
                  style={{ width: `${prob}%`, background: color }}
                />
              </div>
            </div>

            <div
              className="prediction-action-section"
              style={{
                backgroundColor: `${color}0D`, // 0D is ~5% opacity in Hex
              }}
            >
              <h4 className="prediction-action-title" style={{ color: color }}>
                💡 Recommended Action Plan
              </h4>
              <p className="prediction-action-text" style={{ color: "#334155" }}>
                {result.action_plan}
              </p>
            </div>

            <button
              className="welcome-cta mt-auto"
              style={{ background: "#0f172a", color: "#fff", border: "none" }}
              onClick={handleClose}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
