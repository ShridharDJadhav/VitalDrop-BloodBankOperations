
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Base from "../components/Base";
import { removeUser } from "../Features/persist/persist";
import { storageItem } from "../services/helper";

const ContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());
    storageItem.removeItem("token");
    navigate("/");
  };

  const contacts = [
    {
      name: "Shridhar Jadhav",
      phone: "+91 98345 59966",
      email: "shridhardjadhav99@gmail.com",
      address: "PUNE",
    },
    {
      name: "Sagar Sahane",
      phone: "+91 98226 06260",
      email: "sagarsahane7632@gmail.com",
      address: "PUNE",
    },
    {
      name: "Rahul Patil",
      phone: "+91 98345 29589",
      email: "rahuljeevanpatil@gmail.com",
      address: "PUNE",
    },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "#f8d7da",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#dc3545",
      marginBottom: "20px",
      textTransform: "uppercase",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    card: {
      width: "300px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "20px",
      textAlign: "center",
      borderLeft: "5px solid #dc3545",
    },
    title: {
      color: "#dc3545",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    text: {
      color: "#333",
      marginBottom: "8px",
    },
    icon: {
      width: "24px",
      marginRight: "8px",
      verticalAlign: "middle",
    },
  };

  return (
    <Base>
      <div style={styles.container}>
        <h2 style={styles.heading}>Contact Us</h2>
        <div style={styles.cardContainer}>
          {contacts.map((contact, index) => (
            <div key={index} style={styles.card}>
              <h4 style={styles.title}>{contact.name}</h4>
              <p style={styles.text}>
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="Phone"
                  style={styles.icon}
                />
                {contact.phone}
              </p>
              <p style={styles.text}>
                <img
                  src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png"
                  alt="Email"
                  style={styles.icon}
                />
                {contact.email}
              </p>
              <p style={styles.text}>
                <img
                  src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png"
                  alt="Address"
                  style={styles.icon}
                />
                {contact.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ContactUs;
