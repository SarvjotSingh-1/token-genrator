// routes/tokenRoutes.js
import express from "express";
import { getAllTokens } from "../controllers/getTokenController.js";

const router = express.Router();

router.get("/gettokens", getAllTokens); // Route to get all tokens

export default router;