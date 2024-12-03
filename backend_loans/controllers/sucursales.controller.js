import { Sucursales } from "../models/sucursales.model.js";

const getSucursales = async (req, res) => {
  try {
    const data = await Sucursales.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSucursales };
