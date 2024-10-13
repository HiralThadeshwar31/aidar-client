import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface Vitals {
  timestamps: string[]; // Ensure these are in ISO 8601 format or numeric format
  heartRate: number[];
  bloodPressure: string[]; // blood pressure in 'systolic/diastolic' format
  respirationRate: number[];
  temperature: number[];
}

const VitalsChart: React.FC<{ data: Vitals }> = ({ data }) => {
  // State for chart options
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "line",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
    },
    stroke: {
      curve: "smooth", // Enable smooth lines
      width: 2, // Set line width
    },
    xaxis: {
      type: "datetime", // Set x-axis type to datetime
      title: {
        text: "Time",
      },
      labels: {
        formatter: function (value: string) {
          // Convert timestamp to readable format
          const timestamp = new Date(value).getTime(); // Convert to numeric timestamp
          return new Date(timestamp).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Set to true for 12-hour format
          });
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  // Prepare data for series
  const prepareData = (data: Vitals) => {
    const length = data.timestamps.length;

    // Convert timestamps to numeric format
    const numericTimestamps = data.timestamps.map((timestamp) =>
      new Date(timestamp).getTime()
    );

    // Heart Rate Series
    const heartRateSeries = [
      { name: "Heart Rate", data: data.heartRate.slice(0, length) },
    ];

    // Blood Pressure Series
    const bloodPressureData = data.bloodPressure.map((bp) => {
      const [systolic, diastolic] = bp.split("/").map(Number);
      return { systolic, diastolic };
    });

    const bloodPressureSeries = [
      {
        name: "Systolic Blood Pressure",
        data: bloodPressureData.map((bp) => bp.systolic).slice(0, length),
      },
      {
        name: "Diastolic Blood Pressure",
        data: bloodPressureData.map((bp) => bp.diastolic).slice(0, length),
      },
    ];

    // Respiration Rate Series
    const respirationRateSeries = [
      {
        name: "Respiration Rate",
        data: data.respirationRate.slice(0, length),
      },
    ];

    // Temperature Series
    const temperatureSeries = [
      {
        name: "Temperature",
        data: data.temperature.slice(0, length),
      },
    ];

    return {
      heartRateSeries,
      bloodPressureSeries,
      respirationRateSeries,
      temperatureSeries,
      numericTimestamps,
    };
  };

  // State for series data
  const [series, setSeries] = useState(prepareData(data));

  // Update series data when new data is received
  useEffect(() => {
    setSeries(prepareData(data));
  }, [data]);

  return (
    <div>
      <div className="chart-container">
        <h3>Heart Rate Chart</h3>
        <ReactApexChart
          options={{
            ...options,
            xaxis: { ...options.xaxis, categories: series.numericTimestamps }, // Use numeric timestamps for x-axis
            yaxis: { title: { text: "Heart Rate (bpm)" } },
          }}
          series={series.heartRateSeries}
          type="line"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h3>Blood Pressure Chart</h3>
        <ReactApexChart
          options={{
            ...options,
            xaxis: { ...options.xaxis, categories: series.numericTimestamps },
            yaxis: { title: { text: "Blood Pressure (mmHg)" } },
          }}
          series={series.bloodPressureSeries}
          type="line"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h3>Respiration Rate Chart</h3>
        <ReactApexChart
          options={{
            ...options,
            xaxis: { ...options.xaxis, categories: series.numericTimestamps },
            yaxis: { title: { text: "Respiration Rate (breaths/min)" } },
          }}
          series={series.respirationRateSeries}
          type="line"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h3>Temperature Chart</h3>
        <ReactApexChart
          options={{
            ...options,
            xaxis: { ...options.xaxis, categories: series.numericTimestamps },
            yaxis: { title: { text: "Temperature (°C)" } },
          }}
          series={series.temperatureSeries}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default VitalsChart;
