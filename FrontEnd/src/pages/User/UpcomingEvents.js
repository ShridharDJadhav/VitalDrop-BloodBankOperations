import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Col, Container, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Base from "../../components/Base";
import { deleteCampHandler, getUpcomigEventsHandler, updateCampHandler } from "../../Features/admin/adminSlice";

function UpcomingEvents() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [camp, setCamp] = useState({
    id: "",
    title: "",
    description: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    venue: "",
    city: "",
  });

  useEffect(() => {
    eventListHandler();
  }, []);

  const eventListHandler = () => {
    dispatch(getUpcomigEventsHandler())
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  };

  const handleChange = (event, property) => {
    setCamp({ ...camp, [property]: event.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buttonUpdateEvent = (item) => {
    handleShow();
    setCamp({
      id: item.id,
      title: item.title,
      description: item.description,
      eventStartDate: item.eventStartDate,
      eventStartTime: item.eventStartTime,
      eventEndDate: item.eventEndDate,
      eventEndTime: item.eventEndTime,
      venue: item.venue,
      city: item.city,
    });
  };

  const deleteEvent = (id) => {
    dispatch(deleteCampHandler(id))
      .then((response) => {
        toast.success(response.data);
        eventListHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatingEvent = () => {
    handleClose();
    dispatch(updateCampHandler(camp))
      .then((response) => {
        toast.success(response.data);
        eventListHandler();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Base>
      {/* Updated header with red theme */}
      <div
        style={{
          background: "linear-gradient(to right, rgb(220, 53, 69), rgb(255, 99, 132))",
          textAlign: "center",
          padding: "20px",
          color: "white",
          borderRadius: "5px",
        }}
      >
        <h1>Upcoming Events</h1>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <Table striped hover className="table-bordered">
              <thead style={{ background: "rgb(220, 53, 69)", color: "white" }}>
                <tr>
                  <th>Event No.</th>
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Starting From</th>
                  <th>Ending On</th>
                  <th>Location</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.eventStartDate}</td>
                    <td>{item.eventEndDate}</td>
                    <td>{item.venue}</td>
                    <td>{item.city}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: "rgb(255, 99, 132)", border: "none", marginRight: "5px" }}
                        onClick={() => buttonUpdateEvent(item)}
                      >
                        Update
                      </Button>
                      <Button
                        style={{ backgroundColor: "rgb(220, 53, 69)", border: "none" }}
                        onClick={() => deleteEvent(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>

      {/* Update Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "rgb(220, 53, 69)", color: "white" }}>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <Label>Event Id</Label>
              <Input readOnly value={camp.id} style={{ textAlign: "center" }} />
            </FormGroup>
            <FormGroup>
              <Label>Event Title</Label>
              <Input type="text" placeholder="Enter event title" onChange={(e) => handleChange(e, "title")} value={camp.title} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" placeholder="Write event description" onChange={(e) => handleChange(e, "description")} value={camp.description} />
            </FormGroup>

            <Row>
              <Col>
                <FormGroup>
                  <Label>Event Start Date</Label>
                  <Input type="date" onChange={(e) => handleChange(e, "eventStartDate")} value={camp.eventStartDate} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Event Start Time</Label>
                  <Input type="time" onChange={(e) => handleChange(e, "eventStartTime")} value={camp.eventStartTime} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label>Event End Date</Label>
                  <Input type="date" onChange={(e) => handleChange(e, "eventEndDate")} value={camp.eventEndDate} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Event End Time</Label>
                  <Input type="time" onChange={(e) => handleChange(e, "eventEndTime")} value={camp.eventEndTime} />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Event Venue</Label>
              <Input type="text" placeholder="Write full address" onChange={(e) => handleChange(e, "venue")} value={camp.venue} />
            </FormGroup>

            <FormGroup>
              <Label>Select City</Label>
              <Input type="select" onChange={(event) => handleChange(event, "city")} value={camp.city}>
                <option value="">Choose a city</option>
                <option value="THANE">THANE</option>
                <option value="PUNE">PUNE</option>
                <option value="SURAT">SURAT</option>
                <option value="AHMEDABAD">AHMEDABAD</option>
              </Input>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "rgb(255, 99, 132)", border: "none" }} onClick={handleClose}>Close</Button>
          <Button style={{ backgroundColor: "rgb(220, 53, 69)", border: "none" }} onClick={updatingEvent}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Base>
  );
}

export default UpcomingEvents;
