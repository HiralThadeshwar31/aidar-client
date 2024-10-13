import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";

// Define the Patient type
interface Patient {
  id: string;
  name: string;
  email: string;
  dob: string;
  gender: string;
  contact: string;
}

interface PatientDetailsCardProps {
  patient: Patient | null;
}

const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({ patient }) => {
  return (
    <Paper className="patient-details">
      <Typography variant="h4" gutterBottom className="patient-details-title">
        Patient Details
      </Typography>
      {patient ? (
        <Box className="patient-info">
          <Box className="patient-info-row">
            <Avatar sx={{ bgcolor: "#3f51b5", marginRight: 2 }}>
              {patient.name.charAt(0)}
            </Avatar>
            <Typography
              variant="h6"
              sx={{ marginRight: 2, color: "#555", fontWeight: "bold" }}
            >
              {patient.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#777", marginRight: 2 }}>
              {patient.email}
            </Typography>
          </Box>
          <Box className="patient-info-row">
            <Typography className="patient-info-label">DOB:</Typography>
            <Typography variant="body1" sx={{ color: "#777", marginRight: 2 }}>
              {new Date(patient.dob).toLocaleDateString()}
            </Typography>
            <Typography className="patient-info-label">Gender:</Typography>
            <Typography variant="body1" sx={{ color: "#777", marginRight: 2 }}>
              {patient.gender}
            </Typography>
            <Typography className="patient-info-label">Contact:</Typography>
            <Typography variant="body1" sx={{ color: "#777", marginRight: 2 }}>
              {patient.contact}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Loading patient details...</Typography>
      )}
    </Paper>
  );
};

export default PatientDetailsCard;
