import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, Form, Button, Alert } from "react-bootstrap";

const TemplateForm = ({ setResult, setLoading, loading }) => {
  const [websiteType, setWebsiteType] = useState("");
  const [style, setStyle] = useState("");
  const [features, setFeatures] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!websiteType || !style || !features) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/generate-template",
        { websiteType, style, features }
      );
      setResult(response.data.result);
    } catch {
      setError("Failed to generate template. Backend error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        className="border-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(14,165,233,0.18))",
          backdropFilter: "blur(20px)",
          borderRadius: "22px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <h3 className="text-center fw-bold mb-4 text-white">
            <i className="bi bi-stars me-2 text-info"></i>
            AI Web Template Generator
          </h3>

          <Form onSubmit={handleSubmit}>
            {/* Website Type */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Website Type (Portfolio, Blog, E-commerce)"
                value={websiteType}
                onChange={(e) => setWebsiteType(e.target.value)}
                className="light-input"
              />
            </Form.Group>

            {/* Design Style */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Design Style (Modern, Minimal, Colorful)"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="light-input"
              />
            </Form.Group>

            {/* Features */}
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Required Features (Login, Gallery, Contact Form)"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="light-input"
              />
            </Form.Group>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert variant="danger" className="py-2 text-center">
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Button */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-100 py-2 fw-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, #6366f1, #0ea5e9)",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Generating...
                  </>
                ) : (
                  "Generate Template"
                )}
              </Button>
            </motion.div>
          </Form>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default TemplateForm;
