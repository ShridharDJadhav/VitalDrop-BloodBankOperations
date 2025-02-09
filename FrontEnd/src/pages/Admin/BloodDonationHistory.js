import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Table, Spinner, Alert, Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { getAllDonationHistoryHandler } from "../../Features/admin/adminSlice";

const BloodDonationHistory = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBloodDonationHistory();
  }, []);

  const fetchBloodDonationHistory = () => {
    dispatch(getAllDonationHistoryHandler())
      .then((response) => {
        setData(response.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blood donation history.");
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
          <h2 className="text-danger">All Blood Donations</h2>
        </Col>
      </Row>

      <Container>
        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center my-4">
            <Spinner color="danger" />
            <p>Loading donation history...</p>
          </div>
        ) : error ? (
          <Alert color="danger" className="text-center">{error}</Alert>
        ) : data.length === 0 ? (
          <Alert color="warning" className="text-center">
            No blood donation records found.
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
                <th>ID</th>
                <th>Name</th>
                <th>Blood Sample ID</th>
                <th>Blood Group</th>
                <th>Bag Size (ml)</th>
                <th>Bag Quantity</th>
                <th>Donation Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.user?.firstName} {item.user?.lastName}
                  </td>
                  <td>{item.bloodSampleId}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.bagSize}</td>
                  <td>{item.bagQuantity}</td>
                  <td>{item.dateOfDonation}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Base>
  );
};

export default BloodDonationHistory;
