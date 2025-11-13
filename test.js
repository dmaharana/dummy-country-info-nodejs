#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'localhost:3000';

function makeRequest(path, callback) {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`\n${path}:`);
      console.log(`Status: ${res.statusCode}`);
      console.log('Response:', JSON.parse(data));
      if (callback) callback();
    });
  });

  req.on('error', (error) => {
    console.error(`Error with ${path}:`, error);
    if (callback) callback();
  });

  req.end();
}

console.log('Testing Country Info API...\n');

let currentIndex = 0;
const tests = [
  () => makeRequest('/api/list/country', tests[1]),
  () => makeRequest('/api/list/country?query=united', tests[2]),
  () => makeRequest('/api/info/country?query=united%20states', tests[3]),
  () => makeRequest('/api/info/country?query=canada', tests[4]),
  () => makeRequest('/api/info/country', tests[5]), // Should return 400
  () => makeRequest('/api/info/country?query=nonexistent', () => console.log('\nAll tests completed!')) // Should return 404
];

// Start the test chain
tests[0]();