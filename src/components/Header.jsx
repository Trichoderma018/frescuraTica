import React, { useState } from 'react';
import { FormGroup, Input, Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../../src/components/styles/Header.css";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },

  {
    path: '/about',
    display: 'Acerca'
  },

  {
    path: '/Orders',
    display: 'Pedidos'
  },

  {
    path: '/Payment',
    display: 'Pagos'
  },

  {
    path: '/Inventory',
    display: 'Inventario'
  },

]

const Header = () => {
  const [localName, setLocalName] = useState('');
  
  // Función para manejar el cambio en el select
  const handleLocalNameChange = (e) => {
    setLocalName(e.target.value);
  };

  return <header className="header">
    <div className="header_top">
      {/* ===== Heder Top Section ===== */}
      <Container>
        <Row>
          <Col lg='2' md='3' sm='4' >
            <div className='logo'>
              <h1 ><Link to='/home' className="d-flez aling-items-center
              gap-2">
                <span>Rent Car<br /> <h5 className='Sub_title_logo'>Service</h5> </span>
              </Link></h1>
            </div>
          </Col>

          <Col lg='3' md='3' sm='2'>
            <div className="header_top_left">
              <span>Need help?</span>
              <span className="header_top_help">
                +506 8570-8117
              </span>
            </div>
          </Col>

          <Col lg='6' md='6' sm='6'>
            <div className="header_top_righ d-flex align-items-center justify-content-end gap-3">
              <Link to="/singin" className="d-flex aling-items-center gap-1"> <AccountCircleIcon />login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    {/* ===== Heder Middle Section ===== */}
    <div className="header_middle">
      <Container>
        <Row>
          <Col lg='6' md='2' sm='2'>
            <FormGroup>
              <Input
                type="select"
                name="lugar"
                id="lugarSelect"
                value={localName}
                onChange={handleLocalNameChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="San Jose Rentacar">San Jose Rentacar</option>
                <option value="Alajuela Rentacar">Alajuela Rentacar</option>
                <option value="Cartago Rentacar">Cartago Rentacar</option>
              </Input>
            </FormGroup>
          </Col>

          <Col lg='6' md='3' sm='0' className="text-end">
            <button className='header_btn btn'>
              <Link to={`/cars?localName=${encodeURIComponent(localName)}`}>
                Search
              </Link>
            </button>
          </Col>
        </Row>
      </Container>
    </div>

    {/* ===== main navigation ===== */}
    <div className="main_navbar">
      <Container>
        <div className='navigation_wrapper d-flex align-items-center justify-content-between'>
          <span className="mobile_menu">
            =
          </span>
          <div className="navigation">
            <div className="menu">
              {
                navLinks.map((item, index) => (
                  <NavLink to={item.path} className={navClass => navClass.isActive ? "nav_active nav_item" : "nav_item"}
                    key={index}> {item.display} </NavLink>
                ))
              }
            </div>
          </div>

          <div className="nav_right">
            <div className="search_box">
              <input type="tex" placeholder="Search Car" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  </header>
};

export default Header;