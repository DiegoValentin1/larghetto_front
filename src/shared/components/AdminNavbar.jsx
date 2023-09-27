import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";

export const AdminNavbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigation = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigation("/auth", { replace: true });
    localStorage.removeItem("user");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to={"/products"}>
              PRODUCTOS
            </Link>
            <Link className="nav-link" to={"/category"}>
              CATEGORIAS
            </Link>
            <Link className="nav-link" to={"/subcategory"}>
              SUBCATEGORIAS
            </Link>
            <Button onClick={handleLogout} variant="outline-success">
              CERRAR SESION
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
