import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "./include/PageTitle";
import StripeCheckout from "react-stripe-checkout";
import api from "../../Utils/Axios";
import { toast } from "react-toastify";
import { server_ip } from "../../Utils/Data";
import { Store } from "../../Utils/Store";

function AttorneyDetails({ title }) {
  const { state } = useContext(Store);
  const { UserInfo } = state;
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const data = query.get("data");
  const object = data ? JSON.parse(decodeURIComponent(data)) : null;

  const [amount, setAmount] = useState(0);
  const [hasHired, setHasHired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const userFromStorage = localStorage.getItem("UserInfo");
      if (!userFromStorage) {
        toast.error("Please login to view attorney details");
        navigate('/login');
        return false;
      }
      return true;
    };

    if (!checkAuth()) return;
    
    const checkHireStatus = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const { data } = await api.get(`/lawyer/${object._id}/isHired`, {
          params: { userId: userInfo._id },
        });
        setHasHired(data.isHired);
        setLoading(false);
      } catch (error) {
        console.error("Error checking hire status", error);
        setLoading(false);
      }
    };

    if (object) {
      checkHireStatus();
    }
  }, [object, navigate]);

  const handleToken = async (token) => {
    if (processingPayment) return;
    if (hasHired) {
      toast.info('Already hired this lawyer');
      return;
    }
    setProcessingPayment(true);
    try {
      if (amount <= 0) {
        toast.error("Please enter a valid amount greater than 0");
        setProcessingPayment(false);
        return;
      }
      const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
      const result = await api.post("/payments/checkout", {
        token,
        amount: amount * 100,
        lawyerId: object._id,
        userId: userInfo._id,
      });

      await api.patch(`/lawyer/${object._id}/hire`, { isHired: true });
      console.log(result);
      toast.success("Payment Completed Successfully");
      setHasHired(true);
      setProcessingPayment(false);
    } catch (error) {
      console.error("Payment Error:", error.response || error.message);
      toast.error(error.response?.data?.error || "Payment failed");
      setProcessingPayment(false);
    }
  };

const handleStartChat = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    if (!userInfo || !userInfo._id) {
      toast.error("Please login to start a chat");
      navigate('/login');
      return;
    }

    console.log("🔵 Starting chat with lawyer:", object._id);
    console.log("🔵 User ID:", userInfo._id);
    
    const res = await api.post("/chat", {
      userId: userInfo._id,
      lawyerId: object._id,
    });
    console.log("POST /chat status:", res.status);
    console.log("POST /chat response:", res.data);

    const data = res.data;
    if (data && data._id) {
      console.log("✅ Chat created/found, navigating to:", `/chat/${data._id}`);
      // Navigate to the dedicated chat page
      navigate(`/chat/${data._id}`);
    } else {
      console.error("❌ Invalid response data:", data);
      toast.error("Failed to initiate chat — response invalid.");
    }
  } catch (err) {
    console.error("❌ Chat initiation error:", err);
    console.error("❌ Error response:", err.response?.data);
    console.error("❌ Error status:", err.response?.status);
    toast.error(`Could not start chat: ${err.response?.data?.message || err.message}`);
  }
};

  // Don't render if not authenticated
  if (!localStorage.getItem("UserInfo")) {
    return <div>Redirecting to login...</div>;
  }

  if (!object) {
    return <div>Attorney not found</div>;
  }

  return (
    <>
      <PageTitle title={title} />

      <div className="parallax-section">
        <div className="container">
          <div className="attorneytop">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <img
                  src={`${server_ip}/${object.image}`}
                  className="lawimg"
                  alt=""
                />
              </div>

              <div className="col-md-8 col-sm-8">
                <h2>
                  {object.firstName} {object.lastName}
                </h2>

                <ul className="address">
                  <li>
                    <i className="fa fa-phone" />
                    {object.cell}
                  </li>
                  <li>
                    <i className="fa fa-box" />
                    {object.email}
                  </li>
                  <li>
                    <i className="fa fa-home" />
                    {object.address}
                  </li>
                  <li>
                    <i className="fa fa-comment" />
                    <button
                      onClick={handleStartChat}
                      className="btn btn-sm btn-primary"
                      style={{ marginTop: "5px" }}
                    >
                      Chat with {object.firstName}
                    </button>
                  </li>
                </ul>

                <div className="attorneydetail">
                  <h1>Personal Statement</h1>
                </div>

                <div className="payment-section">
                  <label htmlFor="amount">Enter Payment Amount (£):</label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in pounds"
                    min="1"
                    className="form-control"
                    style={{ width: "200px", marginBottom: "20px" }}
                  />

                  <StripeCheckout
                    stripeKey="pk_test_51OGbliKue2i3LW4Npe6oAwbcfHyFSSUdcRPKRejkqG5z1WggCgT2MnaW3ayQaPV6gnVugP7w3C5crbJyug9weV1e00CESUwd87"
                    token={handleToken}
                    amount={amount * 100}
                    name={`${object.firstName} ${object.lastName}`}
                    billingAddress
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="atorinfo">
            <div className="row">
              <div className="col-md-4">
                <h2>Experience</h2>
                <ul>
                  <li>{object.expertise}</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h2>Education</h2>
                <ul>
                  <li>{object.education}</li>
                </ul>
              </div>
              <div className="col-md-4">
                <h2>Practice Area</h2>
                <ul>
                  <li>{object.practiceArea}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttorneyDetails;
