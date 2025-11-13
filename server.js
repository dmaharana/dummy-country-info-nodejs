const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and log requests
app.use(express.json());

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

// Helper function to convert to proper case
function toProperCase(name) {
  return name.toLowerCase().split(' ').map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
}

// Logging middleware
function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next();
}

app.use(loggingMiddleware);

// GET /api/list/country
app.get('/api/list/country', (req, res) => {
  const query = (req.query.query || '').toLowerCase().trim();
  const countryNames = [];

  if (query === '') {
    // Return all countries
    for (const name in countryData) {
      countryNames.push(toProperCase(name));
    }
  } else {
    // Filter countries by query
    for (const name in countryData) {
      if (name.toLowerCase().includes(query)) {
        countryNames.push(toProperCase(name));
      }
    }
  }

  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - Country list request - query: "${query}", results: ${countryNames.length}`);

  res.json({ countries: countryNames });
});

// GET /api/info/country
app.get('/api/info/country', (req, res) => {
  const query = (req.query.query || '').toLowerCase().trim();

  if (query === '') {
    return res.status(400).json({ error: "query parameter 'query' is required" });
  }

  const countryInfo = countryData[query];

  if (!countryInfo) {
    return res.status(404).json({ error: "country not found" });
  }

  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - Country info request - query: "${query}", capital: "${countryInfo.capitalCityName}"`);

  res.json({
    capital_city_name: countryInfo.capitalCityName,
    money_unit: countryInfo.moneyUnit,
    population: countryInfo.population
  });
});

// GET / (root route - landing page)
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Country Info API</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .description {
            text-align: center;
            color: #666;
            margin-bottom: 40px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            border-left: 4px solid #007bff;
        }
        .endpoint h3 {
            margin-top: 0;
            color: #007bff;
        }
        .code {
            background: #e9ecef;
            padding: 10px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
        }
        .example {
            background: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #888;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌍 Country Info API</h1>
        <p class="description">A simple REST API for retrieving country information</p>
        
        <div class="endpoint">
            <h3>1. List Countries</h3>
            <p>Returns a list of all available countries or filters based on a search query.</p>
            <div class="code">GET /api/list/country?query={search_term}</div>
            
            <div class="example">
                <strong>Examples:</strong><br>
                • <code>/api/list/country</code> - Get all countries<br>
                • <code>/api/list/country?query=us</code> - Get countries containing "us"
            </div>
            
            <strong>Response:</strong>
            <pre>{ "countries": ["United States", "Australia", "Canada", ...] }</pre>
        </div>
        
        <div class="endpoint">
            <h3>2. Country Information</h3>
            <p>Returns detailed information about a specific country.</p>
            <div class="code">GET /api/info/country?query={country_name}</div>
            
            <div class="example">
                <strong>Examples:</strong><br>
                • <code>/api/info/country?query=united states</code><br>
                • <code>/api/info/country?query=japan</code>
            </div>
            
            <strong>Response:</strong>
            <pre>{
  "capital_city_name": "Washington D.C.",
  "money_unit": "USD",
  "population": 331900000
}</pre>
        </div>
        
        <div class="footer">
            <p>🚀 Deployed on Vercel | Built with Node.js</p>
            <p>Supported countries: United States, Canada, United Kingdom, Germany, France, Japan, Australia, Brazil, India, China, Italy, Spain, Mexico, South Korea, Russia</p>
        </div>
    </div>
</body>
</html>`;
  
  res.send(html);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Country Info API server running on port ${port}`);
  console.log(`Available endpoints:`);
  console.log(`  GET / - Landing page with API documentation`);
  console.log(`  GET /api/list/country - Get list of countries`);
  console.log(`  GET /api/info/country - Get country information`);
});

module.exports = app;