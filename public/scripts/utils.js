import { consultationsData } from './state.js';

export const createTagChartData = () => {
  const tagCounts = {};
  consultationsData.forEach((consultation) => {
    consultation.tags.forEach((tag) => {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  const labels = Object.keys(tagCounts);
  const data = Object.values(tagCounts);
  return { labels, data };
};

export const createLineChartData = () => {
  const cumulativeData = {};

  consultationsData.forEach((consultation) => {
    const startDate = new Date(consultation.startdate);
    const formattedDate = formatDate(startDate);

    if (cumulativeData[formattedDate]) {
      cumulativeData[formattedDate]++;
    } else {
      cumulativeData[formattedDate] = 1;
    }
  });

  const timelineData = Object.entries(cumulativeData).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  const monthlyData = {};
  timelineData.forEach(([date, count]) => {
    const [year, month] = date.split("-");
    const monthYear = `${year}-${month}`;
    if (monthlyData[monthYear]) {
      monthlyData[monthYear] += count;
    } else {
      monthlyData[monthYear] = count;
    }
  });

  const labels = Object.keys(monthlyData);
  const data = Object.values(monthlyData);

  return { labels, data };
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};

export const createSourceNameChartData = () => {
  const sourceNameCounts = {};
  consultationsData.forEach((consultation) => {
    const sourceName = consultation.sourceName;
    if (sourceNameCounts[sourceName]) {
      sourceNameCounts[sourceName]++;
    } else {
      sourceNameCounts[sourceName] = 1;
    }
  });

  const sortedData = Object.entries(sourceNameCounts).sort((a, b) => b[1] - a[1]);

  const labels = sortedData.map(([sourceName]) => sourceName);
  const data = sortedData.map(([, count]) => count);

  return { labels, data };
};

export const createApacRegionChartData = () => {
  const apacRegionCounts = {};
  consultationsData.forEach((consultation) => {
    const apacRegion = consultation.apacRegion;
    if (apacRegionCounts[apacRegion]) {
      apacRegionCounts[apacRegion]++;
    } else {
      apacRegionCounts[apacRegion] = 1;
    }
  });

  const sortedLabels = Object.keys(apacRegionCounts).sort();

  const labels = sortedLabels;
  const data = labels.map((apacRegion) => apacRegionCounts[apacRegion]);

  return { labels, data };
};

export const createGovLevelChartData = () => {
  const govLevelCounts = {};
  consultationsData.forEach((consultation) => {
    const govLevel = consultation.govLevel;
    if (govLevelCounts[govLevel]) {
      govLevelCounts[govLevel]++;
    } else {
      govLevelCounts[govLevel] = 1;
    }
  });

  const labels = Object.keys(govLevelCounts);
  const data = labels.map((govLevel) => govLevelCounts[govLevel]);

  return { labels, data };
};

export const createDayOfWeekChartData = () => {
  const dayOfWeekCounts = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  consultationsData.forEach((consultation) => {
    if (consultation.status === 'open') {
      const dayOfWeek = getDayOfWeek(consultation.startdate);
      dayOfWeekCounts[dayOfWeek]++;
    }
  });

  const labels = Object.keys(dayOfWeekCounts);
  const data = Object.values(dayOfWeekCounts);
  return { labels, data };
};

const getDayOfWeek = (dateString) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return daysOfWeek[date.getUTCDay()];
};
