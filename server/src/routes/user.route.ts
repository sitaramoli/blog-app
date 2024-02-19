import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: "It's working"})
})

export default router;