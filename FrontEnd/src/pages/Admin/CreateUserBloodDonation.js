import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { createBloodDonationHandler } from "../../Features/admin/adminSlice";

const CreateUserBloodDonation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [blood, setBlood] = useState({
    id: "",
    bloodGroup: "",
    bagSize: "",
    bagQuantity: "",
    dateOfDonation: "",
  });

  const handleChange = (event, property) => {
    setBlood({ ...blood, [property]: event.target.value });
  };

  const submitBlood = (e) => {
    e.preventDefault(); // Prevents page reload

    dispatch(createBloodDonationHandler(blood))
      .then((response) => {
        toast.success(response.data);
        navigate("/blooddonationhistory");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to submit donation!");
      });
  };

  return (
    <Base>
      <Container className="mb-5 mt-3">
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="shadow-sm">
              <CardHeader className="bg-danger text-white text-center">
                <h3>Create a Blood Donation</h3>
              </CardHeader>

              <CardBody>
                <form onSubmit={submitBlood}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="id">Enter User ID</Label>
                        <Input
                          type="number"
                          id="id"
                          name="id"
                          placeholder="Enter user ID"
                          value={blood.id}
                          onChange={(event) => handleChange(event, "id")}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="bloodGroup">Select Blood Group</Label>
                        <Input
                          type="select"
                          id="bloodGroup"
                          name="bloodGroup"
                          value={blood.bloodGroup}
                          onChange={(event) => handleChange(event, "bloodGroup")}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="O_positive">O+</option>
                          <option value="O_negative">O-</option>
                          <option value="AB_positive">AB+</option>
                          <option value="AB_negative">AB-</option>
                          <option value="A_positive">A+</option>
                          <option value="A_negative">A-</option>
                          <option value="B_positive">B+</option>
                          <option value="B_negative">B-</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="bagSize">Select Bag Size (ml)</Label>
                    <Input
                      type="select"
                      id="bagSize"
                      name="bagSize"
                      value={blood.bagSize}
                      onChange={(event) => handleChange(event, "bagSize")}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="150">150</option>
                      <option value="350">350</option>
                      <option value="500">500</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="bagQuantity">Select Units of Blood Donated</Label>
                    <Input
                      type="select"
                      id="bagQuantity"
                      name="bagQuantity"
                      value={blood.bagQuantity}
                      onChange={(event) => handleChange(event, "bagQuantity")}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="dateOfDonation">Donation Date</Label>
                    <Input
                      type="date"
                      id="dateOfDonation"
                      name="dateOfDonation"
                      value={blood.dateOfDonation}
                      onChange={(event) => handleChange(event, "dateOfDonation")}
                      required
                    />
                  </FormGroup>

                  <Container className="text-center mt-4">
                    <Button type="submit" color="danger" className="me-3">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      onClick={() => setBlood({ id: "", bloodGroup: "", bagSize: "", bagQuantity: "", dateOfDonation: "" })}
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
    </Base>
  );
};

export default CreateUserBloodDonation;
