# Country Info API - Node.js Version

A Node.js version of the Country Info API, converted from Go to be deployable on Vercel.

## Features

- Built with Node.js and Express for local development
- Vercel API routes for serverless deployment
- Case-insensitive matching for both endpoints
- Same functionality as the original Go version

## Endpoints

### GET /api/list/country

Returns a list of countries based on partial name matching.

**Query Parameters:**

- `query` (optional): Partial country name for filtering

**Examples:**

```bash
# Get all countries
curl http://localhost:3000/api/list/country

# Get countries containing "united"
curl http://localhost:3000/api/list/country?query=united
```

### GET /api/info/country

Returns detailed information about a specific country.

**Query Parameters:**

- `query` (required): Exact country name

**Examples:**

```bash
# Get info for United States
curl http://localhost:3000/api/info/country?query=united%20states

# Case-insensitive matching
curl http://localhost:3000/api/info/country?query=UNITED%20STATES
```

## Response Format

### Country List Response

```json
{
  "countries": ["United States", "United Kingdom"]
}
```

### Country Info Response

```json
{
  "capital_city_name": "Washington D.C.",
  "money_unit": "USD",
  "population": 331900000
}
```

## Running Locally

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on port 3000.

### Production

```bash
npm start
```

## Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Or connect your GitHub repository through the Vercel dashboard.

## Available Countries

The application includes dummy data for 16 countries:

- United States, Canada, United Kingdom, Germany, France
- Japan, Australia, Brazil, India, China
- Italy, Spain, Mexico, South Korea, Russia

## Error Responses

- `400 Bad Request`: Missing required query parameter
- `404 Not Found`: Country not found
- `405 Method Not Allowed`: Invalid HTTP method

## Project Structure

```
nodejs-version/
├── api/
│   ├── info/
│   │   └── country.js    # GET /api/info/country
│   └── list/
│       └── country.js    # GET /api/list/country
├── server.js             # Express server for local development
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## Differences from Go Version

- Uses Node.js instead of Go
- Express.js for local development server
- Vercel API routes for serverless deployment
- No explicit mutex locking (Node.js is single-threaded)
- Uses console.log instead of zerolog
- Port changed from 8080 to 3000 for local development

#### Vercel deployment
[App](https://dummy-country-info-nodejs-pj37.vercel.app/)
