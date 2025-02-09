import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      password: "",
      contactNo: "",
      age: "",
      gender: "",
      documentType: "",
      uniqueIdNumber: "",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    signUp(user)
      .then(() => {
        toast.success("Registered successfully!");
        resetUser();
        navigate("/login");
      })
      .catch(() => {
        toast.error("Registration unsuccessful.");
      });
  };

  return (
    <div className="signupBackground">
      <Base>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
          <Row className="w-100">
            <Col md={{ size: 6, offset: 3 }}>
              <Card className="p-4 shadow-lg" style={{ borderRadius: "10px" }}>
                <CardHeader className="text-center text-danger">
                  <h3>Register Yourself</h3>
                </CardHeader>
                <CardBody>
                  <form onSubmit={submitForm}>
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input type="text" placeholder="Enter first name" value={user.firstName} onChange={(e) => handleChange(e, "firstName")} required />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input type="text" placeholder="Enter last name" value={user.lastName} onChange={(e) => handleChange(e, "lastName")} required />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" placeholder="Enter email" value={user.email} onChange={(e) => handleChange(e, "email")} required />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Password</Label>
                      <Input type="password" placeholder="Enter password" value={user.password} onChange={(e) => handleChange(e, "password")} required />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Contact No</Label>
                      <Input type="number" placeholder="Enter mobile number" value={user.contactNo} onChange={(e) => handleChange(e, "contactNo")} required min={6000000000} max={9999999999} />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Age</Label>
                      <Input type="number" placeholder="Enter age" value={user.age} onChange={(e) => handleChange(e, "age")} required min={15} max={100} />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Gender</Label>
                      <div>
                        <Input type="radio" name="gender" value="MALE" onChange={(e) => handleChange(e, "gender")} /> Male
                        <Input type="radio" name="gender" value="FEMALE" className="ms-3" onChange={(e) => handleChange(e, "gender")} /> Female
                        <Input type="radio" name="gender" value="OTHER" className="ms-3" onChange={(e) => handleChange(e, "gender")} /> Other
                      </div>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Identity Proof</Label>
                      <Input type="select" value={user.documentType} onChange={(e) => handleChange(e, "documentType")} required>
                        <option value="">Choose one</option>
                        <option value="AADHAR_CARD">Aadhar Card</option>
                        <option value="VOTER_ID">Voter ID</option>
                        <option value="PAN_CARD">PAN Card</option>
                      </Input>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Document ID</Label>
                      <Input type="text" placeholder="Enter document ID" value={user.uniqueIdNumber} onChange={(e) => handleChange(e, "uniqueIdNumber")} required minLength={10} maxLength={12} />
                    </FormGroup>
                    
                    <Container className="text-center">
                      <Button color="danger" className="w-100">Register</Button>
                      <p className="mt-3">Already registered? <Link to="/login" className="text-danger">Login</Link></p>
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
};

export default Signup;
