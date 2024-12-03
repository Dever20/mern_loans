import express from "express";
const router = express.Router();
import {
  getPaymentsPending,
  getPaymentsActivePending,
  postExecutePayments,
} from "../controllers/payments.controller.js";

router.get("/paymentspending", getPaymentsPending);
router.get("/paymentsactivepending", getPaymentsActivePending);
router.post("/executepayments", postExecutePayments);

export default router;
