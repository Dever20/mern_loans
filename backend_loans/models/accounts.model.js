import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    client: {
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
  },
  { timestamps: true }
);

export const Accounts = mongoose.model("Accounts", AccountsSchema);
