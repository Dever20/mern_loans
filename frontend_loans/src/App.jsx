import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "./assets/logo.png";

function App() {
  const [cliente, setCliente] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingButtonSimular, setLoadingButtonSimular] = useState(false);
  const [loadingButtonEjecutar, setLoadingButtonEjecutar] = useState(false);
  const [dataEjecutarPago, setDataEjecutarPago] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/payments/paymentspending"
      );
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Simulacion
  const handleSimulacion = async (e) => {
    e.preventDefault();
    setLoadingButtonSimular(() => true);
    try {
      const respon = await axios.get(
        "http://localhost:3000/api/payments/paymentsactivepending"
      );

      if (respon.status == 200) {
        if (
          respon.data.some(
            (item) => item["client"] === cliente && item["id"] === identificador
          )
        ) {
          toast.success(
            "Cliente: " +
              cliente +
              ", " +
              "Identificador: " +
              identificador +
              ", Simulación exitosa Pagado.",
            {
              duration: 6000,
            }
          );
        } else {
          toast(
            "Cliente: " +
              cliente +
              ", " +
              "Identificador: " +
              identificador +
              ", Esta cuenta de Débito no esta activa.",
            {
              icon: "❌",
              duration: 6000,
            }
          );
        }
      }
      setLoadingButtonSimular(() => false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Ejecutar
  const handleEjecutar = async (e) => {
    e.preventDefault();
    setLoadingButtonEjecutar(() => true);
    try {
      const respon = await axios.get(
        "http://localhost:3000/api/payments/paymentsactivepending"
      );

      if (respon.status == 200) {
        if (
          respon.data.some(
            (item) => item["client"] === cliente && item["id"] === identificador
          )
        ) {
          const response = await axios.post(
            "http://localhost:3000/api/payments/executepayments",
            dataEjecutarPago
          );
          if (response.data.status == "success") {
            toast.success(response.data.message);
            fetchData();
          } else toast.error(response.data.message);
        } else {
          toast(
            "Cliente: " +
              cliente +
              ", " +
              "Identificador: " +
              identificador +
              ", Esta cuenta de Débito no esta activa.",
            {
              icon: "❌",
              duration: 6000,
            }
          );
        }
      }
      setLoadingButtonEjecutar(() => false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container-loans">
        <div className="navbar">
          <img src={logo} alt="Pending Payments" width="50" height="50" />
          <h2>Cuentas Pendientes</h2>
        </div>

        {loading ? (
          <h3>Cargando Lista...</h3>
        ) : (
          <div className="view-loans">
            <div>
              <p>
                <b>Cliente: </b> {cliente}
              </p>
              <p>
                <b>Identificador: </b> {identificador}
              </p>
            </div>
            <div className="group-button">
              <button
                disabled={cliente.length && identificador.length ? false : true}
                onClick={handleSimulacion}
              >
                {loadingButtonSimular ? "Cargando..." : "Simular pagos"}
              </button>
              <button
                disabled={loadingButtonEjecutar ? true : false}
                onClick={handleEjecutar}
              >
                {loadingButtonEjecutar ? "Cargando..." : "Ejecutar pagos"}
              </button>
            </div>
            <table className="loans">
              <tr>
                <th>Cliente</th>
                <th>Sucursal</th>
                <th>Identificador</th>
                <th>Monto</th>
              </tr>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => [
                        setCliente(item.client),
                        setIdentificador(item.id),
                        setDataEjecutarPago(item),
                      ]}
                    >
                      <td>{item.client}</td>
                      <td>{item.sucursal}</td>
                      <td>{item.id}</td>
                      <td>$ {item.amount}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
