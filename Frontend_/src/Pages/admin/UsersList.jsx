import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../Utils/Axios.jsx'
function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true); // New state for loading

  const get_all_users = async () => {
    try {
      const { data } = await api.get(`/user/get_all_users`);

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      // toast.error(error.message || "Failed to fetch attorneys");
    } finally {
      setLoading(false); // Stop loading
    }
  };



  const DeleteUser = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);
      setUsers(prevAttorneys => prevAttorneys.filter(user => user._id !== id));
      toast.success("User Deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete users");
    }
  };


  useEffect(() => {
    get_all_users();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Users Lists</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Users</h4>
                  <div className="table-responsive">
                    <table className="table table-editable table-nowrap align-middle table-edits">
                      <thead>
                        <tr style={{ cursor: "pointer" }}>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>

                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id} style={{ cursor: "pointer" }}>
                            <td style={{ width: 80 }}>{user._id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td style={{ width: 100 }}>
                             
                              <button
                                onClick={() => DeleteUser(user._id)}
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
                            <p className='text-danger text-center'>No Users Found</p>
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

    </>
  )
}

export default Users