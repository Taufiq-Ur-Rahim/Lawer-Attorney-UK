import React, { useState } from "react";
import { toast } from "react-toastify";
 import { Link, useNavigate } from "react-router-dom";
 import api from "../../Utils/Axios";
import { Helmet } from 'react-helmet'
import PageTitle from './include/PageTitle'

// Component for user registration
function Registration({title}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cell, setCell] = useState("");
  const [address, setAddress] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [education, setEducation] = useState("");
  const [expertise, setExpertise] = useState("");
  const [registerAsLawyer, setRegisterAsLawyer] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actualData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        cell,
        address,
        education,
        practiceArea,
        expertise,
        isLawyer: registerAsLawyer,
      };

      const endpoint = registerAsLawyer ? "/lawyer/register" : "/user/register";

      const response = await api.post(endpoint, actualData);

      if(response.data.success){
        toast.success(response.data.message);

         if (registerAsLawyer){
           navigate("/Login");
        } else{
           navigate("/login");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch(error){
      console.error("An error occurred during registration:", error);

      if (error.response && error.response.status === 400) {
         toast.error(error.response.data.message);
      } else if(error.response && error.response.status === 422){
         const responseData = error.response.data;
        if (responseData.errors){
          responseData.errors.forEach((validationError) => {
            toast.error(validationError.msg);
          });
        } else{
          toast.error("Bad request");
        }
      } else {
         toast.error("An error occurred during registration.");
      }
    }
  };

  return(
    <>
    <Helmet><title>{title}</title></Helmet>

         <PageTitle title={title} />

       
        <title>Sign Up</title>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                      <h3 className="card-title text-center mb-4">Sign Up</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                   
                  <div className="p-2">
                

                    <form
                      className="login"
                      id="registration_form"
                      onSubmit={handleSubmit}
                    >
                      {/* User Information Fields */}
                      <div id="div_id_first_name" className="mb-3">
                        <label
                          htmlFor="id_first_name"
                          className="form-label requiredField"
                        >
                          First Name<span className="asteriskField">*</span>
                        </label>
                        <input
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          autoComplete="text"
                          maxLength={320}
                          className="textinput form-control"
                          required
                          id="id_first_name"
                        />
                      </div>

                      <div id="div_id_last_name" className="mb-3">
                        <label
                          htmlFor="id_last_name"
                          className="form-label requiredField"
                        >
                          Last Name<span className="asteriskField">*</span>
                        </label>
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          autoComplete="text"
                          maxLength={320}
                          className="textinput form-control"
                          required
                          id="id_last_name"
                        />
                      </div>

                      <div id="div_id_email" className="mb-3">
                        <label
                          htmlFor="id_email"
                          className="form-label requiredField"
                        >
                          Email<span className="asteriskField">*</span>
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          placeholder="Email address"
                          autoComplete="email"
                          maxLength={320}
                          className="textinput form-control"
                          required
                          id="id_email"
                        />
                      </div>

                      <div id="div_id_password" className="mb-3">
                        <label
                          htmlFor="id_password"
                          className="form-label requiredField"
                        >
                          Password<span className="asteriskField">*</span>
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          className="passwordinput form-control"
                          required
                          id="id_password"
                        />
                      </div>

                      <div id="div_id_confirm_password" className="mb-3">
                        <label
                          htmlFor="id_confirm_password"
                          className="form-label requiredField"
                        >
                          Confirm Password
                          <span className="asteriskField">*</span>
                        </label>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          autoComplete="new-password"
                          className="passwordinput form-control"
                          required
                          id="id_confirm_password"
                        />
                      </div>

                      {registerAsLawyer && (
                        <>
                          <div id="div_id_cell" className="mb-3">
                            <label
                              htmlFor="id_cell"
                              className="form-label requiredField"
                            >
                              Cell<span className="asteriskField">*</span>
                            </label>
                            <input
                              onChange={(e) => setCell(e.target.value)}
                              type="text"
                              name="cell"
                              placeholder="Cell"
                              autoComplete="number"
                              maxLength={320}
                              className="numberinput form-control"
                              required
                              id="id_cell"
                            />
                          </div>

                          <div id="div_id_address" className="mb-3">
                            <label
                              htmlFor="id_address"
                              className="form-label requiredField"
                            >
                              Address<span className="asteriskField">*</span>
                            </label>
                            <input
                              onChange={(e) => setAddress(e.target.value)}
                              type="text"
                              name="address"
                              placeholder="Address"
                              autoComplete="text"
                              maxLength={320}
                              className="textinput form-control"
                              required
                              id="id_address"
                            />
                          </div>

                          <div id="div_id_Education" className="mb-3">
                            <label
                              htmlFor="id_Education"
                              className="form-label requiredField"
                            >
                              Education<span className="asteriskField">*</span>
                            </label>
                            <input
                              onChange={(e) => setEducation(e.target.value)}
                              type="text"
                              name="Education"
                              placeholder="Education"
                              autoComplete="text"
                              maxLength={320}
                              className="textinput form-control"
                              required
                              id="id_Education"
                            />
                          </div>

                          <div id="div_id_Education" className="mb-3">
                            <label
                              htmlFor="id_Education"
                              className="form-label requiredField"
                            >
                              Expertise<span className="asteriskField">*</span>
                            </label>
                            <input
                              onChange={(e) => setExpertise(e.target.value)}
                              type="text"
                              name="Education"
                              placeholder="Expertise"
                              autoComplete="text"
                              maxLength={320}
                              className="textinput form-control"
                              required
                              id="id_Education"
                            />
                          </div>

                          <div id="div_id_practice_area" className="mb-3">
                            <label
                              htmlFor="id_practice_area"
                              className="form-label requiredField"
                            >
                              Practice Area
                              <span className="asteriskField">*</span>
                            </label>
                            <select
                              onChange={(e) => setPracticeArea(e.target.value)}
                              name="practice_area"
                              className="textinput form-control"
                              // Apply the same classes as the input field
                              required
                              id="id_practice_area"
                            >
                              <option value="" disabled selected>
                                Select Practice Area
                              </option>
                              <option value="Child Abuse">Child Abuse</option>
                              <option value="Divorce">Divorce</option>
                              <option value="Finance law">Finance Law</option>
                              <option value="tax issues">Tax Issues</option>
                              <option value="Drugs">Drus</option>
                              <option value="Smugling">Smugling</option>
                              <option value="Curruption">Curruption</option>
                              <option value="Bribery">Bribery</option>
                              <option value="Other">Other</option>

                              {/* Add more options as needed */}
                            </select>
                          </div>
                        </>
                      )}

                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          name="registerAsLawyer"
                          className="checkboxinput form-check-input"
                          id="id_register_as_lawyer"
                          checked={registerAsLawyer}
                          onChange={() =>
                            setRegisterAsLawyer(!registerAsLawyer)
                          }
                        />
                        <label
                          htmlFor="id_register_as_lawyer"
                          className="form-check-label"
                        >
                          Register as a Lawyer
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-success btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                    <div style={{ marginBottom: "30px",marginTop: "40px"}}>
                      <h5 style={{textAlign:"center"}}>
                        OR
                      </h5>
                    </div>
                    <div className="mt-4 text-center">
                      <p style={{ display: "inline-block" }}>
                        Already have an account?{" "}
                      </p>
                      <Link to="/login" style={{ display: "inline-block",paddingLeft:"4px" }}>
                        Sign in >
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
