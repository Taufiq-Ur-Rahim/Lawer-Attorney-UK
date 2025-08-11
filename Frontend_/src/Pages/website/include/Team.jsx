import React from "react";

function Team() {
  return (
    <>
      <div id="team" className="parallax-section">
        <div className="container">
          {/* Section Title */}
          <div className="section-title">
            <h3>
              Meet Our <span>Network</span>
            </h3>
            <p>
              Meet the dedicated professionals who make up our extensive legal
              network. They work together to ensure you have access to top-notch
              legal expertise.
            </p>
          </div>
          <div className="row">
            {/* Team Member 1 */}
            <div className="col-md-3 col-sm-6">
              <div className="team-thumb">
                <div className="thumb-image">
                  <img
                    src="/assets/website/images/Profile-pic.jpg"
                    className="animate"
                    alt="Team Member 1"
                  />
                </div>
                <h4>TAUFIQ UR RAHIM</h4>
                <h5>CEO</h5>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="col-md-3 col-sm-6">
              <div className="team-thumb">
                <div className="thumb-image">
                  <img
                    src="/assets/website/images/team/law2.webp"
                    className="animate"
                    alt="Team Member 2"
                  />
                </div>
                <h4>LARA HIGGINS</h4>
                <h5> Network Coordinator</h5>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="col-md-3 col-sm-6">
              <div className="team-thumb">
                <div className="thumb-image">
                  <img
                    src="/assets/website/images/team/law4.jpg"
                    className="animate"
                    alt="Team Member 3"
                  />
                </div>
                <h4>JANE DOE</h4>
                <h5>Legal Advisor </h5>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="col-md-3 col-sm-6">
              <div className="team-thumb">
                <div className="thumb-image">
                  <img
                    src="/assets/website/images/team/law2.webp"
                    className="animate"
                    alt="Team Member 4"
                  />
                </div>
                <h4>MARTIN DOE</h4>
                <h5>Network Support</h5>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
        .team-thumb .thumb-image img {
            width: 100%;
            height: auto;
            max-width: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 2;  
        }
    `}</style>
      </div>
    </>
  );
}

export default Team;
