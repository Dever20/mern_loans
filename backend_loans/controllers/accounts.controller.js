import { Accounts } from "../models/accounts.model.js";

const getAccounts = async (req, res) => {
  try {
    const data = await Accounts.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAccounts };
