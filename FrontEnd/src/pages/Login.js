import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Container, Card } from "reactstrap";
import Base from "../components/Base";
import { setUser } from "../Features/persist/persist";
import { login } from "../Features/user/userSlice";
import { storageItem } from "../services/helper";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    setLoginDetails({
      ...loginDetails,
      [field]: event.target.value,
    });
  };

  const validateEmail = (email) => {
    return /^([A-Za-z0-9_\-\.])+\@gmail+\.(com)$/.test(email);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!loginDetails.email.trim()) {
      toast.error("Please enter your registered email.");
      return;
    }
    if (!validateEmail(loginDetails.email)) {
      toast.error("Invalid email format! Use a Gmail address.");
      return;
    }
    if (!loginDetails.password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    dispatch(login(loginDetails))
      .then((response) => {
        storageItem.setItem("token", response.data.jwt);
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));

        if (response.data.user.role === "ROLE_USER") {
          navigate("/userhome");
        } else if (response.data.user.role === "ROLE_ADMIN") {
          navigate("/adminhome");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Base>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
        <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }}>
          <h2 className="text-center text-danger">Login</h2>
          <Form onSubmit={handleFormSubmit} className="mt-3">
            <FormGroup>
              <label className="form-label text-muted">Email</label>
              <Input
                type="email"
                id="exampleEmail"
                placeholder="example@gmail.com"
                value={loginDetails.email}
                onChange={(e) => handleChange(e, "email")}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <label className="form-label text-muted">Password</label>
              <Input
                type="password"
                id="examplePassword"
                placeholder="********"
                value={loginDetails.password}
                onChange={(e) => handleChange(e, "password")}
                className="form-control"
              />
            </FormGroup>

            <Button type="submit" color="danger" className="w-100 mt-3">
              Login
            </Button>

            <div className="text-center mt-3">
              <small>
                Don't have an account? <Link to="/signup" className="text-danger">Sign up</Link>
              </small>
            </div>
          </Form>
        </Card>
      </Container>
    </Base>
  );
};

export default Login;
