import { Save as SaveIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SaveAsPDFButton = () => {
  const handleSaveAsPDF = async () => {
    const element = document.getElementById("patient-detail-container");

    // Check if the element exists
    if (!element) {
      console.error("Element not found!");
      return;
    }

    console.log("Element found, proceeding with PDF generation...");

    try {
      // Delay to ensure the DOM is fully rendered (if needed)
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay if necessary

      // Use html2canvas to take a snapshot of the element
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Enable CORS if you are loading images from another domain
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4"); // Specify orientation, unit, and format
      const imgWidth = 190; // Width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the first image to the PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("patient_detail.pdf");
      console.log("PDF saved successfully.");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <Tooltip title="Save as PDF">
      <IconButton color="primary" onClick={handleSaveAsPDF}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SaveAsPDFButton;
