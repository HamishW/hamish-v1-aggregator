// apiEndpoints.js

export const apiEndpoints = [
    // NZ API Endpoints
    { url: "https://consultations.justice.govt.nz/api/2.4/json_search_results", tags: ["Justice"], sourceName: "Ministry of Justice", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consult.health.govt.nz/api/2.4/json_search_results", tags: ["Health"], sourceName: "Ministry of Health", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consult.environment.govt.nz/api/2.4/json_search_results", tags: ["Environment"], sourceName: "Ministry for the Environment", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultations.msd.govt.nz/api/2.4/json_search_results", tags: ["Social Development"], sourceName: "Ministry of Social Development", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultations.standards.govt.nz/api/2.4/json_search_results", tags: ["Standards"], sourceName: "Standards New Zealand", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultation.dpmc.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Department of Prime Minister and Cabinet", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultations.dia.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Department of Internal Affairs", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://haveyoursay.climatecommission.govt.nz/api/2.4/json_search_results", tags: ["Environment"], sourceName: "Climate Change Commission", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consult.transport.govt.nz/api/2.4/json_search_results", tags: ["Infrastructure"], sourceName: "Ministry of Transport", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://te-puna-korero.taumataarowai.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Taumata Arowai", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://haveyoursay.marlborough.govt.nz/api/2.4/json_search_results", tags: ["Local"], sourceName: "Marlborough District Council", govLevel: "Local", apacRegion: "NZ" },
    { url: "https://haveyoursay.hamilton.govt.nz/api/2.4/json_search_results", tags: ["Local"], sourceName: "Hamilton City Council", govLevel: "Local", apacRegion: "NZ" },
    { url: "https://consultations.rbnz.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Reserve Bank of New Zealand", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultation.fireandemergency.nz/api/2.4/json_search_results", tags: ["Emergency"], sourceName: "Fire and Emergency New Zealand", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://review.hdc.org.nz/api/2.4/json_search_results", tags: ["Health"], sourceName: "Health and Disability Commissioner", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultation.dpmc.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Department of Prime Minister and Cabinet", govLevel: "Central", apacRegion: "NZ" },
    { url: "https://consultation.regulation.govt.nz/api/2.4/json_search_results", tags: ["Policy"], sourceName: "Ministry for Regulation", govLevel: "Central", apacRegion: "NZ" },

    // WA API Endpoints
    { url: "https://consultation.infrastructure.wa.gov.au/api/2.4/json_search_results", tags: ["Infrastructure"], sourceName: "Infrastructure WA", govLevel: "State", apacRegion: "WA" },
    { url: "https://consultation.dmirs.wa.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "Department of Mines, Industry Regulation and Safety", govLevel: "State", apacRegion: "WA" },
    { url: "https://consultation.health.wa.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "Department of Health, Western Australia", govLevel: "State", apacRegion: "WA" },
    { url: "https://consultation.epa.wa.gov.au/api/2.4/json_search_results", tags: ["Environment"], sourceName: "Environmental Protection Authority of Western Australia", govLevel: "State", apacRegion: "WA" },
    { url: "https://consult.dwer.wa.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "Department of Water and Environmental Regulation", govLevel: "State", apacRegion: "WA" },
    { url: "https://jtsi.citizenspace.com/api/2.4/json_search_results", tags: ["Research and Innovation"], sourceName: "Department of Jobs, Tourism, Science and Innovation", govLevel: "State", apacRegion: "WA" },
    // QLD API Endpoints
    { url: "https://haveyoursay.dsd.qld.gov.au/api/2.4/json_search_results", tags: ["Infrastructure"], sourceName: "Department of State Development, Infrastructure, Local Government and Planning", govLevel: "State", apacRegion: "QLD" },
    { url: "https://cqhealth.citizenspace.com/api/2.4/json_search_results", tags: ["Health"], sourceName: "Central Queensland HHS", govLevel: "Public", apacRegion: "QLD" },
    // Federal API Endpoints
    { url: "https://consultations.ag.gov.au/api/2.4/json_search_results", tags: ["Justice"], sourceName: "Attorney Generals Department", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultation.nopsema.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "NOPSEMA", govLevel: "Federal", apacRegion: "WA" },
    { url: "https://consultations.foodstandards.gov.au/api/2.4/json_search_results", tags: ["Standards"], sourceName: "Food Standards Australia and New Zealand", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultations.health.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "Department of Health and Aged Care", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultation.ipaustralia.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "IP Australia", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultation.abcb.gov.au/api/2.4/json_search_results", tags: ["Standards"], sourceName: "Australian Building Codes Board", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://ohta-consultations.health.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "Office of Health Technology Assessment", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultation.accc.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "Australian Competition and Consumer Commission", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultation.casa.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "Civil Aviation Safety Authority", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consult.abs.gov.au/api/2.4/json_search_results", tags: ["Independent Statutory Org"], sourceName: "Australian Bureau of Statistics", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultations.tga.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "Therapeutic Goods Administration", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consult.arpansa.gov.au/api/2.4/json_search_results", tags: ["Regulator"], sourceName: "Australian Radiation Protection and Nuclear Safety Agency", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://consultations.nhmrc.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "National Health and Medical Research Council", govLevel: "Federal", apacRegion: "ACT" },
    { url: "https://engage.ihacpa.gov.au/api/2.4/json_search_results", tags: ["Health"], sourceName: "Independent Health and Aged Care Pricing Authority", govLevel: "Federal", apacRegion: "ACT" },
    // Add more endpoints with multiple tags as needed
  ];
  