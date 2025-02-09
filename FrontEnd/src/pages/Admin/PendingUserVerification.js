import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row, Table, Container, Spinner, Alert } from "reactstrap";
import Base from "../../components/Base";
import {
  approveRejectIdproofHendler,
  getPendingIdproofhandler,
} from "../../Features/admin/adminSlice";

export const PendingUserVerification = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    idVerificationHandler();
  }, []);

  const idVerificationHandler = () => {
    setLoading(true);
    dispatch(getPendingIdproofhandler())
      .then((response) => {
        setData(response.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch pending verifications.");
        setLoading(false);
      });
  };

  const approve = (item) => {
    let param = { status: "APPROVED" };
    dispatch(approveRejectIdproofHendler(param, item.user.id))
      .then(() => idVerificationHandler())
      .catch(() => {});
  };

  const reject = (item) => {
    let param = { status: "REJECTED" };
    dispatch(approveRejectIdproofHendler(param, item.user.id))
      .then(() => idVerificationHandler())
      .catch(() => {});
  };

  return (
    <Base>
      {/* 🔴 Red Themed Header */}
      <Row
        className="m-3 p-3 text-center"
        style={{
          background: "#ffcccc",
          borderRadius: "10px",
        }}
      >
        <Col>
          <h2 className="text-danger">Pending User Verification</h2>
        </Col>
      </Row>

      <Container>
        {/* 🌀 Loading Spinner */}
        {loading ? (
          <div className="text-center my-4">
            <Spinner color="danger" />
            <p>Loading pending verifications...</p>
          </div>
        ) : error ? (
          <Alert color="danger" className="text-center">{error}</Alert>
        ) : data.length === 0 ? (
          <Alert color="warning" className="text-center">
            No pending verifications found.
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
            {/* 🔴 Dark Red Table Header */}
            <thead style={{ backgroundColor: "#cc0000", color: "white" }}>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Identity Proof Type</th>
                <th>ID Card Number</th>
                <th colSpan={2}>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.user.id}>
                  <td>{item.user.id}</td>
                  <td>{item.user.firstName}</td>
                  <td>{item.user.lastName}</td>
                  <td>{item.user.email}</td>
                  <td>{item.documentType}</td>
                  <td>{item.uniqueIdNumber}</td>
                  <td>
                    <Button className="btn-success" onClick={() => approve(item)}>
                      ✅ Approve
                    </Button>
                  </td>
                  <td>
                    <Button className="btn-danger" onClick={() => reject(item)}>
                      ❌ Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Base>
  );
};

export default PendingUserVerification;
