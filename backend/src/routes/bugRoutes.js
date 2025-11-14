const express = require('express');
const router = express.Router();
const BugModel = require('../models/Bug');
const validateBug = require('../utils/validation').validateBug;

router.get('/', async (req, res, next) => {
  try {
    const all = await BugModel.findAll();
    res.json(all);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = validateBug(req.body);
    if (error) return res.status(400).json({ message: error });
    const bug = await BugModel.create(req.body);
    res.status(201).json(bug);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await BugModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await BugModel.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  } catch (e) { next(e); }
});

module.exports = router;
