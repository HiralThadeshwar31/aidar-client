import { Box, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface StartDatePickerProps {
  startDate: Date | null; // Define the prop type for startDate
  setStartDate: (date: Date | null) => void; // Define the prop type for setStartDate
}

const StartDatePicker: React.FC<StartDatePickerProps> = ({
  startDate,
  setStartDate,
}) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h6">Select Start Date:</Typography>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)} // Use setStartDate from props
        dateFormat="MM/dd/yyyy"
        isClearable
        placeholderText="Select a date"
      />
    </Box>
  );
};

export default StartDatePicker;
