import { useState } from "react";
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
import { addUserByAdminHandler } from "../../Features/admin/adminSlice";
import "../signup.css";

function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    age: "",
    gender: "",
    documentType: "",
    uniqueIdNumber: "",
  });

  const handleChange = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
  };

  const resetUser = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      age: "",
      gender: "",
      documentType: "",
      uniqueIdNumber: "",
    });
  };

  const submitForm = (e) => {
    if (!user.firstName || !user.lastName || !user.email || !user.contactNo) {
      toast.error("Please fill in all required fields!");
      return;
    }

    dispatch(addUserByAdminHandler(user))
      .then((response) => {
        toast.success(response.data);
        navigate("/adminhome");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error adding user.");
      });
  };

  return (
    <div className="signupBackground">
      <Base>
        <Container className="mb-5 mt-5">
          <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card
                outline
                style={{
                  borderColor: "#cc0000",
                  backgroundColor: "#ffe6e6",
                }}
              >
                {/* 🔴 Red Themed Header */}
                <CardHeader
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <h3>Register a New User</h3>
                </CardHeader>

                <CardBody>
                  <form className="signup">
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="firstName">First Name</Label>
                          <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            onChange={(e) => handleChange(e, "firstName")}
                            value={user.firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="lastName">Last Name</Label>
                          <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            onChange={(e) => handleChange(e, "lastName")}
                            value={user.lastName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="email">Email ID</Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={(e) => handleChange(e, "email")}
                            value={user.email}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="contactNo">Contact No</Label>
                          <Input
                            type="text"
                            id="contactNo"
                            name="contactNo"
                            placeholder="Enter contact number"
                            onChange={(e) => handleChange(e, "contactNo")}
                            value={user.contactNo}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="age">Age</Label>
                          <Input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter age"
                            onChange={(e) => handleChange(e, "age")}
                            value={user.age}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="gender">Gender</Label>
                          <div>
                            <input
                              type="radio"
                              name="gender"
                              value="MALE"
                              id="male"
                              className="ms-2"
                              onChange={(e) => handleChange(e, "gender")}
                            />
                            <Label for="male" className="ms-1">
                              Male
                            </Label>
                            <input
                              type="radio"
                              name="gender"
                              value="FEMALE"
                              id="female"
                              className="ms-3"
                              onChange={(e) => handleChange(e, "gender")}
                            />
                            <Label for="female" className="ms-1">
                              Female
                            </Label>
                            <input
                              type="radio"
                              name="gender"
                              value="OTHER"
                              id="other"
                              className="ms-3"
                              onChange={(e) => handleChange(e, "gender")}
                            />
                            <Label for="other" className="ms-1">
                              Other
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="documentType">Identity Proof Type</Label>
                      <Input
                        onChange={(event) => handleChange(event, "documentType")}
                        id="documentType"
                        name="documentType"
                        type="select"
                      >
                        <option value="">Choose an option</option>
                        <option value="AADHAR_CARD">Aadhar Card</option>
                        <option value="VOTER_ID">Voter ID</option>
                        <option value="PAN_CARD">PAN Card</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="uniqueIdNumber">Document ID</Label>
                      <Input
                        onChange={(event) =>
                          handleChange(event, "uniqueIdNumber")
                        }
                        type="text"
                        id="uniqueIdNumber"
                        name="uniqueIdNumber"
                        placeholder="Enter document ID"
                        value={user.uniqueIdNumber}
                      />
                    </FormGroup>

                    <Container className="text-center mb-4">
                      <Button
                        color="danger"
                        type="button"
                        onClick={submitForm}
                        className="me-3"
                      >
                        Add User
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        onClick={resetUser}
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
    </div>
  );
}

export default AddUser;
