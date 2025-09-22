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

module.exports = app;

// 👉 Only connect to Mongo + start server when this file is run directly
if (require.main === module) {
  // Skip DB connection in tests
  const isTest = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID;

  const start = async () => {
    const port = process.env.PORT || 8080;

    if (!isTest) {
      if (!process.env.MONGO_URI) {
        console.error('Missing MONGO_URI. Set it in .env');
        process.exit(1);
      }
      try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connect error:', err);
        process.exit(1);
      }
    }

    app.listen(port, () =>
      console.log(`API running on http://localhost:${port}${isTest ? ' [test mode]' : ''}`)
    );
  };

  start();
}