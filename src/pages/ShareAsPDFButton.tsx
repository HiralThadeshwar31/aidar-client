import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import httpClient from "../httpClient";

interface ShareAsPDFButtonProps {
  patientName: string;
  physicianEmail: string;
  patientEmail: string;
}

const ShareAsPDFButton: React.FC<ShareAsPDFButtonProps> = ({
  patientName,
  physicianEmail,
  patientEmail,
}) => {
  const handleShareAsPDF = async () => {
    const element = document.getElementById("patient-detail-container");

    if (!element) {
      console.error("Element not found!");
      return;
    }

    // Use html2canvas to take a snapshot of the element
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Convert PDF to Blob
    const pdfBlob = pdf.output("blob");

    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append("pdf", pdfBlob, `${patientName}_details.pdf`);
    formData.append("physicianEmail", physicianEmail);
    formData.append("patientEmail", patientEmail);

    try {
      // Send the PDF file to the server for emailing
      await httpClient.post("http://localhost:5000/share_pdf", formData);
      alert("PDF has been shared with the patient successfully.");
    } catch (error) {
      console.error("Error sharing PDF:", error);
      alert("Failed to share PDF.");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleShareAsPDF}>
      Share as PDF
    </Button>
  );
};

export default ShareAsPDFButton;
