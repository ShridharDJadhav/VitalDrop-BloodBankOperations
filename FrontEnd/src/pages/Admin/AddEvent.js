import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Base from "../../components/Base";
import { createCampHandler } from "../../Features/admin/adminSlice";

const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [camp, setCamp] = useState({
    title: "",
    description: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    venue: "",
    city: "",
  });

  const submitCamp = () => {
    dispatch(createCampHandler(camp))
      .then((response) => {
        toast.success(response.data);
        navigate("/upcomingevents");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const handleChange = (event, property) => {
    setCamp({ ...camp, [property]: event.target.value });
  };

  return (
    <Base>
      <div className="signupBackground" style={{ backgroundColor: "#ffebee", minHeight: "100vh" }}>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card style={{ borderColor: "#b71c1c" }}>
                <CardHeader style={{ backgroundColor: "#b71c1c", color: "white" }}>
                  <Container className="text-center">
                    <h3>Create a New Blood Donation Camp</h3>
                  </Container>
                </CardHeader>

                <CardBody style={{ backgroundColor: "#ffebee" }}>
                  <form className="signup">
                    <FormGroup>
                      <Label for="title">Event Title</Label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter event title"
                        onChange={(e) => handleChange(e, "title")}
                        value={camp.title}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        id="description"
                        name="description"
                        placeholder="Write event description here"
                        style={{ resize: "none" }}
                        rows="4"
                        onChange={(e) => handleChange(e, "description")}
                        value={camp.description}
                      />
                    </FormGroup>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="eventStartDate">Event Start Date</Label>
                          <Input
                            type="date"
                            id="eventStartDate"
                            name="eventStartDate"
                            onChange={(e) => handleChange(e, "eventStartDate")}
                            value={camp.eventStartDate}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="eventStartTime">Event Start Time</Label>
                          <Input
                            type="time"
                            id="eventStartTime"
                            name="eventStartTime"
                            onChange={(e) => handleChange(e, "eventStartTime")}
                            value={camp.eventStartTime}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="eventEndDate">Event End Date</Label>
                          <Input
                            type="date"
                            id="eventEndDate"
                            name="eventEndDate"
                            onChange={(e) => handleChange(e, "eventEndDate")}
                            value={camp.eventEndDate}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="eventEndTime">Event End Time</Label>
                          <Input
                            type="time"
                            id="eventEndTime"
                            name="eventEndTime"
                            onChange={(e) => handleChange(e, "eventEndTime")}
                            value={camp.eventEndTime}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="venue">Event Venue</Label>
                      <Input
                        type="text"
                        id="venue"
                        name="venue"
                        placeholder="Enter event address"
                        onChange={(e) => handleChange(e, "venue")}
                        value={camp.venue}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="city">Select City</Label>
                      <Input
                        type="select"
                        id="city"
                        name="city"
                        onChange={(e) => handleChange(e, "city")}
                        value={camp.city}
                      >
                        <option value="">Choose a city</option>
                        <option value="THANE">THANE</option>
                        <option value="PUNE">PUNE</option>
                        <option value="SURAT">SURAT</option>
                        <option value="AHMEDABAD">AHMEDABAD</option>
                      </Input>
                    </FormGroup>

                    <Container className="text-center mb-3">
                      <Button color="danger" type="button" onClick={submitCamp}>
                        Create Event
                      </Button>
                      <Button type="reset" color="secondary" className="ms-3">
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

export default AddEvent;
