// server.js
require('dotenv').config();                        // 1) load .env first

const express    = require('express');
const cors       = require('cors');
const mongoose   = require('mongoose');
const swaggerUi  = require('swagger-ui-express');
const swaggerDoc = require('./swagger');           // make sure swagger.js exists

const app = express();

// ---- CORS (reads allowed origins from .env) ----
const allowList = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// If you don't use cookies/auth, credentials can be false.
// Keeping true is fine; just don't use "*" when credentials=true.
const corsOptions = allowList.length
  ? { origin: allowList, credentials: true }
  : { origin: true, credentials: true };          // dev: allow localhost, etc.

app.use(cors(corsOptions));
app.use(express.json());

// ---- Health check (simple smoke test) ----
app.get('/health', (_req, res) => res.json({ ok: true }));

// ---- Swagger docs at /docs ----
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ---- Your API routes ----
const sessionRoutes = require('./routes/sessions');
const workoutRoutes = require('./routes/workouts');
app.use('/api/sessions', sessionRoutes);
app.use('/api/workouts', workoutRoutes);

// ---- MongoDB connect ----
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;  // support either name
if (!uri) {
  console.warn('No Mongo URI found (MONGODB_URI / MONGO_URI). Routes that touch DB will fail.');
} else {
  mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connect error:', err));
}

// ---- Start server only when file is run directly ----
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/docs`);
  });
}

// Export app for tests
module.exports = app;
