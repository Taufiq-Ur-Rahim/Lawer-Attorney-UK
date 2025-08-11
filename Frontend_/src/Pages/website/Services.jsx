import React from 'react'
import PageTitle from './include/PageTitle'
import { Helmet } from 'react-helmet'

function Services({ title }) {
    return (
        <>
            <Helmet><title>{title}</title></Helmet>



            <PageTitle title={title} />



            <div id="service" className="parallax-section">
                <div className="container">
                    <div className="row">
                        {/* Service 1 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-car" aria-hidden="true" />
                                </div>
                                <h4>Car Accident</h4>
                                <p>
                                    Expert legal assistance for car accident claims, ensuring you receive the compensation you deserve.
                                </p>
                            </div>
                        </div>
                        {/* Service 2 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-fire" aria-hidden="true" />
                                </div>
                                <h4>Security Law</h4>
                                <p>
                                    Specialized legal services in security and surveillance law to protect your rights and interests.
                                </p>
                            </div>
                        </div>
                        {/* Service 3 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-code" aria-hidden="true" />
                                </div>
                                <h4>Personal Injury</h4>
                                <p>
                                    Comprehensive support for personal injury cases, helping you navigate legal challenges and seek justice.
                                </p>
                            </div>
                        </div>
                        {/* Service 4 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-male" aria-hidden="true" />
                                </div>
                                <h4>Criminal Defence</h4>
                                <p>
                                    Defending your rights with expert criminal defence services to ensure fair treatment in legal proceedings.
                                </p>
                            </div>
                        </div>
                        {/* Service 5 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-cloud" aria-hidden="true" />
                                </div>
                                <h4>Brain Injury</h4>
                                <p>
                                    Legal guidance for brain injury cases, focusing on securing compensation for long-term impacts.
                                </p>
                            </div>
                        </div>
                        {/* Service 6 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-motorcycle" aria-hidden="true" />
                                </div>
                                <h4>Motorcycle Accident</h4>
                                <p>
                                    Legal support for motorcycle accident claims, ensuring you receive appropriate compensation for damages.
                                </p>
                            </div>
                        </div>
                        {/* New Service 7 */}
                        <div className="col-md-3 col-sm-6">
                            <div className="service-thumb">
                                <div className="thumb-icon">
                                    <i className="fa fa-gavel" aria-hidden="true" />
                                </div>
                                <h4>Estate Planning</h4>
                                <p>
                                    Professional legal assistance with estate planning to help you manage and distribute your assets effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Services