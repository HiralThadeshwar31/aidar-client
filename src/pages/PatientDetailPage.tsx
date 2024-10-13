import { Avatar, Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../httpClient";
import "./css/PatientDetailPage.css";
import NavBar from "./NavBar";
import PhysicianNotes from "./PhysicianNotes";
import SaveAsPDFButton from "./SaveAsPdfButton";
import StartDatePicker from "./StartDatePicker"; // Import the StartDatePicker component
import VitalsChart from "./VitalsChart";

interface Patient {
  id: string;
  name: string;
  email: string;
  dob: string;
  gender: string;
  contact: string;
}

interface Note {
  id: string;
  created_at: string;
  note: string;
  physician_id: string;
}

interface Physician {
  id: string;
  name: string;
  email: string;
  specialization: string;
  contact_number: number;
}

interface Vitals {
  heartRate: number[];
  bloodPressure: string[];
  respirationRate: number[];
  temperature: number[];
  timestamps: string[];
}

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [physicianFilter, setPhysicianFilter] = useState<string>("");
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: [],
    bloodPressure: [],
    respirationRate: [],
    temperature: [],
    timestamps: [],
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPatientDetails = async () => {
    try {
      const response = await httpClient.get(
        `http://localhost:5000/patients/${id}`
      );
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const fetchPatientNotes = async (startDate: Date | null) => {
    const formattedStartDate = startDate ? startDate.toISOString() : null;
    const url = `http://localhost:5000/physician_notes/${id}${
      formattedStartDate ? `?start_date=${formattedStartDate}` : ""
    }`;

    console.log("Fetching data from URL:", url);
    try {
      const response = await httpClient.get(url);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching patient notes:", error);
    }
  };

  const fetchPhysicianDetails = async () => {
    try {
      const response = await httpClient.get(`http://localhost:5000/users`);
      setPhysicians(response.data);
    } catch (error) {
      console.error("Error fetching physician details:", error);
    }
  };

  const fetchVitalsData = async (startDate: Date | null) => {
    const formattedStartDate = startDate ? startDate.toISOString() : null;
    const url = formattedStartDate
      ? `http://localhost:5000/vitals/${id}?start_date=${formattedStartDate}`
      : `http://localhost:5000/vitals/${id}`;

    console.log("Fetching data from URL:", url);
    try {
      const response = await httpClient.get(url);
      const vitalsResponse = response.data;

      setVitals({
        heartRate: vitalsResponse.map((vital: any) => vital.heart_rate),
        bloodPressure: vitalsResponse.map((vital: any) => vital.blood_pressure),
        respirationRate: vitalsResponse.map(
          (vital: any) => vital.respiration_rate
        ),
        temperature: vitalsResponse.map((vital: any) => vital.temperature),
        timestamps: vitalsResponse.map((vital: any) =>
          new Date(vital.measurement_time).toISOString()
        ),
      });
    } catch (error) {
      console.error("Failed to fetch vitals data:", error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchPatientNotes(startDate);
    fetchPhysicianDetails();
    fetchVitalsData(startDate);
  }, [id, startDate]);

  return (
    <>
      <NavBar />
      <Container id="patient-detail-container" className="container">
        {" "}
        {/* Add ID here */}
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper className="patient-details">
                <Typography
                  variant="h4"
                  gutterBottom
                  className="patient-details-title"
                >
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
                        sx={{
                          marginRight: 2,
                          color: "#555",
                          fontWeight: "bold",
                        }}
                      >
                        {patient.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#777", marginRight: 2 }}
                      >
                        {patient.email}
                      </Typography>
                    </Box>
                    <Box className="patient-info-row">
                      <Typography className="patient-info-label">
                        DOB:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#777", marginRight: 2 }}
                      >
                        {new Date(patient.dob).toLocaleDateString()}
                      </Typography>
                      <Typography className="patient-info-label">
                        Gender:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#777", marginRight: 2 }}
                      >
                        {patient.gender}
                      </Typography>
                      <Typography className="patient-info-label">
                        Contact:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#777", marginRight: 2 }}
                      >
                        {patient.contact}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1">
                    Loading patient details...
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex", // Set to flex to align items inline
                  justifyContent: "flex-end",
                  alignItems: "center", // Align items vertically center
                  mt: 2,
                }}
              >
                <StartDatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
                <Box sx={{ ml: 2 }}>
                  {" "}
                  {/* Add some left margin for spacing */}
                  <SaveAsPDFButton />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <VitalsChart data={vitals} />
            </Grid>

            <Grid item xs={12}>
              <PhysicianNotes
                notes={notes}
                physicians={physicians}
                physicianFilter={physicianFilter}
                setPhysicianFilter={setPhysicianFilter}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default PatientDetailPage;
