import mongoose from "mongoose";

const sucursalesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    iva: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Sucursales = mongoose.model("Sucursales", sucursalesSchema);
