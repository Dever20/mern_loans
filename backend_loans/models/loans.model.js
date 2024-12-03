import mongoose from "mongoose";

const loansSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    date_loan: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    idSucursal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Loans = mongoose.model("Loans", loansSchema);
