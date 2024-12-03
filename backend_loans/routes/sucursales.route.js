import express from "express";
const router = express.Router();
import { getSucursales } from "../controllers/sucursales.controller.js";

router.get("/", getSucursales);

export default router;
