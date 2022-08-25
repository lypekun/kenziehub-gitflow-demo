import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Conteiner } from "../../styles/FormStyle";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/img/Logo.png"

function Login() {
  const { singIn } = useContext(AuthContext)

  const [visible, setVisible] = useState(false)
  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  
  return (
    <Conteiner>
      <motion.div
        initial={{width: "40%"}}
        animate={{width: "100%"}}
        exit={{x: window.innerWidth, transition: {duration: 1}}}
      >
        <img src={logo} alt="logo da kenziehub"/>
       {/* INSERIR AQUI O LOGIN */}
      </motion.div>
    </Conteiner>
  );
}

export default Login;

