import express from 'express';
import Item from '../models/Item.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/', verifyUser, async (req, res) => {
  const item = new Item({ ...req.body, userId: req.userId });
  const saved = await item.save();
  res.json(saved);
});

router.get('/', verifyUser, async (req, res) => {
  const items = await Item.find({ userId: req.userId });
  res.json(items);
});

router.put('/:id', verifyUser, async (req, res) => {
  const updated = await Item.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete('/:id', verifyUser, async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
});

export default router;
