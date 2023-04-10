import axios from "axios";
import { useState, useEffect } from "react";
import AppConfig from "../../app.json";
import Pagination from "../../elemenents/Paginations";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        AppConfig.host + "/api/v1/admin/dashboard-upload",
        { headers: { "Content-Type": "application/json" } }
      );
      setData(response.data);
    }
    fetchData();
  }, []);

  const handleRedirect = (status) => {
    navigate(`/orders${status}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="title is-1 has-text-centered mb-5">Dashboard</h1>
      <div className="columns is-multiline">
      <div className="column is-one-third">
  <div className="card has-background-white-bis">
    <header className="card-header">
      <p className="card-header-title has-text-weight-semibold is-size-3">
Orders
      </p>
    </header>
    <div className="card-content">
      <div className="columns is-mobile is-multiline">
        <div className="column is-half">
          <div className="notification is-primary">
            <p className="title is-4 has-text-weight-bold">{data.order_all}</p>
            <p className="subtitle is-6">All Orders</p>
            <i
              className="material-icons is-primary is-outlined is-rounded is-small"
              onClick={() => handleRedirect("")}
            >
              arrow_forward
            </i>
          </div>
        </div>
        <div className="column is-half">
          <div className="notification is-success">
            <p className="title is-4 has-text-weight-bold">{data.order_confirmed}</p>
            <p className="subtitle is-6">Confirmed Orders</p>
            <i
              className="material-icons is-success is-outlined is-rounded is-small"
              onClick={() => handleRedirect("?status=confirmed")}
            >
              arrow_forward
            </i>
          </div>
        </div>
        <div className="column is-half">
          <div className="notification is-warning">
            <p className="title is-4 has-text-weight-bold">{data.order_pending}</p>
            <p className="subtitle is-6">Pending Orders</p>
            <i
              className="material-icons is-warning is-outlined is-rounded is-small"
              onClick={() => handleRedirect("?status=pending")}
            >
              arrow_forward
            </i>
          </div>
        </div>
        <div className="column is-half">
          <div className="notification is-info">
            <p className="title is-4 has-text-weight-bold">{data.order_shipped}</p>
            <p className="subtitle is-6">Shipped Orders</p>
            <i
              className="material-icons is-info is-outlined is-rounded is-small"
              onClick={() => handleRedirect("?status=shipped")}
            >
               arrow_forward
            </i>
          </div>
        </div>
        <div className="column is-half">
          <div className="notification is-dark">
            <p className="title is-4 has-text-weight-bold">{data.order_delivered}</p>
            <p className="subtitle is-6">Delivered Orders</p>
            <i
              className="material-icons is-primary-dark is-outlined is-rounded is-small"
              onClick={() => handleRedirect("?status=delivered")}
            >
              arrow_forward
            </i>
          </div>
        </div>
        <div className="column is-half">
          <div className="notification is-danger">
            <p className="title is-4 has-text-weight-bold">{data.order_canceled}</p>
            <p className="subtitle is-6">Canceled Orders</p>
            <i
              className="material-icons is-primary-dark is-outlined is-rounded is-small"
              onClick={() => handleRedirect("?status=canceled")}
            >
              arrow_forward
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>

        </div>
        <div className="column is-two-thirds">
          <div className="box has-background-white-bis">
            <h2 className="title is-3">Customers</h2>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {data.users &&
                  data.users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;