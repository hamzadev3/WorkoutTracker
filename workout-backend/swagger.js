// swagger.js
module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Workout Tracker API",
    version: "1.0.0",
    description: "Minimal docs so recruiters can click around."
  },
  servers: [
    { url: "http://localhost:8080", description: "Local" }
  ],
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": { description: "OK" }
        }
      }
    }
  }
};
