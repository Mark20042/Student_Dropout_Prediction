import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { FaArrowRight } from "react-icons/fa";

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  const [closing, setClosing] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/studentread.json",
    });
    return () => anim.destroy();
  }, []);

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
      >
        {/* Left side — Lottie */}
        <div className="welcome-lottie-side">
          <div ref={lottieRef} className="welcome-lottie" />
        </div>

        {/* Right side — Content */}
        <div className="welcome-content-side">

          <h2 className="welcome-title">
            Welcome to <br />
            <span className="welcome-title-accent">
              AI Student Dropout Predictor
            </span>
          </h2>

          <p className="welcome-desc">
            Harness the power of machine learning to identify students at risk of
            dropping out. Input academic records, lifestyle factors, and personal
            details to receive an instant AI-powered risk assessment.
          </p>

          <div className="welcome-pills">
            <span className="welcome-pill">🎓 Academic Analysis</span>
            <span className="welcome-pill">🧠 AI-Powered</span>
            <span className="welcome-pill">📊 Risk Scoring</span>
          </div>

          <button className="welcome-cta" onClick={handleClose}>
            Get Started
            <FaArrowRight size={14} style={{ marginLeft: 8 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
