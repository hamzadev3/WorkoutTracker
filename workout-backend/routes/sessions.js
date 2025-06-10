const express  = require("express");
const Session  = require("../models/Session");
const router   = express.Router();

/* GET  /api/sessions
   community (guest)     → ?scope=community
   community (user)      → ?scope=community&userId=uid
   my-workouts (user)    → ?scope=mine&userId=uid            */
router.get("/", async (req, res) => {
  const { userId, scope = "community" } = req.query;

  const filter =
    scope === "mine"
      ? { userId }                      // only owner
      : { isPublic: true };             // community (public only)

  try {
    const sessions = await Session.find(filter).sort({ date: -1 });
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* POST  /api/sessions  (owner creates) */
router.post("/", async (req, res) => {
  const { name, date, userId, userName, isPublic } = req.body;
  if (!userId) return res.status(401).json({ error: "Missing userId" });

  try {
    const s = await Session.create({
      name,
      date,
      userId,
      userName,
      isPublic,
      exercises: []
    });
    res.status(201).json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/* DELETE entire session (owner only) */
router.delete("/:id", async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

/* POST add exercise */
router.post("/:id/exercise", async (req, res) => {
  try {
    const s = await Session.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/* DELETE exercise by index */
router.delete("/:id/exercise/:idx", async (req, res) => {
  const { id, idx } = req.params;
  try {
    const s = await Session.findById(id);
    if (!s) return res.status(404).end();
    s.exercises.splice(Number(idx), 1);
    await s.save();
    res.json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
