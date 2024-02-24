import express from "express";
import {google, signin, signup} from "../controllers/auth.controller";

const router = express.Router();

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/google', google)

export default router;