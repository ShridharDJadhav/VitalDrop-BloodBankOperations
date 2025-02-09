import Base from "../components/Base";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUpcomingEventsHandler } from "../Features/user/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllUpcomingEvents();
  }, []);

  const getAllUpcomingEvents = () => {
    dispatch(getAllUpcomingEventsHandler())
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  };

  return (
    <div style={{ backgroundColor: "#fafafa", paddingBottom: "40px" }}>
      <Base>
        {/* Hero Section */}
        <Container fluid className="text-center p-5" style={{ backgroundColor: "#dc3545", color: "white" }}>
          <h2>Welcome to VITAL-DROP</h2>
          <p>Your contribution can save lives. Join us in making a difference!</p>
        </Container>

       

        {/* Upcoming Events Section */}
        <Container className="mt-5">
          <Card className="shadow-lg border-0 p-3 text-center" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
            <Card.Body>
              <h3 className="text-danger">Upcoming Events</h3>
              {events.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {events.map((event) => (
                    <li key={event.id} style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #ccc" }}>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <p>
                        <strong>Start:</strong> {event.eventStartDate} at {event.eventStartTime}
                      </p>
                      <p>
                        <strong>End:</strong> {event.eventEndDate} at {event.eventEndTime}
                      </p>
                      <p>
                        <strong>Venue:</strong> {event.venue}, {event.city}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming events available.</p>
              )}
            </Card.Body>
          </Card>
        </Container>

        {/* Side-by-Side Sections */}
        <Container className="mt-5">
          <Row className="justify-content-center">
            {/* Why Donate Blood */}
            <Col md={6}>
              <Card className="shadow-lg border-0 p-3 text-center" style={{ backgroundColor: "#fff3f3", borderRadius: "15px" }}>
                <Card.Body>
                  <h3 className="text-danger">Why Donate Blood?</h3>
                  <p>🩸 <strong>Every donation saves up to 3 lives.</strong></p>
                  <p>❤️ <strong>Boosts heart health & reduces disease risks.</strong></p>
                  <p>🏥 <strong>Blood is always needed for emergencies & surgeries.</strong></p>
                </Card.Body>
              </Card>
            </Col>

            {/* Did You Know */}
            <Col md={6}>
              <Card className="shadow-lg border-0 p-3 text-center" style={{ backgroundColor: "#dc3545", color: "white", borderRadius: "15px" }}>
                <Card.Body>
                  <h3>Did You Know?</h3>
                  <p>🩸 <strong>Every 2 seconds, someone needs blood.</strong></p>
                  <p>🏥 <strong>4 crore units are required annually in the country.</strong></p>
                  <p>👥 <strong>Less than 1% of eligible donors donate regularly.</strong></p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Home;
