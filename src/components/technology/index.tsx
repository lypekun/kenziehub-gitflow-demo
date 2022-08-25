import { useEffect, useState, useContext } from "react";
import { BsPlusSquareFill, BsBackspaceFill } from "react-icons/bs";
import { useNavigate, Outlet } from "react-router-dom";
import { TechnologyWrapper } from "./style";
import { motion } from "framer-motion";
import { AuthContext } from "../../contexts/authContext";

function Technology() {
  const { user, setIdTech, deletTech, loading} = useContext(AuthContext);
  const [ delet, setDelet] = useState(false);
  
  useEffect(() => {
    delet && deletTech()
    
    return(
      setDelet(false)
    )
  }, [delet])

  const navigate = useNavigate();
  return (
    <>
      <Outlet />
      <TechnologyWrapper>
        <div className="header-tech animate__backInLeft">
          <h2>Tecnologia</h2>
          <BsPlusSquareFill
            className="button-add animate__backInRight"
            onClick={() => {
              navigate("tech/new");
            }}
          />
        </div>
        <div className="conteiner-tech animate__backInUp">
          {!loading ? (
            user ? (
              <ul>
                {user.techs.map((elem) => {
                  return (
                    <motion.li
                      key={elem.id}
                      className="animate__fadeInDown animate__delay-5s"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      exit={{
                        x: window.innerWidth,
                        transition: { duration: 1 },
                      }}
                    >
                      <button
                        onClick={() => {
                          setIdTech(elem.id);
                          navigate("tech/edit");
                        }}
                      >
                        <h3>{elem.title}</h3>
                        <span>{elem.status}</span>
                      </button>
                      <BsBackspaceFill
                        className="remove-tech"
                        onClick={() => {
                          setIdTech(elem.id) 
                          setDelet(true)
                        }}
                        
                      />
                    </motion.li>
                  );
                })}
              </ul>
            ) : (
              <div>
                <h2>Você ainda não tem technologia</h2>
                <span>Adicione suas technologias</span>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </TechnologyWrapper>
    </>
  );
}

export default Technology;
