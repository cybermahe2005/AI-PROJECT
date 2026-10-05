import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./App.css";
import TemplateForm from "./components/TemplateForm";
import TemplateResult from "./components/TemplateResult";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container
      fluid
      className="animated-bg d-flex align-items-center justify-content-center px-3"
    >
      {/* 🔮 Animated Background Blobs */}
      <div className="bg-blobs">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      {/* 🧊 Glass UI Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-100 p-4 p-md-5"
        style={{ maxWidth: "1100px" }}
      >
        {/* Header */}
        <header className="text-center mb-5">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fw-bold display-5"
          >
            AI Webpage Template Generator
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 opacity-75 fs-5"
          >
            Describe your website idea and instantly get professional UI
            template suggestions powered by AI
          </motion.p>
        </header>

        {/* Content */}
        <Row className="g-4">
          <Col md={6}>
            <TemplateForm
              setResult={setResult}
              setLoading={setLoading}
              loading={loading}
            />
          </Col>

          <Col md={6}>
            <TemplateResult
              result={result}
              loading={loading}
            />
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
}

export default App;
