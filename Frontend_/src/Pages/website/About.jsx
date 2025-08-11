import React from 'react'
import Team from './include/Team'
import PageTitle from './include/PageTitle'
import { Helmet } from 'react-helmet'

function About({ title }) {
    return (
        <>
            <Helmet><title>{title}</title></Helmet>


             <PageTitle title={title} />



            <div className="innerpgWraper">
                <div className="container">
                    <div className="about-desc">
                        <div className="row">
                            <div className="col-md-7">
                                <h3>Discover Our Legal Network</h3>
                                <p>
                                    Welcome to our network, where we connect you with a broad range of experienced legal professionals. Our platform offers tailored solutions to meet your unique legal needs, ensuring you receive expert advice and dedicated support. Whether you're seeking assistance with personal matters or complex legal issues, our network is here to help. Explore the benefits of joining our network and find the right legal expert for you. <br />
                                    <br />
                                    With a commitment to excellence, we strive to provide a seamless experience from start to finish. Our team is dedicated to ensuring that you have access to top-tier legal services, backed by our extensive network of professionals. Discover how we can support your legal journey and help you achieve the best possible outcomes.
                                </p>
                            </div>
                            <div className="col-md-5">
                                <div className="postimg">
                                    <img src="/assets/website/images/about-img.jpg" alt="Legal Network Overview" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Team />



        </>
    )
}

export default About