import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Container, Card, CardHeader, CardBody } from "reactstrap";
import Base from "../../components/Base";
import { getAppointmentHistoryhandler } from "../../Features/user/userSlice";
import { toast } from "react-toastify";

function AppointmentHistory() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.persist.user.id);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAppointmentHistoryhandler(id))
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        toast.error("Failed to load appointment history");
      });
  }, []);

  return (
    <Base>
      <Container className="mt-4">
        <Card className="shadow-lg border-0 rounded-lg">
          <CardHeader className="bg-danger text-white text-center">
            <h3>Appointment History</h3>
          </CardHeader>
          <CardBody>
            {data.length > 0 ? (
              <Table striped bordered hover responsive className="text-center">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Creation Date</th>
                    <th>Schedule Date</th>
                    <th>Status</th>
                    <th>Patient Name</th>
                    <th>Blood Group</th>
                    <th>Bag Size (ml)</th>
                    <th>Bag Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.appointmentCreationDate}</td>
                      <td>{item.appointmentScheduleDate}</td>
                      <td>
                        {item.status.includes("REJECTED") && (
                          <Button color="danger" size="sm">{item.status}</Button>
                        )}
                        {item.status.includes("PENDING") && (
                          <Button color="warning" size="sm">{item.status}</Button>
                        )}
                        {item.status.includes("APPROVED") && (
                          <Button color="success" size="sm">{item.status}</Button>
                        )}
                      </td>
                      <td>{item.patient.name}</td>
                      <td>{item.bloodGroup}</td>
                      <td>{item.bagSize}</td>
                      <td>{item.bagQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center text-muted">No appointment history available.</p>
            )}
          </CardBody>
        </Card>
      </Container>
    </Base>
  );
}

export default AppointmentHistory;
