import { useContext } from "react";
import { LoginScreen } from "../../modules/auth/LoginScreen";
import { AuthContext } from "../../modules/auth/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PublicNavbar } from "./PublicNavbar";
import { Loader } from "./Loader";
import AppLayout from "./AppLayout";
import Users from "../../modules/super/Alumnos";
import SuperMaterialesBrida from "../../modules/super/Instrumentos";
import SuperMaterialesTee from "../../modules/super/Maestros";
import Promociones from "../../modules/super/Promociones";
import Encargados from "../../modules/super/Encargados";
import Recepcionistas from "../../modules/super/Recepcionistas";
import SuperDashboard from "../../modules/super/Components/SuperDashboard";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  // const user = {data:{role:"SUPER"}, isLogged:true};
  // console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              user.data.role === 'ENCARGADO' ? (
                <>
                  <Routes>
                    <Route path="/" element={<AppLayout option={1} />}>
                    <Route index element={<Users/>} />
                    <Route path="instrumentos" element={<SuperMaterialesBrida/>} />
                    <Route path="maestros" element={<SuperMaterialesTee/>} />
                    {/* <Route path="promociones" element={<Promociones/>} /> */}
                    <Route path="recepcionistas" element={<Recepcionistas/>} />
                    </Route>
                  </Routes>
                </>
              ) : (
                user.data.role === 'SUPER' ? (
                  <>
                    <Routes>
                      <Route path="/" element={<AppLayout option={2} />}>
                        {/* <Route index element={<SuperDashBoard/>} /> */}
                        <Route index element={<SuperDashboard/>} />
                        <Route path="alumnos" element={<Users />} />
                        <Route path="instrumentos" element={<SuperMaterialesBrida />} />
                        <Route path="maestros" element={<SuperMaterialesTee />} />
                        <Route path="promociones" element={<Promociones />} />
                        <Route path="encargados" element={<Encargados />} />
                        <Route path="recepcionistas" element={<Recepcionistas />} />
                        <Route index element={<Loader />} />
                        <Route path="*" element={<>SUPER</>} />
                      </Route>
                    </Routes>
                  </>
                ) : (
                  user.data.role === 'RECEPCION' && (
                    <>
                      <Routes>
                        <Route path="/" element={<AppLayout option={3} />}>
                        <Route index element={<Users/>} />
                        <Route path="maestros" element={<SuperMaterialesTee />} />
                        </Route>
                      </Routes>

                    </>
                  )
                )
              )
            ) : (
              <>
                  <Routes>
                    <Route path="auth" element={<LoginScreen/>} />
                    <Route path="contact" element={<>Contact</>} />
                    <Route index element={<LoginScreen/>} />
                    <Route path="*" element={<>404</>} />
                  </Routes>
              </>
            )
          }
        />
        <Route path="*" element={<>404</>} />
      </Routes>
    </Router>
  );
};
