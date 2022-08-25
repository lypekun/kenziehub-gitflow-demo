import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Conteiner } from "../../styles/FormStyle";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import logo from "../../assets/img/Logo.png"

function Register() {
  const { registerIn } = useContext(AuthContext);

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatório")
      .min(8, "deve conter 8 digitos")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Deve conter 8 caracteres, um maiúsculo, um minúsculo, um número e um caractere especial"
      ),
    confirmpassword: yup
      .string()
      .required("Confirme sua senha!")
      .oneOf([yup.ref("password")], "Senhas não correspondem"),
    name: yup.string().required("Nome obrigatório"),
    bio: yup
      .string()
      .required("Biografia obrigatório")
      .min(8, "deve conter 8 digitos"),
    contact: yup.string().required("Contato obrigatório"),
    course_module: yup.string().required("Modulo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <Conteiner>
      <motion.div
        initial={{ width: "40%" }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 1 } }}
      >
        <img src={logo} alt="logo da kenziehub" />
        <div className="conteiner-login">
          <h3 className="h3-register">Crie sua conta</h3>
          <span className="span-register">Rapido e grátis, vamos nessa</span>
          <form onSubmit={handleSubmit(registerIn)}>
            <>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                id="email"
              />
              <span><>{errors.email?.message}</></span>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Senha"
                id="password"
              />
              <span><>{errors.password?.message}</></span>
              <label htmlFor="confirmpassword">Confirme a senha</label>
              <input
                type="password"
                {...register("confirmpassword")}
                placeholder="Senha"
                id="confirmpassword"
              />
              <span><>{errors.confirmpassword?.message}</></span>
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Nome completo"
                id="name"
              />
              <span><>{errors.name?.message}</></span>
              <label htmlFor="bio">Biografia</label>
              <input
                type="text"
                {...register("bio")}
                placeholder="Biografia"
                id="bio"
              />
              <span><>{errors.bio?.message}</></span>
              <label htmlFor="Contato">Contato</label>
              <input
                type="text"
                {...register("contact")}
                placeholder="Contato"
                id="Contato"
              />
              <span><>{errors.contact?.message}</></span>
              <label htmlFor="course_module">Modulo atual</label>
              <select {...register("course_module")} id="course_module">
                <option value="Primeiro módulo (Introdução ao Frontend)">
                  Primeiro módulo
                </option>
                <option value="Segundo módulo (Frontend Avançado)">
                  Segundo módulo
                </option>
                <option value="Terceiro módulo (Introdução ao Backend)">
                  Terceiro módulo
                </option>
                <option value="Quarto módulo (Backend Avançado)">
                  Quarto módulo
                </option>
              </select>
              {errors.course_module?.message}
              <button type="submit">Cadastrar</button>
            </>
          </form>
          <div>
            <span>Já possui uma conta?</span>
            <Link to={"/login"} className="register">
              Logar-se
            </Link>
          </div>
        </div>
      </motion.div>
    </Conteiner>
  );
}

export default Register;