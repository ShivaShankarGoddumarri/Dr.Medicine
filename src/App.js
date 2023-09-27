import React, { useState } from "react";
import "./App.css";
import logo from "./medical-kit.png";

function App() {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [medications, setMedications] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false); 


  const symptomDatabase = {
    AcneBreakout: {
      medication: "Topical Acne Cream (e.g., Benzoyl Peroxide)",
      directions: "Apply a small amount to affected skin areas once daily as directed by your dermatologist.",
    },
    allergicRhinitis: {
      medication: "Loratadine (e.g., Claritin)",
      directions: "Take 1 tablet daily in the morning to manage allergy symptoms.",
    },
    allergies: {
      medication: "Antihistamines (Ex., Claritin)",
      directions: "Take 1 tablet daily in the morning to manage allergy symptoms.",
    },
    anxiety: {
      medication: "Anti-anxiety medication (Ex., Xanax)",
      directions: "Take as prescribed by your healthcare provider to manage anxiety symptoms.",
    },
    asthmaAttack: {
      medication: "Inhaler (e.g., Albuterol)",
      directions: "Follow the instructions provided with your inhaler for immediate relief during an asthma attack.",
    },
    backpain: {
      medication: "Acetaminophen",
      directions: "Take 2 tablets every 4-6 hours.",
    },
    cold: {
      medication: "Coldact",
      directions: "Take 1 tablet every 4-6 hours.",
    },
    ColdAndSoreThroat: {
      medication: "Montelukast + Levocetirizine",
      directions: "Take as prescribed by your healthcare provider to manage cold and sore throat symptoms."
    },
    constipation: {
      medication: "Fiber supplements (Ex., Metamucil)",
      directions: "Mix 1-2 tablespoons with water and drink once daily to relieve constipation.",
    },
    cough: {
      medication: "Cough syrup",
      directions: "Take 1-2 teaspoons every 4-6 hours as needed.",
    },
    depression: {
      medication: "Antidepressants (Ex., Prozac)",
      directions: "Take as prescribed by your healthcare provider to manage depression.",
    },
    diarrhea: {
      medication: "Imodium",
      directions: "Take 1-2 capsules after each loose bowel movement, up to 4 times a day.",
    },
    eyeinfection: {
      medication: "Eye drops (Ex., Visine)",
      directions: "Apply 1-2 drops to the affected eye(s) every 4-6 hours as needed.",
    },
    fever: {
      medication: "Ibuprofen or Dolo 650",
      directions: "Take 1 tablet every 6-8 hours with food.",
    },
    FeverAndBodypainsAndInflammation: {
      medication: "Zerodol-sp",
      directions: "Take 1 tablet every 6-8 hours with food.",
    },
    headache: {
      medication: "Aspirin",
      directions: "Take 1 tablet every 4-6 hours.",
    },
    hives: {
      medication: "Antihistamines (e.g., Benadryl)",
      directions: "Take 1-2 tablets every 4-6 hours as needed for hives relief.",
    },
    indigestion: {
      medication: "Antacids (Ex., Tums)",
      directions: "Chew 2-4 tablets as needed for relief from heartburn and indigestion.",
    },
    insectbite: {
      medication: "Hydrocortisone cream",
      directions: "Apply a small amount to the bite area for itch relief, up to 3 times a day.",
    },
    insomnia: {
      medication: "Melatonin",
      directions: "Take 1-5mg of melatonin 30 minutes before bedtime to improve sleep.",
    },
    minorburns: {
      medication: "Burn Cream (e.g., Neosporin)",
      directions: "Apply a thin layer to the burned area for soothing relief and infection prevention.",
    },
    migraine: {
      medication: "Sumatriptan",
      directions: "Take 1 tablet at the onset of a migraine headache. Do not exceed 2 tablets in 24 hours.",
    },
    motionsickness: {
      medication: "Dimenhydrinate (e.g., Dramamine)",
      directions: "Take 1-2 tablets 30 minutes before travel to prevent motion sickness.",
    },
    nausea: {
      medication: "Pepto-Bismol",
      directions: "Take 2 tablespoons every 4-6 hours as needed.",
    },
    rash: {
      medication: "Calamine lotion",
      directions: "Apply a thin layer to the rash as needed for relief from itching and irritation.",
    },
    runnynose: {
      medication: "Antihistamines",
      directions: "Take 1 tablet daily in the evening.",
    },
    sinusitis: {
      medication: "Nasal Decongestant (e.g., Sudafed)",
      directions: "Take 1 tablet every 4-6 hours as needed for nasal congestion relief.",
    },
    sorethroat: {
      medication: "Throat lozenges",
      directions: "Dissolve one lozenge in your mouth as needed, up to 4 times a day.",
    },
    sprainedankle: {
      medication: "Over-the-counter pain reliever (e.g., Ibuprofen)",
      directions: "Take 1 tablet every 6-8 hours with food for pain and inflammation.",
    },
    stomachpain: {
      medication: "Omee",
      directions: "Take one tablet early in the morning.",
    },
    sunburn: {
      medication: "Aloe vera gel",
      directions: "Apply a thin layer to sunburned skin as needed for soothing relief.",
    },
    toothache: {
      medication: "Dentalgel",
      directions: "Apply a small amount directly to the affected tooth or gum as needed.",
    },
  };
  

 
  const checkSymptoms = () => {
    const enteredSymptoms = symptomsInput
      .split(",")
      .map((symptom) => symptom.trim());
  
    const foundMedications = enteredSymptoms.map((enteredSymptom) => {
      const normalizedSymptom = enteredSymptom.toLowerCase();
  
      // Look for an exact match in the symptomDatabase without changing the case
      const matchingSymptom = Object.keys(symptomDatabase).find(
        (key) => key.toLowerCase() === normalizedSymptom
      );
  
      if (matchingSymptom) {
        return {
          symptom: matchingSymptom, // Use the matched symptom from the database
          medication: symptomDatabase[matchingSymptom].medication,
          directions: symptomDatabase[matchingSymptom].directions,
        };
      } else {
        return {
          symptom: enteredSymptom, // Use the original entered symptom casing
          medication: "No medication recommendation found",
          directions: "",
        };
      }
    });
  
    // Set the current date and time
    setCurrentDateTime(new Date());
    setMedications(foundMedications);
  };
  
  const clearResults = () => {
    setSymptomsInput("");
    setMedications([]);
    setCurrentDateTime(null); // Clear the current date and time
    setCopyStatus(false); // Reset copy status
    document.querySelector(".dropdown").value = "";
    
  };

  const copyMedicationResults = () => {
    const medicationText = `MEDICATION RESULTS\nDesigned by Shiva Shankar Goddumarri\n${
      currentDateTime ? currentDateTime.toLocaleString() : ""
    }\n\n` + medications.map((data) => `Symptom: ${data.symptom}\nMedication: ${data.medication}\nDirections: ${data.directions}`).join("\n\n");

    navigator.clipboard
      .writeText(medicationText)
      .then(() => setCopyStatus(true))
      .catch(() => setCopyStatus(false));
  };

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="content">
        <img src={logo} alt="Your Logo" className="logo" />
        <h1 className="Heading">Dr. Medicine</h1>
        <h4 className="title">
          Enter your Symptoms or Select from Dropdown to get Medication Results
        </h4>
        <div className="input-container">
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Enter your symptoms"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              className="input-field"
            />
            <select
              onChange={(e) => setSymptomsInput(e.target.value)}
              className="dropdown"
            >
              <option value="">Select</option>
              {Object.keys(symptomDatabase).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button onClick={checkSymptoms} className="check-button">
            Check Symptoms
          </button>
          <button onClick={clearResults} className="clear-button">
            Clear Results
          </button>
        </div>

        {/* Medication Results */}
        <div className="medication-results">
          <h2 className="Medication-Heading">MEDICATION RESULTS</h2>
          {symptomsInput && medications.length > 0 && (
          <h5 className="name">Designed by Shiva Shankar Goddumarri</h5>)}
          {symptomsInput && medications.length > 0 && (
          <p className="current-datetime">
            {currentDateTime ? currentDateTime.toLocaleString() : ""}
          </p>)}

          {medications.map((data, index) => (
            
            <div key={index} className="medication-text">
            {symptomsInput && medications.length > 0 && (
              <p>
                <b>{`Medicine for ${data.symptom} is`} </b>
                {data.medication}
              </p>)}
              {data.directions && (
                <p>
                  <b>Directions:</b> {data.directions}
                </p>
              )}
            </div>
          ))}

          {/* Conditionally render the copy button */}
          {symptomsInput && medications.length > 0 && (
            <div>
              <button onClick={copyMedicationResults} className="copy-button">
                Copy Results
              </button>

              {/* Copy status message */}
              <p className="copy-status">
                {copyStatus ? "Copied!" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;