import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../../components/Base";
import { appointmentCreationhandler } from "../../Features/user/userSlice";

const CreateAppointment = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.persist.user.id);

  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    name: "",
    gender: "",
    age: "",
    doctorName: "",
    description: "",
    appointmentScheduleDate: "",
    center: "",
    bagSize: "",
    bagQuantity: "",
  });

  const handleChange = (event, property) => {
    setAppointment({ ...appointment, [property]: event.target.value });
  };

  const resetData = () => {
    setAppointment({
      name: "",
      gender: "",
      age: "",
      doctorName: "",
      description: "",
      appointmentScheduleDate: "",
      center: "",
      bagSize: "",
      bagQuantity: "",
    });
  };

  const submitAppointment = () => {
    dispatch(appointmentCreationhandler(appointment, id))
      .then((response) => {
        toast.success(response.data);
        navigate("/userhome");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Base>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          paddingBottom: "100px",
          paddingTop: "30px",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card
                style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader
                  style={{
                    backgroundColor: "#d9534f",
                    color: "white",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Book a Blood Donation Appointment
                </CardHeader>

                <CardBody style={{ padding: "30px" }}>
                  <form>
                    <FormGroup>
                      <Label for="name">Patient Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter patient name"
                        onChange={(e) => handleChange(e, "name")}
                        value={appointment.name}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Gender</Label>
                      <div>
                        <Input
                          type="radio"
                          name="gender"
                          value="MALE"
                          id="male"
                          onChange={(e) => handleChange(e, "gender")}
                        />
                        <Label for="male" className="ms-2 me-3">
                          Male
                        </Label>

                        <Input
                          type="radio"
                          name="gender"
                          value="FEMALE"
                          id="female"
                          onChange={(e) => handleChange(e, "gender")}
                        />
                        <Label for="female" className="ms-2 me-3">
                          Female
                        </Label>

                        <Input
                          type="radio"
                          name="gender"
                          value="OTHER"
                          id="other"
                          onChange={(e) => handleChange(e, "gender")}
                        />
                        <Label for="other" className="ms-2">
                          Other
                        </Label>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label for="age">Age</Label>
                      <Input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter your age"
                        onChange={(e) => handleChange(e, "age")}
                        value={appointment.age}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="doctorName">Doctor's Name</Label>
                      <Input
                        type="text"
                        id="doctorName"
                        name="doctorName"
                        placeholder="Enter doctor's name"
                        onChange={(e) => handleChange(e, "doctorName")}
                        value={appointment.doctorName}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        id="description"
                        name="description"
                        placeholder="Describe your blood need"
                        onChange={(e) => handleChange(e, "description")}
                        value={appointment.description}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="appointmentScheduleDate">Appointment Date</Label>
                      <Input
                        type="date"
                        id="appointmentScheduleDate"
                        name="appointmentScheduleDate"
                        onChange={(e) => handleChange(e, "appointmentScheduleDate")}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="center">Select Blood Center</Label>
                      <Input
                        type="select"
                        id="center"
                        name="center"
                        onChange={(e) => handleChange(e, "center")}
                      >
                        <option>Select a center</option>
                        <option value="SURAT">SURAT</option>
                        <option value="AHMEDABAD">AHMEDABAD</option>
                        <option value="THANE">THANE</option>
                        <option value="PUNE">PUNE</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="bagSize">Blood Bag Size (in ml)</Label>
                      <Input
                        type="select"
                        id="bagSize"
                        name="bagSize"
                        onChange={(e) => handleChange(e, "bagSize")}
                      >
                        <option>Choose size</option>
                        <option value="150">150</option>
                        <option value="350">350</option>
                        <option value="500">500</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="bagQuantity">Blood Units Needed</Label>
                      <Input
                        type="select"
                        id="bagQuantity"
                        name="bagQuantity"
                        onChange={(e) => handleChange(e, "bagQuantity")}
                      >
                        <option>Choose quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Input>
                    </FormGroup>

                    <Container className="text-center mt-4">
                      <Button
                        type="button"
                        onClick={submitAppointment}
                        style={{ backgroundColor: "#d9534f", border: "none" }}
                      >
                        Book Appointment
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        className="ms-4"
                        onClick={resetData}
                      >
                        Reset
                      </Button>
                    </Container>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default CreateAppointment;
