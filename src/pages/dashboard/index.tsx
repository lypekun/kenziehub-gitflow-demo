import { Link, Navigate } from "react-router-dom";
import CardName from "../../components/cardName";
import { ConteinerHeader, ConteinerItens } from "./style";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastStyle } from "../../styles/styleToast";
import Technology from "../../components/technology";
import { useEffect, useState } from "react";
import Api from "../../services/api";
import logo from "../../assets/img/Logo.png";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [isLoged, setIsLoged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      Api.get("/profile", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          res.status === 200 || res.status === 201
            ? setIsLoged(true)
            : setIsLoged(false);
        })
        .catch(() => setIsLoged(false))
        .finally(() => setLoading(true));
    } else {
      setLoading(true);
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {loading && !isLoged ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <ConteinerHeader>
            <img
              src={logo}
              alt="logo da kenziehub"
              className="animate__backInLeft"
            />
            <Link
              onClick={() => {
                window.localStorage.clear();
                toast.success("Deslogado com sucesso", toastStyle);
              }}
              to={"/login"}
              className="logout animate__backInRight"
            >
              Sair
            </Link>
          </ConteinerHeader>
          <ConteinerItens>
            <CardName />
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </ConteinerItens>
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;
