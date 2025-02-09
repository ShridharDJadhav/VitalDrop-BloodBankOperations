import CustomNavbar from "./CustomNavbar";
import "./../App.css";

const Base = ({ title = "welcome to Vital-Drop", children }) => {
  return (
    <div>
      <CustomNavbar />

      {children}
      
      {/* <div className="footer"></div> */}
    </div>
  );
};

export default Base;
