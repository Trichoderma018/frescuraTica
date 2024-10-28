import React, { Fragment } from 'react'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import Routes from '../../Routes/routers.jsx'

const Layout = () =>  {
    return <Fragment>
        <Header />
        <div>
            <Routes />
        </div>
        <Footer />

    </Fragment>
}

export default Layout