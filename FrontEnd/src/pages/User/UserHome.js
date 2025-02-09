import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import Base from "../../components/Base";

const UserHome = () => {
  let userDetails = useSelector((state) => state.persist.user);

  const profileImage =
    userDetails.image !== null
      ? `http://localhost:8080/users/${userDetails.id}/image`
      : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"; // Default avatar

  // Internal CSS for styling
  const styles = {
    section: {
      backgroundColor: "#f8d7da",
      minHeight: "100vh",
      paddingTop: "40px",
      paddingBottom: "40px",
    },
    card: {
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      background: "#fff",
    },
    header: {
      color: "#dc3545",
      fontWeight: "bold",
      textAlign: "center",
    },
    textMuted: {
      color: "#6c757d",
      fontSize: "16px",
    },
    image: {
      width: "150px",
      borderRadius: "50%",
      border: "3px solid #dc3545",
      padding: "5px",
    },
  };

  return (
    <Base>
      <section style={styles.section}>
        <MDBContainer className="py-5">
          
          <MDBRow>
            {/* Profile Image & Name Card */}
            <MDBCol lg="4">
              <MDBCard style={styles.card} className="mb-4 text-center">
                <MDBCardBody>
                  <MDBCardImage
                    src={profileImage}
                    alt="Profile Image"
                    className="rounded-circle"
                    style={styles.image}
                    fluid
                  />
                  <h3 className="mt-3">{userDetails.firstName} {userDetails.lastName}</h3>
                  <p className="text-muted mb-1">{userDetails.role.replace("ROLE_", "")}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            {/* User Details Card */}
            <MDBCol lg="8">
              <MDBCard style={styles.card} className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={styles.textMuted}>{userDetails.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={styles.textMuted}>{userDetails.contactNo}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={styles.textMuted}>{userDetails.gender}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={styles.textMuted}>{userDetails.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </Base>
  );
};

export default UserHome;
