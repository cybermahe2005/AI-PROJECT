import { motion } from "framer-motion";
import { Card, Button, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";

const TemplateResult = ({ result, loading }) => {
  const [progress, setProgress] = useState(0);

  // Fake game-style loading animation
  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-100"
    >
      <Card className="glass-card p-4 h-100">
        <h5 className="fw-semibold mb-3">
          <i className="bi bi-cpu me-2"></i>
          AI Output
        </h5>

        {/* GAME-STYLE LOADING */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="mb-2 text-center">
              AI is generating your template...
            </p>

            <ProgressBar
              now={progress}
              animated
              striped
              variant="info"
              style={{
                height: "12px",
                borderRadius: "10px",
              }}
            />

            <p className="text-center mt-2 opacity-75">
              {Math.floor(progress)}%
            </p>
          </motion.div>
        )}

        {/* EMPTY STATE */}
        {!loading && !result && (
          <p className="opacity-75 text-center mt-4">
            Your AI-generated webpage template will appear here ...
          </p>
        )}

        {/* RESULT */}
        {!loading && result && (
          <>
            <pre
              className="bg-dark text-light p-3 rounded mt-3"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                maxHeight: "420px",
                overflowY: "auto",
              }}
            >
              {result}
            </pre>

            <div className="text-end mt-3">
              <Button
                size="sm"
                variant="outline-light"
                onClick={copyToClipboard}
              >
                <i className="bi bi-clipboard"></i> Copy
              </Button>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default TemplateResult;
