import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row, Table } from "reactstrap";
import Base from "../../components/Base";
import {
  approveRejectAppointmentsHendler,
  getPendingAppointmenthandler,
} from "../../Features/admin/adminSlice";

function PendingAppointments() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = () => {
    dispatch(getPendingAppointmenthandler())
      .then((response) => setData(response.data))
      .catch((err) => console.error("Error fetching pending appointments:", err));
  };

  const updateStatus = (item, status) => {
    const requestData = { id: item.id, status };
    dispatch(approveRejectAppointmentsHendler(requestData))
      .then(() => fetchPendingAppointments())
      .catch((error) => console.error(`Error updating status to ${status}:`, error));
  };

  return (
    <Base>
      <div
        style={{
          background: "#dc3545",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <h1>Pending Appointments</h1>
      </div>

      <Row className="justify-content-center">
        <Col lg="10">
          <Table striped bordered hover responsive className="text-center shadow-sm">
            <thead className="bg-danger text-white">
              <tr>
                <th>Appointment ID</th>
                <th>Name</th>
                <th>Schedule Date</th>
                <th>Blood Group</th>
                <th>Patient Name</th>
                <th>Bag Size (ml)</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user?.firstName || "N/A"}</td>
                    <td>{item.appointmentScheduleDate || "N/A"}</td>
                    <td>{item.bloodGroup || "N/A"}</td>
                    <td>{item.patient?.name || "N/A"}</td>
                    <td>{item.bagSize || "N/A"}</td>
                    <td>
                      <Button className="btn-success" onClick={() => updateStatus(item, "APPROVED")}>
                        Approve
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-danger" onClick={() => updateStatus(item, "REJECTED")}>
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted">
                    No pending appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Base>
  );
}

export default PendingAppointments;
