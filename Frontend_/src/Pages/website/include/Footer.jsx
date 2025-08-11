import { useContext } from "react"
import { Store } from "../../../Utils/Store"
import { Link, useLocation } from "react-router-dom"


function Footer() {
    const { state } = useContext(Store)
    const { ContactInfo } = state
    const location = useLocation();

    return (
        <>
            <div className="site-footer">
                {/* Footer Top start */}
                <div className="footer-top-area">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="footer-lwf">
                                    <h3 className="footer-logo">
                                        <img src="/assets/website/images/logo.png" alt="Lawyer & Attorney Network" />
                                    </h3>
                                    {/* Updated content for the description */}
                                    <p>
                                        Welcome to our legal network. We connect you with a wide range of legal professionals who are ready to assist with your specific needs. Experience dedicated support and expert advice from our trusted network.
                                    </p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="footer-lwf footer-menu">
                                    <h3 className="footer-lwf-title">Quick Links</h3>
                                    <ul>
                                        <li className={location.pathname === '/' ? 'active' : ''}>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className={location.pathname === '/about' ? 'active' : ''}>
                                            <Link to="/about">About</Link>
                                        </li>
                                        <li className={location.pathname === '/services' ? 'active' : ''}>
                                            <Link to="/services">Services</Link>
                                        </li>
                                        <li className={location.pathname === '/contact' ? 'active' : ''}>
                                            <Link to="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="footer-lwf">
                                    <h3 className="footer-lwf-title">Contact Info</h3>
                                    <ul className="footer-contact">
                                        <li>
                                            <i className="fa fa-phone" /> {ContactInfo.contact_phone}
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope" /> {ContactInfo.contact_email}
                                        </li>
                                        <li>
                                            <i className="fa fa-fax" /> {ContactInfo.contact_phone}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="footer-lwf">
                                    <h3 className="footer-lwf-title">Opening Hours</h3>
                                    <ul className="open-hours">
                                        <li>
                                            <span>Monday to Friday:</span>{" "}
                                            <span className="text-right">08:30AM to 05:30PM</span>
                                        </li>
                                        <li>
                                            <span>Sunday:</span> <span className="text-right">Closed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                 
            </div>


        </>
    )
}

export default Footer