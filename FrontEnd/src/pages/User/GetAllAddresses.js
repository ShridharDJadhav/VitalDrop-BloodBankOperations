import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Container } from "reactstrap";
import Base from "../../components/Base";
import { getAddressByIdHandler } from "../../Features/user/userSlice";

function GetAllAddresses() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.persist.user.id);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAddressByIdHandler(id))
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error fetching addresses");
      });
  }, [dispatch, id]);

  return (
    <Base>
      {/* Header Section */}
      <div
        style={{
          background: "#d9534f",
          color: "white",
          textAlign: "center",
          padding: "20px",
          fontSize: "1.8rem",
          fontWeight: "bold",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        All Addresses
      </div>

      {/* Table Section */}
      <Container>
        <Table
          striped
          bordered
          hover
          responsive
          style={{
            textAlign: "center",
            border: "2px solid black",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
              <th>ID</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.pincode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No address records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Base>
  );
}

export default GetAllAddresses;
