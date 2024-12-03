import { Loans } from "../models/loans.model.js";

const getLoans = async (req, res) => {
  try {
    const data = await Loans.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getLoans };
