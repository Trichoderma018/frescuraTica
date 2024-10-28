import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import '../../src/components/styles/Footer.css'
import CopyrightIcon from '@mui/icons-material/Copyright';

const quickLinks = [
  {
    path: '/about',
    display: 'About'
  },

  {
    path: '#',
    display: 'Politicas de Privacidad'
  },
  {
    path: '/blogs',
    display: 'Blog'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]

const Footer = () => {

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='5' md='4' sm='12'>
            <div className='logo'>
              <h1 ><Link to='/home' className="d-flez aling-items-center
              gap-2">
                
                <span>Rent Car<br/> <h5>Service</h5> </span>
              </Link></h1>
            </div>

            <p className="footer_logo-content">
              Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit.
              Qui provident, cum vel quia accusamus 
              aperiam consequuntur
              natus voluptas vitae placeat sint hic 
              suscipit voluptatem
              nesciunt ex eum animi officia asperiores.
            </p>
          </Col>

          <Col lg='2' md='4' sm='6'>
            <div className="mb-4">
              <h5 className="footer_link-title">Quick links</h5>
              <ListGroup>
                {
                  quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className='p-0 mt-3 quick_link' >
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </div>
          </Col>

          <Col lg='2' md='4' sm='6'>
            <div className="mb-4">
              <h5 className="footer_link-title mb-4">Oficinas</h5>
              <p className='office_info'>Cartago, Costa Rica</p>
              <p className='office_info'>Alajuela, Costa Rica</p>
              <p className='office_info'>San Jose, Costa Rica</p>
            </div>
          </Col>
        

          <Col lg='3' md='4' sm='6'>
            <div className="mb-4">
              <h5 className="footer_link-title mb-4">Head Office</h5>
              <p className='office_info'>89 Cartago, Cartago, Costa Rica</p>
              <p className='office_info'>Celular: +506 8670-8117</p>
              <p className='office_info'>Email: rentaCar@gmail.com</p>
              <p className='office_info'>Abiertos 24h</p>
            </div>
          </Col>

          <Col lg='12'>
            <div className="footer_bottom">
              <p className="section_description d-flex aling-items-center justify-content-center gap-1 pt-4">
                <CopyrightIcon></CopyrightIcon>Copyrigth 2024, Developed by Grupo 4. Proyecto Uam
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </footer >

  )
}

export default Footer