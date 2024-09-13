import { apiEndpoints } from './apiEndpoints.js';
import { populateGovLevelFilterDropdown, populateApacRegionFilterDropdown, populateTagFilterDropdown } from './filters.js';
import { renderTagChart, renderLineChart, renderSourceNameChart, renderApacRegionChart, renderGovLevelChart, renderDayOfWeekChart } from './charts.js';
import { setConsultationsData, consultationsData } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  const consultationList = document.getElementById("consultationList");
  const totalConsultations = document.getElementById("totalConsultations");
  const openConsultations = document.getElementById("openConsultations");
  const govLevelFilterButton = document.getElementById("govLevelFilterButton");
  const govLevelFilterDropdown = document.getElementById("govLevelFilterDropdown");
  const apacRegionFilterButton = document.getElementById("apacRegionFilterButton");
  const apacRegionFilterDropdown = document.getElementById("apacRegionFilterDropdown");
  const tagFilterButton = document.getElementById("tagFilterButton");
  const tagFilterDropdown = document.getElementById("tagFilterDropdown");
  const applyFiltersButton = document.getElementById("applyFiltersButton");
  const clearFiltersButton = document.getElementById("clearFiltersButton");
  const sortNewestButton = document.getElementById("sortNewestButton");
  const sortOldestButton = document.getElementById("sortOldestButton");
  const filteredCount = document.getElementById("filteredCount");
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  const exportCsvButton = document.getElementById('exportCsvButton');
  const startDatePicker = document.getElementById("startDatePicker");
  const endDatePicker = document.getElementById("endDatePicker");
  const spinner = document.getElementById("spinner");

  let filteredConsultations = [];

  // Function to apply filters
  const applyFilters = () => {
    const selectedGovLevels = getSelectedValues(document.querySelector("#govLevelFilterDropdown .py-1"));
    const selectedApacRegions = getSelectedValues(document.querySelector("#apacRegionFilterDropdown .py-1"));
    const selectedTags = getSelectedValues(document.querySelector("#tagFilterDropdown .py-1"));
    const startDate = startDatePicker.value ? new Date(startDatePicker.value) : null;
    const endDate = endDatePicker.value ? new Date(endDatePicker.value) : null;

    filteredConsultations = consultationsData.filter(consultation => {
      const govLevelMatch = selectedGovLevels.length === 0 || selectedGovLevels.includes(consultation.govLevel);
      const apacRegionMatch = selectedApacRegions.length === 0 || selectedApacRegions.includes(consultation.apacRegion);
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => consultation.tags.includes(tag));
      
      const consultationDate = consultation.startdate ? new Date(consultation.startdate) : null;
      const dateMatch = (!startDate || (consultationDate && consultationDate >= startDate)) && 
                        (!endDate || (consultationDate && consultationDate <= endDate));

      return govLevelMatch && apacRegionMatch && tagMatch && (consultationDate ? dateMatch : true);
    });

    sortAndRenderConsultations();
    filteredCount.textContent = `Filtered Consultations: ${filteredConsultations.length}`;
  };

  // Function to get selected values from checkboxes
  const getSelectedValues = (container) => {
    return Array.from(container.querySelectorAll("input[type='checkbox']:checked")).map(checkbox => checkbox.value);
  };

  // Function to render the list of consultations
  const renderConsultations = (consultations) => {
    consultationList.innerHTML = "";
    consultations.forEach((consultation, index) => {
      const row = document.createElement("tr");
      if (consultation.status === 'open') {
        row.style.backgroundColor = 'rgba(237, 255, 239)';
      } else {
        row.className = index % 2 === 0 ? "bg-white" : "bg-gray-100 hover:bg-gray-200";
      }

      const titleCell = document.createElement("td");
      titleCell.className = "border border-gray-300 px-4 py-2";
      const titleLink = document.createElement("a");
      titleLink.href = consultation.url;
      titleLink.textContent = consultation.title;
      titleLink.target = "_blank";
      titleLink.style.textDecoration = "underline";
      titleCell.appendChild(titleLink);

      const sourceText = document.createElement("div");
      sourceText.className = "text-sm text-gray-500";
      sourceText.textContent = `Source: ${consultation.sourceName}`;
      titleCell.appendChild(sourceText);

      const startDateCell = document.createElement("td");
      startDateCell.className = "border border-gray-300 px-4 py-2";
      startDateCell.textContent = formatDisplayDate(consultation.startdate);

      const endDateCell = document.createElement("td");
      endDateCell.className = "border border-gray-300 px-4 py-2";
      endDateCell.textContent = formatDisplayDate(consultation.enddate);

      const statusCell = document.createElement("td");
      statusCell.className = "border border-gray-300 px-4 py-2";
      statusCell.textContent = consultation.status;

      const tagsCell = document.createElement("td");
      tagsCell.className = "border border-gray-300 px-4 py-2";
      tagsCell.textContent = consultation.tags.join(', ');

      row.appendChild(titleCell);
      row.appendChild(startDateCell);
      row.appendChild(endDateCell);
      row.appendChild(statusCell);
      row.appendChild(tagsCell);

      consultationList.appendChild(row);
    });
  };

  // Function to format the date for display as dd/mm/yyyy
  const formatDisplayDate = (inputDate) => {
    if (!inputDate) return 'N/A';
    const parts = inputDate.split("/");
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return inputDate;
  };

  // Updated sorting functions
  const sortConsultationsByNewest = (consultations) => {
    return [...consultations].sort((a, b) => {
      if (!a.startdate && !b.startdate) return 0;
      if (!a.startdate) return 1;
      if (!b.startdate) return -1;
      return new Date(b.startdate) - new Date(a.startdate);
    });
  };

  const sortConsultationsByOldest = (consultations) => {
    return [...consultations].sort((a, b) => {
      if (!a.startdate && !b.startdate) return 0;
      if (!a.startdate) return 1;
      if (!b.startdate) return -1;
      return new Date(a.startdate) - new Date(b.startdate);
    });
  };

  const sortAndRenderConsultations = () => {
    const sortedConsultations = sortConsultationsByNewest(filteredConsultations);
    renderConsultations(sortedConsultations);
  };

  // Improved fetchData function with partial error handling
  const fetchData = async () => {
    try {
      spinner.classList.remove('hidden');
      const dataPromises = apiEndpoints.map(endpoint => 
        axios.get(endpoint.url)
          .then(response => ({
            success: true,
            data: response.data,
            endpoint: endpoint
          }))
          .catch(error => ({
            success: false,
            error: error,
            endpoint: endpoint
          }))
      );

      const results = await Promise.all(dataPromises);

      let successfulData = [];
      let failedEndpoints = [];

      results.forEach(result => {
        if (result.success) {
          successfulData = successfulData.concat(result.data.map(consultation => ({
            ...consultation,
            tags: result.endpoint.tags,
            sourceName: result.endpoint.sourceName,
            govLevel: result.endpoint.govLevel,
            apacRegion: result.endpoint.apacRegion,
          })));
        } else {
          failedEndpoints.push(result.endpoint.sourceName);
          console.error(`Failed to fetch data from ${result.endpoint.sourceName}:`, result.error);
        }
      });

      if (successfulData.length > 0) {
        setConsultationsData(successfulData);

        const openConsultationsCount = successfulData.filter(consultation => consultation.status === 'open').length;

        totalConsultations.textContent = `Total Consultations: ${successfulData.length}`;
        openConsultations.textContent = `Open Consultations: ${openConsultationsCount}`;

        filteredConsultations = successfulData;
        sortAndRenderConsultations();
        populateGovLevelFilterDropdown(document.querySelector("#govLevelFilterDropdown .py-1"));
        populateApacRegionFilterDropdown(document.querySelector("#apacRegionFilterDropdown .py-1"));
        populateTagFilterDropdown(document.querySelector("#tagFilterDropdown .py-1"));

        renderCharts();

        exportCsvButton.classList.remove('hidden');

        if (failedEndpoints.length > 0) {
          const warningMessage = `Warning: Failed to load data from the following sources: ${failedEndpoints.join(', ')}. The table has been populated with available data.`;
          displayWarning(warningMessage);
        }
      } else {
        throw new Error("Failed to fetch data from all sources.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch consultation data. Please try again later.");
    } finally {
      spinner.classList.add('hidden');
    }
  };

  // Function to display warnings
  const displayWarning = (message) => {
    const warningElement = document.createElement('div');
    warningElement.className = 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4';
    warningElement.textContent = message;
    document.querySelector('#consultationList').insertAdjacentElement('beforebegin', warningElement);
  };

  // Event listener for the "Apply Filters" button
  applyFiltersButton.addEventListener("click", applyFilters);

  // Event listener for the "Clear Filters" button
  clearFiltersButton.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
    startDatePicker.value = "";
    endDatePicker.value = "";
    filteredConsultations = consultationsData;
    sortAndRenderConsultations();
    filteredCount.textContent = `Filtered Consultations: ${filteredConsultations.length}`;
  });

  // Event listeners for filter buttons to toggle dropdowns
  govLevelFilterButton.addEventListener("click", () => {
    govLevelFilterDropdown.classList.toggle("hidden");
  });

  apacRegionFilterButton.addEventListener("click", () => {
    apacRegionFilterDropdown.classList.toggle("hidden");
  });

  tagFilterButton.addEventListener("click", () => {
    tagFilterDropdown.classList.toggle("hidden");
  });

  // Event listeners for sorting buttons
  sortNewestButton.addEventListener("click", () => {
    const sortedConsultations = sortConsultationsByNewest(filteredConsultations);
    renderConsultations(sortedConsultations);
  });

  sortOldestButton.addEventListener("click", () => {
    const sortedConsultations = sortConsultationsByOldest(filteredConsultations);
    renderConsultations(sortedConsultations);
  });

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    const headers = ['Title', 'Source', 'Start Date', 'End Date', 'Status', 'Tags', 'Government Level', 'APAC Region', 'URL'];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    data.forEach(item => {
      const row = [
        `"${item.title.replace(/"/g, '""')}"`,
        `"${item.sourceName}"`,
        formatDisplayDate(item.startdate),
        formatDisplayDate(item.enddate),
        item.status,
        `"${item.tags.join(', ')}"`,
        item.govLevel,
        item.apacRegion,
        `"${item.url}"`
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  };

  // Function to download CSV
  const downloadCSV = () => {
    const csv = convertToCSV(filteredConsultations);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'consultationsData.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Event listener for CSV export button
  exportCsvButton.addEventListener('click', downloadCSV);

  // Event listener for scroll to top button
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab');

  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      tabButtons.forEach(btn => {
        btn.classList.remove('tab-selected');
      });

      document.querySelectorAll('[id^="tab"]').forEach(tab => {
        tab.classList.add('hidden');
      });

      const tabId = event.target.getAttribute('data-tab');

      document.getElementById(tabId).classList.remove('hidden');

      event.target.classList.add('tab-selected');
    });
  });

  // Activate the first tab by default
  document.querySelector('.tab[data-tab="tab1"]').click();

  // Chart rendering function
  const renderCharts = () => {
    renderTagChart();
    renderLineChart();
    renderSourceNameChart();
    renderApacRegionChart();
    renderGovLevelChart();
    renderDayOfWeekChart();
  };

  // Initialize the application by fetching data
  fetchData();
});