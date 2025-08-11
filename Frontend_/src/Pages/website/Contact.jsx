import { Helmet } from "react-helmet"
import PageTitle from "./include/PageTitle"
import { useContext } from "react"
import { Store } from "../../Utils/Store"

function Contact({ title }) {
    const { state } = useContext(Store)
    const { ContactInfo } = state
    return (
        <>
            <Helmet><title>{title}</title></Helmet>



            <PageTitle title={title} />



            <div id="contact" className="parallax-section">
                <div className="container">
                    {/* SECTION TITLE */}
                    <div className="section-title">
                        <h3>Get Free Quote</h3>
                        <p>
                            Looking for a personalized estimate? Our team is here to provide you with a free quote tailored to your needs. Contact us today, and let us help you find the best solution.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="contact-now">
                                <div className="contact">
                                    <span>
                                        <i className="fa fa-home" />
                                    </span>
                                    <div className="information">
                                        <strong>Address:</strong>
                                        <p>{ContactInfo.address}</p>
                                    </div>
                                </div>
                                {/* Contact Info */}
                                <div className="contact">
                                    <span>
                                        <i className="fa fa-envelope" />
                                    </span>
                                    <div className="information">
                                        <strong>Email Address:</strong>
                                        <p>{ContactInfo.contact_email}</p>
                                    </div>
                                </div>
                                {/* Contact Info */}
                                <div className="contact">
                                    <span>
                                        <i className="fa fa-phone" />
                                    </span>
                                    <div className="information">
                                        <strong>Phone No:</strong>
                                        <p>{ContactInfo.contact_phone}</p>
                                    </div>
                                </div>
                                {/* Contact Info */}
                            </div>
                        </div>
                        <div className="col-md-8">
                            {/* CONTACT FORM HERE */}
                            <div className="contact-form">
                                <form id="contact-form" className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            placeholder="Phone"
                                        />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <textarea
                                            className="form-control"
                                            rows={5}
                                            name="message"
                                            placeholder="Message"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <button
                                            id="submit"
                                            type="submit"
                                            className="form-control"
                                            name="submit"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Contact