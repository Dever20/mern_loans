import express from "express";
const router = express.Router();
import { getLoans } from "../controllers/loans.controller.js";

router.get("/", getLoans);

export default router;
