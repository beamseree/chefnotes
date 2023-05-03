import logo from "../img/chefnotes-logo.svg";
import logoSmall from "../img/logo_icon.svg"
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    };

    return (
        <div className="nav">
            <img src={logo} alt="Chefnotes Logo" className="logo" onClick={home}/>
            <img src={logoSmall} alt="Chefnotes Logo" className="logo-small" onClick={home}/>
            <Button className="large" variant="contained" size="large" onClick={home}>
                New Recipe
            </Button>
        </div>
    );
};

export default Nav;
