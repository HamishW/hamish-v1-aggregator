export const sortConsultationsByNewest = (consultations) => {
    return [...consultations].sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
  };
  
  export const sortConsultationsByOldest = (consultations) => {
    return [...consultations].sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
  };
  