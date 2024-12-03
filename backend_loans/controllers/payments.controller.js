import { Loans } from "../models/loans.model.js";
import { Sucursales } from "../models/sucursales.model.js";
import { Accounts } from "../models/accounts.model.js";

// Retornar Pagos en estatus "Pendiente"
const getPaymentsPending = async (req, res) => {
  try {
    const dataLoans = await Loans.find({});
    const dataSucursales = await Sucursales.find({});
    // Filtrar solo estado pendiente
    const pendientes = dataLoans.filter((item) => item.status === "Pendiente");
    let sucursal = [...pendientes];

    // Agregar nombre sucursal y calculo amount
    sucursal &&
      sucursal.map((itemP, index) => {
        dataSucursales &&
          dataSucursales.map((itemS) => {
            if (itemP.idSucursal == itemS.id) {
              sucursal[index] = {
                client: sucursal[index]._doc.client,
                sucursal: itemS.name,
                id: sucursal[index]._doc.id,
                amount: (
                  parseFloat(sucursal[index]._doc.amount) *
                    (parseFloat(itemS.iva) / 100) +
                  parseFloat(sucursal[index]._doc.amount)
                ).toFixed(2),
              };
            }
          });
      });
    res.status(200).json(sucursal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retornar registros cuentas que estan activas y pagos con estatus "Pendiente"
const getPaymentsActivePending = async (req, res) => {
  try {
    const dataLoans = await Loans.find({});
    const dataAccounts = await Accounts.find({});
    // Filtrar solo estado pendiente
    const pendientes = dataLoans.filter((item) => item.status === "Pendiente");

    // Filtrar solo estado activa
    const accounts = dataAccounts.filter((item) => item.status === "Activa");

    let data = [];

    // Agregar client y id
    pendientes &&
      pendientes.map((itemD, index) => {
        accounts &&
          accounts.map((itemA) => {
            if (itemD.client == itemA.client) {
              data.push({
                client: itemD.client,
                id: itemD.id,
              });
            }
          });
      });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ejecutar pagos
const postExecutePayments = async (req, res) => {
  try {
    const { client, id, amount } = req.body;
    const dataAccount = await Accounts.find({});
    const dataLoans = await Loans.find({});

    let dataAccountActive = dataAccount.find((item) => item.client === client);
    let dataLoansUpdate = dataLoans.find(
      (item) => item.client === client && item.id === id
    );
    if (dataAccountActive) {
      if (Number(dataAccountActive.amount) >= Number(amount)) {
        dataAccountActive.amount = dataAccountActive.amount - amount;
        dataLoansUpdate.status = "Pagado";
        await Accounts.updateOne(
          { _id: dataAccountActive._id },
          dataAccountActive
        );
        await Loans.updateOne({ _id: dataLoansUpdate._id }, dataLoansUpdate);
        res.status(200).json({
          status: "success",
          message: "Se ha pagado prestamos exitosamente.",
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "El cliente seleccionado no tiene suficiente saldo.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPaymentsPending, getPaymentsActivePending, postExecutePayments };
