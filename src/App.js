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

function App() {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [medications, setMedications] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const symptomDatabase = {
    AcneBreakout: {
      medication: "Topical Acne Cream (e.g., Benzoyl Peroxide)",
      directions:
        "Apply a small amount to affected skin areas once daily as directed by your dermatologist.",
    },
    AllergicRhinitis: {
      medication: "Loratadine (e.g., Claritin)",
      directions:
        "Take 1 tablet daily in the morning to manage allergy symptoms.",
    },
    Allergies: {
      medication: "Antihistamines (Ex., Claritin)",
      directions:
        "Take 1 tablet daily in the morning to manage allergy symptoms.",
    },
    Anxiety: {
      medication: "Anti-anxiety medication (Ex., Xanax)",
      directions:
        "Take as prescribed by your healthcare provider to manage anxiety symptoms.",
    },
    AsthmaAttack: {
      medication: "Inhaler (e.g., Albuterol)",
      directions:
        "Follow the instructions provided with your inhaler for immediate relief during an asthma attack.",
    },
    Backpain: {
      medication: "Acetaminophen",
      directions: "Take 2 tablets every 4-6 hours.",
    },
    Cold: {
      medication: "Coldact",
      directions: "Take 1 tablet every 4-6 hours.",
    },
    ColdAndSoreThroat: {
      medication: "Montelukast + Levocetirizine",
      directions:
        "Take as prescribed by your healthcare provider to manage cold and sore throat symptoms.",
    },
    Constipation: {
      medication: "Fiber supplements (Ex., Metamucil)",
      directions:
        "Mix 1-2 tablespoons with water and drink once daily to relieve constipation.",
    },
    Cough: {
      medication: "Cough syrup",
      directions: "Take 1-2 teaspoons every 4-6 hours as needed.",
    },
    Depression: {
      medication: "Antidepressants (Ex., Prozac)",
      directions:
        "Take as prescribed by your healthcare provider to manage depression.",
    },
    Diarrhea: {
      medication: "Imodium",
      directions:
        "Take 1-2 capsules after each loose bowel movement, up to 4 times a day.",
    },
    EyeInfection: {
      medication: "Eye drops (Ex., Visine)",
      directions:
        "Apply 1-2 drops to the affected eye(s) every 4-6 hours as needed.",
    },
    Fever: {
      medication: "Ibuprofen or Dolo 650",
      directions: "Take 1 tablet every 6-8 hours with food.",
    },
    FeverAndBodyPainsAndInflammation: {
      medication: "Zerodol-sp",
      directions: "Take 1 tablet every 6-8 hours with food.",
    },
    Headache: {
      medication: "Aspirin",
      directions: "Take 1 tablet every 4-6 hours.",
    },
    Hives: {
      medication: "Antihistamines (e.g., Benadryl)",
      directions:
        "Take 1-2 tablets every 4-6 hours as needed for hives relief.",
    },
    Indigestion: {
      medication: "Antacids (Ex., Tums)",
      directions:
        "Chew 2-4 tablets as needed for relief from heartburn and indigestion.",
    },
    InsectBite: {
      medication: "Hydrocortisone cream",
      directions:
        "Apply a small amount to the bite area for itch relief, up to 3 times a day.",
    },
    Insomnia: {
      medication: "Melatonin",
      directions:
        "Take 1-5mg of melatonin 30 minutes before bedtime to improve sleep.",
    },
    MinorBurns: {
      medication: "Burn Cream (e.g., Neosporin)",
      directions:
        "Apply a thin layer to the burned area for soothing relief and infection prevention.",
    },
    Migraine: {
      medication: "Sumatriptan",
      directions:
        "Take 1 tablet at the onset of a migraine headache. Do not exceed 2 tablets in 24 hours.",
    },
    MotionSickness: {
      medication: "Dimenhydrinate (e.g., Dramamine)",
      directions:
        "Take 1-2 tablets 30 minutes before travel to prevent motion sickness.",
    },
    Nausea: {
      medication: "Pepto-Bismol",
      directions: "Take 2 tablespoons every 4-6 hours as needed.",
    },
    Rash: {
      medication: "Calamine lotion",
      directions:
        "Apply a thin layer to the rash as needed for relief from itching and irritation.",
    },
    RunnyNose: {
      medication: "Antihistamines",
      directions: "Take 1 tablet daily in the evening.",
    },
    Sinusitis: {
      medication: "Nasal Decongestant (e.g., Sudafed)",
      directions:
        "Take 1 tablet every 4-6 hours as needed for nasal congestion relief.",
    },
    SoreThroat: {
      medication: "Throat lozenges",
      directions:
        "Dissolve one lozenge in your mouth as needed, up to 4 times a day.",
    },
    SprainedAnkle: {
      medication: "Over-the-counter pain reliever (e.g., Ibuprofen)",
      directions:
        "Take 1 tablet every 6-8 hours with food for pain and inflammation.",
    },
    StomachPain: {
      medication: "Omee",
      directions: "Take one tablet early in the morning.",
    },
    Sunburn: {
      medication: "Aloe vera gel",
      directions:
        "Apply a thin layer to sunburned skin as needed for soothing relief.",
    },
    Toothache: {
      medication: "Dentalgel",
      directions:
        "Apply a small amount directly to the affected tooth or gum as needed.",
    },
  };

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
  };

  const clearResults = () => {
    setSymptomsInput("");
    setMedications([]);
    setCurrentDateTime(null);
    setCopyStatus(false);
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
            placeholder="Enter your symptoms"
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<Search />}
            onClick={checkSymptoms}
            disabled={!symptomsInput.trim()}
          >
            Check Symptoms
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Clear />}
            onClick={clearResults}
          >
            Clear Results
          </Button>
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
