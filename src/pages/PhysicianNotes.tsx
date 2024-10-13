import {
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { ChangeEvent } from "react";

// Define the Note type
interface Note {
  id: string;
  created_at: string;
  note: string;
  physician_id: string;
}

// Define the Physician type
interface Physician {
  id: string;
  name: string;
  email: string;
  specialization: string;
  contact_number: number;
}

interface PhysicianNotesProps {
  notes: Note[];
  physicians: Physician[];
  physicianFilter: string;
  setPhysicianFilter: (filter: string) => void;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PhysicianNotes: React.FC<PhysicianNotesProps> = ({
  notes,
  physicians,
  physicianFilter,
  setPhysicianFilter,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  // Filter notes based on physician
  const filteredNotes = physicianFilter
    ? notes.filter((note) => {
        const physician = physicians.find(
          (phys) => phys.id === note.physician_id
        );
        return physician && physician.name === physicianFilter;
      })
    : notes;

  return (
    <Paper className="notes-section">
      <Typography variant="h5" gutterBottom>
        Physician Notes
      </Typography>

      {/* Filter options */}
      <TextField
        select
        label="Filter by Physician"
        value={physicianFilter}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPhysicianFilter(e.target.value)
        }
        sx={{ mb: 2, minWidth: 200 }}
      >
        <MenuItem value="">All Physicians</MenuItem>
        {physicians.map((physician) => (
          <MenuItem key={physician.id} value={physician.name}>
            Dr. {physician.name}
          </MenuItem>
        ))}
      </TextField>

      {filteredNotes.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="physician notes table">
              <TableHead>
                <TableRow>
                  <TableCell className="notes-table-header">Note</TableCell>
                  <TableCell className="notes-table-header">
                    Physician
                  </TableCell>
                  <TableCell className="notes-table-header">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNotes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((note, index) => {
                    const physician = physicians.find(
                      (phys) => phys.id === note.physician_id
                    );
                    return (
                      <TableRow
                        key={note.id}
                        className={`notes-table-row ${
                          index % 2 === 0
                            ? "notes-table-row-even"
                            : "notes-table-row-odd"
                        }`}
                      >
                        <TableCell>{note.note}</TableCell>
                        <TableCell>
                          {physician ? `Dr. ${physician.name}` : "Unknown"}
                        </TableCell>
                        <TableCell>
                          {new Date(note.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredNotes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="h6" className="no-notes">
          No notes available for this patient.
        </Typography>
      )}
    </Paper>
  );
};

export default PhysicianNotes;
