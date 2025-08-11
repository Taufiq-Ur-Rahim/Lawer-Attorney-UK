import React from "react";
import { useLocation } from "react-router-dom";
import { server_ip } from "../../Utils/Data";

function AttorneyDetails() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const data = query.get("data");
  const object = data ? JSON.parse(decodeURIComponent(data)) : null;
  console.log(object);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mx-n4 mt-n4 bg-info-subtle">
                <div className="card-body">
                  <div className="text-center mb-4">
                    {object.image ? (
                      <img
                        src={`${server_ip}/${object.image}`}
                        className="lawimg"
                        alt=""
                      />
                    ) : (
                      <img
                        src={`/assets/website/images/avatar-1.jpg`}
                        className="lawimg"
                        alt=""
                      />
                    )}
                    <h5 className="mt-3 mb-1">
                      {object.firstName} {object.lastName}
                    </h5>
                    <p className="text-muted mb-3">{object.expertise}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <ul className="list-unstyled hstack gap-3 mb-0 flex-grow-1">
                      <li>
                        <i className="bx bx-map align-middle" />{" "}
                        {object.address}
                      </li>
                      <li>
                        <i className="bx bx-box align-middle" /> {object.email}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <ul className="list-unstyled vstack gap-3 mb-0">
                    <li>
                      <div className="d-flex">
                        <i className="bx bx-calendar font-size-18 text-primary" />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Experience:</h6>
                          <span className="text-muted">{object.expertise}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <i className="bx bx-money font-size-18 text-primary" />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Current Salary:</h6>
                          <span className="text-muted">$ 3451</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex">
                        <i className="bx bx-user font-size-18 text-primary" />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Gender:</h6>
                          Male
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex">
                        <i className="mdi mdi-book-education font-size-18 text-primary" />
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Qualification:</h6>
                          <span className="text-muted">{object.education}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3">About Us</h5>
                  <p className="text-muted">
                    Very well thought out and articulate communication. Clear
                    milestones, deadlines and fast work. Patience. Infinite
                    patience. No shortcuts. Even if the client is being
                    careless. Some quick example text to build on the card title
                    and bulk the card's content Moltin gives you platform.
                  </p>
                  <p className="text-muted mb-4">
                    As a highly skilled and successfull product development and
                    design specialist with more than 4 Years of My experience
                    lies in successfully conceptualizing, designing, and
                    modifying consumer products specific to interior design and
                    home furnishings.
                  </p>
                  <h5 className="mb-3">Education</h5>
                  <ul className="verti-timeline list-unstyled">
                    <li className="event-list">
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle" />
                      </div>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <div>
                            <h6 className="font-size-14 mb-1">
                              {object.education}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="mb-3">Practise Area</h5>
                </div>
                <div className="col-xl-4">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="font-size-14 mb-1">
                        {object.practiceArea}
                      </h6>
                    </div>
                  </div>
                </div>

                {/*end col*/}
              </div>
              {/*end row*/}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body border-bottom">
                      <h5 className="mb-3">Social Media</h5>
                      <div className="hstack gap-2">
                        <a href="#!" className="btn btn-soft-primary">
                          <i className="bx bxl-facebook align-middle me-1" />{" "}
                          Facebook{" "}
                        </a>
                        <a href="#!" className="btn btn-soft-info">
                          <i className="bx bxl-twitter align-middle me-1" />{" "}
                          Twitter
                        </a>
                        <a href="#!" className="btn btn-soft-pink">
                          <i className="bx bxl-instagram align-middle me-1" />{" "}
                          Instagram
                        </a>
                        <a href="#!" className="btn btn-soft-success">
                          <i className="bx bxl-whatsapp align-middle me-1" />{" "}
                          Whatsapp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>{" "}
        {/* container-fluid */}
      </div>

      <style jsx>{`
        .lawimg {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}

export default AttorneyDetails;
