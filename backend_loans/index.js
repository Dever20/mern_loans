import express from "express";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import loansRoute from "./routes/loans.route.js";
import sucursalesRoute from "./routes/sucursales.route.js";
import accountsRoute from "./routes/accounts.route.js";
import paymentsRoute from "./routes/payments.route.js";

const app = express();
app.use(cors({ origin: "*" }));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/loans", loansRoute);
app.use("/api/sucursales", sucursalesRoute);
app.use("/api/accounts", accountsRoute);
app.use("/api/payments", paymentsRoute);

app.get("/", (req, res) => {
  res.send("API REST SERVER - LOANS");
});

// listen
app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port: ", 3000);
});
