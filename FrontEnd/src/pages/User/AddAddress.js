import { useState } from "react";
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
import { addAddresshandler } from "../../Features/user/userSlice";
import "../signup.css";

function AddAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.persist.user.id);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setAddress({ ...address, [property]: event.target.value });
  };

  const resetAddress = () => {
    setAddress({
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!address.address.trim()) newErrors.address = "Address is required.";
    if (!address.city.trim()) newErrors.city = "City is required.";
    if (!address.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = "Enter a valid 6-digit Pincode.";

    setError({ errors: newErrors, isError: Object.keys(newErrors).length > 0 });
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(addAddresshandler(id, address))
      .then((response) => {
        toast.success("Address added successfully!");
        navigate("/getalladdresses");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error adding address.");
      });
  };

  return (
    <div style={{ height: "100%", background: "#f8f9fa" }}>
      <Base>
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col sm="6">
              <Card className="shadow-lg border-0 rounded-lg">
                <CardHeader className="text-center bg-danger text-white">
                  <h4>Add Address</h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={submitForm}>
                    <FormGroup>
                      <Label for="address">Full Address</Label>
                      <Input
                        type="textarea"
                        rows="3"
                        id="address"
                        name="address"
                        placeholder="Enter your full address"
                        onChange={(e) => handleChange(e, "address")}
                        value={address.address}
                        invalid={error.errors.address ? true : false}
                      />
                      {error.errors.address && <small className="text-danger">{error.errors.address}</small>}
                    </FormGroup>

                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        onChange={(e) => handleChange(e, "city")}
                        value={address.city}
                        invalid={error.errors.city ? true : false}
                      />
                      {error.errors.city && <small className="text-danger">{error.errors.city}</small>}
                    </FormGroup>

                    <FormGroup>
                      <Label for="state">State</Label>
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Enter state"
                        onChange={(e) => handleChange(e, "state")}
                        value={address.state}
                        invalid={error.errors.state ? true : false}
                      />
                      {error.errors.state && <small className="text-danger">{error.errors.state}</small>}
                    </FormGroup>

                    <FormGroup>
                      <Label for="pincode">Pincode</Label>
                      <Input
                        type="number"
                        id="pincode"
                        name="pincode"
                        placeholder="Enter 6-digit Pincode"
                        onChange={(e) => handleChange(e, "pincode")}
                        value={address.pincode}
                        invalid={error.errors.pincode ? true : false}
                      />
                      {error.errors.pincode && <small className="text-danger">{error.errors.pincode}</small>}
                    </FormGroup>

                    <Container className="text-center mt-4">
                      <Button color="danger" type="submit" className="me-3">
                        Add Address
                      </Button>
                      <Button type="button" color="secondary" onClick={resetAddress}>
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

export default AddAddress;
