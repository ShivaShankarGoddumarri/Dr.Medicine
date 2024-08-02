import React, { useState } from "react";
import "./App.css";
import logo from "./medical-kit.png";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Clear, ContentCopy } from "@mui/icons-material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import symptomDatabase from "./symptomDatabase";


function App() {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [medications, setMedications] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const [isCheckButtonVisible, setIsCheckButtonVisible] = useState(true);

  

  const checkSymptoms = () => {
    const enteredSymptoms = symptomsInput
      .split(",")
      .map((symptom) => symptom.trim());

    const foundMedications = enteredSymptoms.map((enteredSymptom) => {
      const normalizedSymptom = enteredSymptom.toLowerCase();

      const matchingSymptom = Object.keys(symptomDatabase).find(
        (key) => key.toLowerCase() === normalizedSymptom
      );

      if (matchingSymptom) {
        return {
          symptom: matchingSymptom,
          medication: symptomDatabase[matchingSymptom].medication,
          directions: symptomDatabase[matchingSymptom].directions,
        };
      } else {
        return {
          symptom: enteredSymptom,
          medication: "No medication recommendation found",
          directions: "",
        };
      }
    });

    setCurrentDateTime(new Date());
    setMedications(foundMedications);
    setSymptomsInput('');
    setIsCheckButtonVisible(false);
  };

  const clearResults = () => {
    setSymptomsInput("");
    setMedications([]);
    setCurrentDateTime(null);
    setCopyStatus(false);
    setIsCheckButtonVisible(true);
  };

  const copyMedicationResults = () => {
    const medicationText =
      `MEDICATION RESULTS\nDesigned by Shiva Shankar Goddumarri\n${
        currentDateTime ? currentDateTime.toLocaleString() : ""
      }\n\n` +
      medications
        .map(
          (data) =>
            `Symptom: ${data.symptom}\nMedication: ${data.medication}\nDirections: ${data.directions}`
        )
        .join("\n\n");

    navigator.clipboard
      .writeText(medicationText)
      .then(() => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000);
      })
      .catch(() => setCopyStatus(false));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
      checkSymptoms();
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Your Logo" style={{ height: 80 }} />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Dr. Medicine
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Enter your <b>Symptoms</b> or Select from <b>Dropdown</b> to get Medication Results
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your symptoms . Eg: fever, cold etc."
            value={symptomsInput}
            onChange={(e) => setSymptomsInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <TextField
            select
            variant="outlined"
            value={symptomsInput}
            onChange={(e) => setSymptomsInput(e.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
            {Object.keys(symptomDatabase).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
        </Box>
        <Box display="flex" gap={1} justifyContent="center" mb={2}>
          {isCheckButtonVisible ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search />}
              onClick={checkSymptoms}
              disabled={!symptomsInput.trim()}
            >
              Check Symptoms
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Clear />}
              onClick={clearResults}
            >
              Clear Results
            </Button>
          )}
        </Box>
        {medications.length > 0 && (
          <Paper elevation={2} style={{ padding: "1rem", marginTop: "1rem" }}>
            <Typography variant="h5" gutterBottom>
              MEDICATION RESULTS
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Designed by Shiva Shankar Goddumarri
            </Typography>
            <Box display="flex" alignItems="center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8s-8 3.6-8 8s3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m5 11.9l-.7 1.3l-5.3-2.9V7h1.5v4.4z"/>
              </svg>
              <Typography variant="body2" color="textSecondary" ml={1}>
                {currentDateTime ? currentDateTime.toLocaleString() : ""}
              </Typography>
            </Box>
            {medications.map((data, index) => (
              <Box key={index} mb={2}>
                {data.medication === "No medication recommendation found" ? (
                  <Typography variant="body1" color="error">
                    <b>{data.symptom}:</b> {data.medication}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    Medicine for <b>{data.symptom}:</b> <b style={{color: 'green'}}>{data.medication}</b>
                  </Typography>
                )}
                {data.medication !== "No medication recommendation found" && (
                  <Typography variant="body2" color="textSecondary">
                   <b> Directions:</b> {data.directions}
                  </Typography>
                )}
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<ContentCopy />}
              onClick={copyMedicationResults}
              fullWidth
            >
              Copy Results
            </Button>
            <Snackbar
              open={copyStatus}
              autoHideDuration={3000}
              onClose={() => setCopyStatus(false)}
            >
              <Alert severity="success" onClose={() => setCopyStatus(false)}>
                Copied!
              </Alert>
            </Snackbar>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default App;
