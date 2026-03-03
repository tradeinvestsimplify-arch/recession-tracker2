const fetch = require("node-fetch");

exports.handler = async function(event) {
  const seriesId = event.queryStringParameters.series;
  const apiKey = "8510b34529fb02c1f5b4d6a5573cefee";
  if (!seriesId) return { statusCode: 400, body: "Missing series" };
  try {
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=12`;
    const response = await fetch(url);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({error:"Fetch failed"}) };
  }
};