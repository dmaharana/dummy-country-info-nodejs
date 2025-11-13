module.exports = function handler(req, res) {
  // Log the request
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  res.status(200).send(html);
};