import { motion } from "framer-motion";

function CardHeader({ icon, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card-header border-0"
      style={{
        background: "linear-gradient(135deg,#198754,#157347)",
        color: "white",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        padding: "16px 22px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "24px",
          }}
        >
          {icon}
        </span>

        <h5
          style={{
            margin: 0,
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </h5>
      </div>
    </motion.div>
  );
}

export default CardHeader;