import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function FeedbackCard({
  title,
  description,
  buttonText,
  buttonClass,
  path,
}) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-6 col-md-6 col-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        className="card h-100 border-0"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.30)",
          color: "white",
          transition: "0.2s ease",
          overflow: "hidden",
        }}
      >
        {/* Top Accent */}
        <div
          style={{
            height: "6px",
            background:
              "linear-gradient(90deg,#28a745,#20c997,#ffc107)",
          }}
        />

        <div className="card-body d-flex flex-column text-center p-4">

          <h3
            className="fw-bold mb-3"
            style={{
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              opacity: 0.9,
              fontSize: "16px",
              minHeight: "55px",
            }}
          >
            {description}
          </p>

          <div className="mt-auto">

            <motion.button
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className={`btn ${buttonClass} px-4 py-2 fw-bold`}
              style={{
                borderRadius: "50px",
                boxShadow:
                  "0 8px 20px rgba(25,135,84,.35)",
                fontSize: "16px",
              }}
              onClick={() => navigate(path)}
            >
              {buttonText} →
            </motion.button>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default FeedbackCard;