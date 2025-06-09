const express  = require("express");
const Session  = require("../models/Session");   // ✅ EXACT name / path

const router = express.Router();

/* GET /api/sessions */
router.get("/", async (_, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* POST /api/sessions  */
router.post("/", async (req, res) => {
  const { name, date } = req.body;               // date optional
  try {
    const session = await Session.create({ name, date });
    res.status(201).json(session);
  } catch (e) {
    res.status(400).json({ error: e.message });  // → React will show 400 if name missing
  }
});

/* POST /api/sessions/:id/exercises */
router.post("/:id/exercises", async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.json(session);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
/* DELETE /api/sessions/:id/exercises/:idx  ─ remove one exercise by array index */
router.delete("/:id/exercises/:idx", async (req, res) => {
  const { id, idx } = req.params;        // <- keep names consistent
  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).end();

    session.exercises.splice(Number(idx), 1);
    await session.save();
    res.json(session);                    // send the updated session
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/* DELETE /api/sessions/:sid/exercises/:idx   (idx = array index) */
router.delete("/:sid/exercises/:idx", async (req, res) => {
  const { sid, idx } = req.params;
  try {
    const session = await Session.findById(sid);
    if (!session) return res.status(404).end();

    session.exercises.splice(idx, 1);
    await session.save();
    res.json(session);          // send updated session back
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


module.exports = router;
