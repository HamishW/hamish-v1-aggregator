import { consultationsData } from './state.js';

export const populateGovLevelFilterDropdown = (container) => {
  const uniqueGovLevels = [...new Set(consultationsData.map(consultation => consultation.govLevel))];
  container.innerHTML = "";
  createCheckboxes(uniqueGovLevels, container);
};

export const populateApacRegionFilterDropdown = (container) => {
  const uniqueApacRegions = [...new Set(consultationsData.map(consultation => consultation.apacRegion))];
  container.innerHTML = "";
  createCheckboxes(uniqueApacRegions, container);
};

export const populateTagFilterDropdown = (container) => {
  const uniqueTags = [...new Set(consultationsData.flatMap(consultation => consultation.tags))];
  container.innerHTML = "";
  createCheckboxes(uniqueTags, container);
};

const createCheckboxes = (uniqueItems, container) => {
  uniqueItems.forEach(item => {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "flex items-center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item;
    checkbox.className = "mr-2";
    const label = document.createElement("label");
    label.textContent = item;
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    container.appendChild(checkboxContainer);
  });
};
