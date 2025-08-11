import { Link } from "react-router-dom"
import Team from "./include/Team"
import { Helmet } from "react-helmet"
import { useContext } from "react"
import { Store } from "../../Utils/Store"

function Home() {
    const { state } = useContext(Store)
    const { ContactInfo } = state
    return (
        <>
            <Helmet><title>Home</title></Helmet>



            <div id="home2" className="parallax-section">
                {/*     <div class="overlay"></div>*/}
                <div className="container">
                    <div className="slide-text">
                        <h3>
                            What we can do?{" "}
                            <Link
                                to="#"
                                className="typewrite"
                                data-period={2000}
                                data-type='[ "Divorce", "Defamation", "Injury", "Accident", "Animal Bite" ]'
                            >
                                <span className="wrap">Div</span>
                            </Link>{" "}
                        </h3>
                        <h1>Welcome to Lawyer Network</h1>
                        <p>
                            Access a trusted network of skilled lawyers ready to assist with your legal needs, from divorce to defamation. Whether you need advice or representation, our platform connects you with professionals who can guide you through every step. Find the right lawyer, right when you need them.
                        </p>

                        <Link to="/contact" className="btn btn-default section-btn">
                            Get Started
                        </Link>{" "}
                    </div>
                </div>
            </div>



            <div className="howitwrap" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="/assets/website/images/Profile-pic.jpg" alt="About Us" />
                        </div>
                        <div className="col-md-8">
                            <div className="stcontent">
                                <div className="section-title">
                                    <h3>
                                        Welcome to <span>Lawyer &amp; Attorney Network</span>
                                    </h3>
                                    <p>
                                        Our platform connects you with experienced lawyers who are dedicated to protecting your rights and ensuring justice. Whether you need legal advice or representation, our network is here to provide the support you need.
                                    </p>
                                </div>
                                <ul className="howlist">
                                    <li>
                                        <div className="howbox">
                                            <div className="iconcircle">
                                                <i className="fa fa-university" aria-hidden="true"></i>
                                            </div>
                                            <h4>Protect Your Rights</h4>
                                            <p>
                                                Find a lawyer who will stand up for your rights, providing expert guidance and representation tailored to your unique situation.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="howbox">
                                            <div className="iconcircle">
                                                <i className="fa fa-handshake-o" aria-hidden="true"></i>
                                            </div>
                                            <h4>Get the Right Legal Help</h4>
                                            <p>
                                                Whether you're dealing with a personal injury or a complex legal matter, our network connects you with professionals who specialize in your needs.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="howbox">
                                            <div className="iconcircle">
                                                <i className="fa fa-male" aria-hidden="true"></i>
                                            </div>
                                            <h4>We Fight for Justice</h4>
                                            <p>
                                                Our network is committed to justice, ensuring that every client receives fair and dedicated legal support from start to finish.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div id="practicearea" className="parallax-section">
                <div className="container">
                    {/* Section Title */}
                    <div className="section-title">
                        <h3>
                            Practice <span>Areas</span>
                        </h3>
                        <p>
                            Explore our wide range of legal services designed to protect your rights and provide comprehensive support for your unique situation. Our network of expert lawyers specializes in various fields to ensure you receive the best possible guidance.
                        </p>
                    </div>
                    <div className="row">
                        {/* Service 1 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/1.jpg" className="animate" alt="" />
                                </div>
                                <h4>Divorce Law</h4>
                                <p>
                                    Expert guidance and support through every step of your divorce process.
                                </p>
                            </div>
                        </div>
                        {/* Service 2 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/2.jpg" className="animate" alt="" />
                                </div>
                                <h4>Litigation</h4>
                                <p>
                                    Strong representation in all forms of civil and criminal litigation.
                                </p>
                            </div>
                        </div>
                        {/* Service 3 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/3.jpg" className="animate" alt="" />
                                </div>
                                <h4>Accident Law</h4>
                                <p>
                                    Helping you secure fair compensation after an accident or injury.
                                </p>
                            </div>
                        </div>
                        {/* Service 4 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/4.jpg" className="animate" alt="" />
                                </div>
                                <h4>Drug Law</h4>
                                <p>
                                    Skilled defense and advice on drug-related legal matters.
                                </p>
                            </div>
                        </div>
                        {/* Service 5 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/5.jpg" className="animate" alt="" />
                                </div>
                                <h4>Personal Law</h4>
                                <p>
                                    Professional legal assistance for your personal and family needs.
                                </p>
                            </div>
                        </div>
                        {/* Service 6 */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-img">
                                    <img src="/assets/website/images/lawyer/6.jpg" className="animate" alt="" />
                                </div>
                                <h4>Criminal Law</h4>
                                <p>
                                    Dedicated criminal defense to protect your rights and future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="servicesbox bg1">
                <div className="container">
                    <div className="section-title">
                        <h3>Personal Injury Lawyers</h3>
                    </div>
                    <div className="ctoggle">
                        <div className="panel-group" id="accordion">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                            Why Choose Our Network?
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapse1" className="panel-collapse collapse in">
                                    <div className="panel-body">
                                        Our network of personal injury lawyers is dedicated to helping you recover the compensation you deserve. With years of experience and a proven track record, our attorneys will fight tirelessly for your rights.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Required Section */}
            <div className="parallax-section" style={{ backgroundColor: '#f8f9fa', padding: '60px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center">
                            <div className="section-title">
                                <h3>Ready to Find Your Lawyer?</h3>
                                <p style={{ fontSize: '18px', marginBottom: '30px' }}>
                                    Access our network of experienced attorneys and legal professionals. 
                                    Browse profiles, read reviews, and connect with the right lawyer for your case.
                                </p>
                                <div style={{ marginTop: '30px' }}>
                                    <Link to="/login" className="btn btn-primary btn-lg" style={{ marginRight: '15px' }}>
                                        <i className="fa fa-sign-in" aria-hidden="true"></i> Login to View Attorneys
                                    </Link>
                                    <Link to="/registration" className="btn btn-outline-primary btn-lg">
                                        <i className="fa fa-user-plus" aria-hidden="true"></i> Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Team />



            <div className="taglinewrap">
                <div className="container">
                    <h2>Call Today for a Free Consultation</h2>
                    {/* Updated content for the description */}
                    <p>
                        Get in touch with us today for a free consultation and let our expert lawyers help you navigate your legal challenges.
                        We provide personalized attention and dedicated support to ensure your rights are protected.
                    </p>
                    {/* Link for contacting */}
                    <Link to="/contact">
                        <i className="fa fa-phone" aria-hidden="true" /> Contact Us Now
                    </Link>
                </div>
            </div>



        </>
    )
}

export default Home