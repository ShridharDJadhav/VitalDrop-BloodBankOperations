import { fetch } from "../services/helper";

const login = (data) => {
  return fetch("post", "http://localhost:7070/api/auth/signin", data, {}, {});
};



const appointmentCreation = (data, id,header) => {
  return fetch(
    "post",
    `http://localhost:7070/api/appointment/createAppointment/${id}`,
    data,
    header,
    {}
  );
};

const addAddress = (id,data,header) => {
  return fetch(
    "post",
    `http://localhost:7070/address/add_address/${id}`,
    data,
    header,
    {}
  );
};

const getAddressById = (id,header) => {
  return fetch(
    "get",
    `http://localhost:7070/address/${id}`,
    {},
    header,
    {}
  );
};

const appointmentHistory = (id,header) => {
  return fetch(
    "get",
    `http://localhost:7070/api/appointment/getUserAppointment/${id}`,
    {},
    header,
    {}
  );
};
const donationHistory = (id,header) => {
  return fetch(
    "get",
    `http://localhost:7070/users/bloodDonation/${id}`,
    {},
    header,
    {}
  );
};

// request for getting upcoming events
const getUpcomingEvents = () => {
  return fetch(
    "get",
    `http://localhost:7070/api/bloodbank/home`,
    {},
    {},
    {}
  );
};


export const userApi = {
  login,
  appointmentCreation,
  appointmentHistory,
  donationHistory,
  addAddress,
  getAddressById,
  getUpcomingEvents
};
