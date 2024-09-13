import { createTagChartData, createLineChartData, createSourceNameChartData, createApacRegionChartData, createGovLevelChartData, createDayOfWeekChartData } from './utils.js';

export const renderTagChart = () => {
  const { labels, data } = createTagChartData();
  renderChart('tagChart', 'bar', labels, data, "Tags", "Activity Count");
};

export const renderLineChart = () => {
  const { labels, data } = createLineChartData();
  renderChart('lineChart', 'line', labels, data, "Date", "Monthly Published Activities");
};

export const renderSourceNameChart = () => {
  const { labels, data } = createSourceNameChartData();
  renderChart('sourceNameChart', 'bar', labels, data, "", "Activity Count", false);
};

export const renderApacRegionChart = () => {
  const { labels, data } = createApacRegionChartData();
  renderChart('apacRegionChart', 'bar', labels, data, "Region", "Activity Count");
};

export const renderGovLevelChart = () => {
  const { labels, data } = createGovLevelChartData();
  renderChart('govLevelChart', 'bar', labels, data, "Gov Level", "Number of Results");
};

export const renderDayOfWeekChart = () => {
  const { labels, data } = createDayOfWeekChartData();
  renderChart('dayOfWeekChart', 'bar', labels, data, "(Of the currently open activities opened on...)", "Consultations Open");
};

const renderChart = (elementId, type, labels, data, xAxisTitle, yAxisTitle, displayXAxis = true) => {
  const ctx = document.getElementById(elementId).getContext("2d");
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: yAxisTitle,
          data: data,
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.4)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false, // Allow the chart to respect the set height
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          display: displayXAxis,
          title: {
            display: displayXAxis,
            text: xAxisTitle,
          },
        },
      },
    },
  });
};
