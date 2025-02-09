import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row, Table } from "reactstrap";
import Base from "../../components/Base";
import { getAllAppointmentHistoryHandler } from "../../Features/admin/adminSlice";

function AllAppointment() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    appointmentHandler();
  }, []);

  const appointmentHandler = () => {
    dispatch(getAllAppointmentHistoryHandler())
      .then((response) => setData(response.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "btn-success";
      case "PENDING":
        return "btn-warning";
      case "REJECTED":
        return "btn-danger";
      default:
        return "btn-secondary";
    }
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
        <h1>All Appointments</h1>
      </div>

      <Row className="justify-content-center">
        <Col lg="10">
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center shadow-sm"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead className="bg-danger text-white">
              <tr>
                <th>Appointment ID</th>
                <th>Name</th>
                <th>Schedule Date</th>
                <th>Blood Group</th>
                <th>Patient Name</th>
                <th>Bag Size (ml)</th>
                <th>Status</th>
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
                      <Button className={`btn ${getStatusClass(item.status)}`}>
                        {item.status}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-muted">
                    No appointments found.
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

export default AllAppointment;
