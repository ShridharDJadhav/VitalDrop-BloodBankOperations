import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row, Table, Container, Alert, Spinner } from "reactstrap";
import Base from "../../components/Base";
import { getUserListHandler } from "../../Features/admin/adminSlice";

function ListAllUsers() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userListHandler();
  }, []);

  const userListHandler = () => {
    dispatch(getUserListHandler())
      .then((response) => {
        setData(response.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch registered users.");
        setLoading(false);
      });
  };

  return (
    <Base>
      {/* Red Themed Header */}
      <Row
        className="m-3 p-3 text-center"
        style={{
          background: "#ffcccc", // Light red background
          borderRadius: "10px",
        }}
      >
        <Col>
          <h2 className="text-danger">Registered Users</h2>
        </Col>
      </Row>

      <Container>
        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center my-4">
            <Spinner color="danger" />
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <Alert color="danger" className="text-center">{error}</Alert>
        ) : data.length === 0 ? (
          <Alert color="warning" className="text-center">
            No registered users found.
          </Alert>
        ) : (
          <Table
            striped
            hover
            bordered
            responsive
            className="text-center"
            style={{
              backgroundColor: "#ffe6e6", // Very light red background
            }}
          >
            {/* Table Header with Dark Red Theme */}
            <thead style={{ backgroundColor: "#cc0000", color: "white" }}>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email ID</th>
                <th>Contact Number</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Identity Proof Type</th>
                <th>ID Card Number</th>
                <th>Verification Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((userdata) => (
                <tr key={userdata.user.id}>
                  <td>{userdata.user.id}</td>
                  <td>
                    {userdata.user.firstName} {userdata.user.lastName}
                  </td>
                  <td>{userdata.user.email}</td>
                  <td>{userdata.user.contactNo}</td>
                  <td>{userdata.user.age}</td>
                  <td>{userdata.user.gender}</td>
                  <td>{userdata.documentType}</td>
                  <td>{userdata.uniqueIdNumber}</td>
                  <td>
                    {userdata.status.includes("REJECTED") && (
                      <Button className="btn-danger">{userdata.status}</Button>
                    )}
                    {userdata.status.includes("PENDING") && (
                      <Button className="btn-warning">{userdata.status}</Button>
                    )}
                    {userdata.status.includes("APPROVED") && (
                      <Button className="btn-success">{userdata.status}</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Base>
  );
}

export default ListAllUsers;
