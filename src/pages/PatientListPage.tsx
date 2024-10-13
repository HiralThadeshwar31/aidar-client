import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import httpClient from "../httpClient";
import NavBar from "./NavBar";

// Define the Patient type
interface Patient {
    id: string;
    name: string;
    email: string;
    dob: string;
    gender: string;
    contact: string;
}

const PatientListPage = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredRow, setHoveredRow] = useState<string | null>(null); // State for hovered row
    const [clickedRow, setClickedRow] = useState<string | null>(null); // State for clicked row

    // Fetch the patient list from the backend
    const fetchPatients = async () => {
        try {
            const response = await httpClient.get("//localhost:5000/patients");
            setPatients(response.data);
            setFilteredPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    // Filter patients based on the search query
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = patients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(query) ||
                patient.email.toLowerCase().includes(query)
        );
        setFilteredPatients(filtered);
        setPage(0); // Reset to the first page on search
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <>
            {/* Reusable Top NavBar */}
            <NavBar />

            {/* Patient List Table */}
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Patient List
                    </Typography>

                    {/* Search Field */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Search by Name or Email"
                        value={searchQuery}
                        onChange={handleSearch}
                        sx={{ mb: 2 }}
                    />

                    {/* Patient Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#8263D0', color: 'white', fontWeight: 'bold' }}>
                                        Name
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#8263D0', color: 'white', fontWeight: 'bold' }}>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#8263D0', color: 'white', fontWeight: 'bold' }}>
                                        Date of Birth
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#8263D0', color: 'white', fontWeight: 'bold' }}>
                                        Gender
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#8263D0', color: 'white', fontWeight: 'bold' }}>
                                        Contact
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPatients.length > 0 ? (
                                    filteredPatients
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((patient) => (
                                            <TableRow
                                                key={patient.id}
                                                onClick={() => {
                                                    setClickedRow(patient.id);
                                                    navigate(`/patients/${patient.id}`); // Navigate to patient details
                                                }} // Navigate to patient details
                                                onMouseEnter={() => setHoveredRow(patient.id)} // Set hovered row
                                                onMouseLeave={() => setHoveredRow(null)} // Reset hovered row
                                                sx={{
                                                    cursor: 'pointer',
                                                    backgroundColor: 
                                                        clickedRow === patient.id
                                                            ? '#D1C4E9' // Highlight clicked row
                                                            : hoveredRow === patient.id
                                                                ? '#EDE7F6' // Highlight hovered row
                                                                : 'transparent',
                                                    transition: 'background-color 0.2s',
                                                }} // Change cursor to pointer and manage background color
                                            >
                                                <TableCell>{patient.name}</TableCell>
                                                <TableCell>{patient.email}</TableCell>
                                                <TableCell>{patient.dob}</TableCell>
                                                <TableCell>{patient.gender}</TableCell>
                                                <TableCell>{patient.contact}</TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No patients found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredPatients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event: unknown, newPage: number) => setPage(newPage)} // Explicitly typed
                        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0); // Reset to the first page
                        }} // Explicitly typed
                    />
                </Box>
            </Container>
        </>
    );
};

export default PatientListPage;
