import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        await addDoc(collection(db, "reports"), {
          description,
          imageBase64: base64Image,
          timestamp: new Date(),
        });

        setFile(null);
        setDescription("");
        fetchReports();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  };

  const fetchReports = async () => {
    const snapshot = await getDocs(collection(db, "reports"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🐾 Wildlife Crime Reporter</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Upload Evidence</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="input-file"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the incident..."
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            />
          </div>
          <button className="submit-button" type="submit">
            📤 Submit Report
          </button>
        </form>

        <div className="reports-section">
          <h2 className="section-title">Uploaded Reports</h2>
          <div className="reports-grid">
            {reports.map((report) => (
              <div key={report.id} className="report-card">
                <img
                  src={report.imageBase64}
                  alt="evidence"
                  className="report-image"
                />
                <p className="report-description">{report.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
