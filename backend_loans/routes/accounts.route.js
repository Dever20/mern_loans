import express from "express";
const router = express.Router();
import { getAccounts } from "../controllers/accounts.controller.js";

router.get("/", getAccounts);

export default router;
