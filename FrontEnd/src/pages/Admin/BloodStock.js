import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, Form, Input, Label, Row, Table } from "reactstrap";
import Base from "../../components/Base";
import {
  getBloodStockHandler,
  submitUpdateStockHandler,
} from "../../Features/admin/adminSlice";

const BloodStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bloodStock, setBloodStock] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [bloodData, setBloodData] = useState({
    bloodGroup: "",
    bagSize: "",
    bagQuantity: "",
  });

  useEffect(() => {
    fetchBloodStock();
  }, []);

  const fetchBloodStock = () => {
    dispatch(getBloodStockHandler())
      .then((response) => setBloodStock(response.data))
      .catch(() => toast.error("Failed to fetch blood stock."));
  };

  const handleInputChange = (event, field) => {
    setBloodData({ ...bloodData, [field]: event.target.value });
  };

  const submitUpdateStock = () => {
    dispatch(submitUpdateStockHandler(bloodData))
      .then((response) => {
        toast.success(response.data);
        setShowUpdateForm(false);
        fetchBloodStock();
        navigate("/adminhome");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Update failed!");
      });
  };

  return (
    <Base>
      <div
        className="text-center p-3 mb-4"
        style={{ backgroundColor: "#dc3545", borderRadius: "10px", color: "white" }}
      >
        <h1>Available Blood Stock</h1>
      </div>

      <Row className="justify-content-center">
        <Col lg="8" className="text-end">
          <Button color="danger" onClick={() => setShowUpdateForm(!showUpdateForm)}>
            {showUpdateForm ? "Hide Update Form" : "Update Blood Stock"}
          </Button>
        </Col>
      </Row>

      {showUpdateForm && (
        <Form className="mt-4 p-3 border rounded bg-light shadow-sm">
          <Row className="g-3">
            <Col md="4">
              <Label for="bloodGroup">Select Blood Group</Label>
              <Input
                id="bloodGroup"
                type="select"
                onChange={(e) => handleInputChange(e, "bloodGroup")}
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
            </Col>
            <Col md="4">
              <Label for="bagSize">Select Bag Size (ml)</Label>
              <Input
                id="bagSize"
                type="select"
                onChange={(e) => handleInputChange(e, "bagSize")}
              >
                <option value="">Choose...</option>
                <option value="150">150</option>
                <option value="350">350</option>
                <option value="500">500</option>
              </Input>
            </Col>
            <Col md="4">
              <Label for="bagQuantity">Enter Units of Blood</Label>
              <Input
                id="bagQuantity"
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => handleInputChange(e, "bagQuantity")}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col md="4" className="text-center">
              <Button color="warning" onClick={submitUpdateStock}>
                Update Now
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      <div className="mt-5">
        <Table striped bordered hover responsive className="text-center shadow-sm">
          <thead className="bg-danger text-white">
            <tr>
              <th>Blood Group</th>
              <th>Bag Size (ml)</th>
              <th>Bag Quantity</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {bloodStock.length > 0 ? (
              bloodStock.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.bloodGroup}</td>
                  <td>{stock.bagSize}</td>
                  <td>{stock.bagQuantity}</td>
                  <td>{stock.lastUpdatedDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted">
                  No stock available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Base>
  );
};

export default BloodStock;
