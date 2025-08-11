import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Utils/Axios";

function AttorneysList() {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);

  const get_all_attorneys = async () => {
    try {
      const { data } = await api.get(`/lawyer/get_all_attorney`);

      if (Array.isArray(data)) {
        setAttorneys(data);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch attorneys");
    } finally {
      setLoading(false);
    }
  };

  const DeleteAttorney = async (id) => {
    try {
      await api.delete(`/lawyer/delete/${id}`);
      setAttorneys((prevAttorneys) =>
        prevAttorneys.filter((attorney) => attorney._id !== id)
      );
      toast.success("Attorney Deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete attorney");
    }
  };

  useEffect(() => {
    get_all_attorneys();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Attorney Lists</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Attorney</h4>
                <div className="table-responsive">
                  <table className="table table-editable table-nowrap align-middle table-edits">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Cell</th>
                        <th>Address</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attorneys.length > 0 ? (
                        attorneys.map((attorney) => (
                          <tr key={attorney._id} style={{ cursor: "pointer" }}>
                            <td style={{ width: 80 }}>{attorney._id}</td>
                            <td>
                              {attorney.firstName} {attorney.lastName}
                            </td>
                            <td>{attorney.email}</td>
                            <td>{attorney.cell}</td>
                            <td>{attorney.address}</td>
                            <td style={{ width: 100 }}>
                              <Link
                                className="btn btn-outline-primary btn-sm edit"
                                title="View"
                                to={`/admin/attorneys-details?data=${encodeURIComponent(
                                  JSON.stringify(attorney)
                                )}`}
                              >
                                <i className="fas fa-eye" />
                              </Link>
                              <button
                                onClick={() => DeleteAttorney(attorney._id)}
                                className="btn btn-outline-danger btn-sm edit"
                                title="Delete"
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <p className="text-danger text-center">
                              No Attorneys Found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end col */}
        </div>{" "}
        {/* end row */}
      </div>{" "}
      {/* container-fluid */}
    </div>
  );
}

export default AttorneysList;
