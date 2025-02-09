import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Container } from "reactstrap";
import Base from "../../components/Base";
import { getDonationHistoryHandler } from "../../Features/user/userSlice";

export const DonationHistory = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.persist.user.id);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getDonationHistoryHandler(id))
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        toast.error("Oops! Your donation history is empty.");
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
        Blood Donations History
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
              <th>Donor Name</th>
              <th>Blood Sample ID</th>
              <th>Blood Group</th>
              <th>Bag Size (ml)</th>
              <th>Bag Quantity</th>
              <th>Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.user.firstName} {item.user.lastName}
                  </td>
                  <td>{item.bloodSampleId}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.bagSize}</td>
                  <td>{item.bagQuantity}</td>
                  <td>{item.dateOfDonation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                  No donation records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Base>
  );
};
