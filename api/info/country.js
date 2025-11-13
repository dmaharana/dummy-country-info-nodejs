// Country data (same as Go version)
const countryData = {
  "united states": { capitalCityName: "Washington D.C.", moneyUnit: "USD", population: 331900000 },
  "canada": { capitalCityName: "Ottawa", moneyUnit: "CAD", population: 38000000 },
  "united kingdom": { capitalCityName: "London", moneyUnit: "GBP", population: 67000000 },
  "germany": { capitalCityName: "Berlin", moneyUnit: "EUR", population: 83000000 },
  "france": { capitalCityName: "Paris", moneyUnit: "EUR", population: 67000000 },
  "japan": { capitalCityName: "Tokyo", moneyUnit: "JPY", population: 125000000 },
  "australia": { capitalCityName: "Canberra", moneyUnit: "AUD", population: 25000000 },
  "brazil": { capitalCityName: "Brasília", moneyUnit: "BRL", population: 215000000 },
  "india": { capitalCityName: "New Delhi", moneyUnit: "INR", population: 1380000000 },
  "china": { capitalCityName: "Beijing", moneyUnit: "CNY", population: 1400000000 },
  "italy": { capitalCityName: "Rome", moneyUnit: "EUR", population: 60000000 },
  "spain": { capitalCityName: "Madrid", moneyUnit: "EUR", population: 47000000 },
  "mexico": { capitalCityName: "Mexico City", moneyUnit: "MXN", population: 128000000 },
  "south korea": { capitalCityName: "Seoul", moneyUnit: "KRW", population: 52000000 },
  "russia": { capitalCityName: "Moscow", moneyUnit: "RUB", population: 146000000 },
};

// Country info API endpoint
module.exports = function handler(req, res) {
  // Log the request
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const query = (req.query.query || '').toLowerCase().trim();

  if (query === '') {
    return res.status(400).json({ error: "query parameter 'query' is required" });
  }

  const countryInfo = countryData[query];

  if (!countryInfo) {
    return res.status(404).json({ error: "country not found" });
  }

  console.log(`${timestamp} - Country info request - query: "${query}", capital: "${countryInfo.capitalCityName}"`);

  res.status(200).json({
    capital_city_name: countryInfo.capitalCityName,
    money_unit: countryInfo.moneyUnit,
    population: countryInfo.population
  });
};