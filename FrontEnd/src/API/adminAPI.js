// import { fetch } from "../services/helper";

// // axios method to get the available blood stock
// const getBloodStocks = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/bloodinventory/getblood`,
//     {},
//     header,
//     {}
//   );
// };

// // axios method to get the list of registerd users
// const getUsersList = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/users/listOfAll`,
//     {},
//     header,
//     {}
//   );
// };
// const getUpcomingEvents = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/event/upcoming_events`,
//     {},
//     header,
//     {}
//   );
// };

// //axios method to get the all pending appointment details
// const getPendingAppointments = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/appointment/pending`,
//     {},
//     header,
//     {}
//   );
// };

// //axios method to approve or reject the appointment status
// const ApproveRejectAppointments = (data, header) => {
//   return fetch(
//     "put",
//     `http://localhost:7070/api/admin/appointment/updateAppointmentsts`,
//     data,
//     header,
//     {}
//   );
// };


// //axios method to approve or reject the appointment status
// const updateBloodStock = (data,header) => {
//   return fetch(
//     "put",
//     `http://localhost:7070/api/admin/bloodinventory/addblood`,
//     data,
//     header,
//     {}
//   );
// };

// const addUserByAdmin = (data,header) => {
//   return fetch(
//     "post",
//     `http://localhost:7070/api/admin/user/add_donor_user`,
//     data,
//     header,
//     {}
//   );
// };

// //method to organize a event
// const createACamp = (data,header) => {
//   return fetch(
//     "post",
//     `http://localhost:7070/api/admin/event/createEvent`,
//     data,
//     header,
//     {}
//   );
// };

// //method to organize a event
// const updateACamp = (data,header) => {
//   return fetch(
//     "put",
//     `http://localhost:7070/api/admin/event/createEvent`,
//     data,
//     header,
//     {}
//   );
// };

// //method to delete a event
// const deleteACamp = (id,header) => {
//   return fetch(
//     "delete",
//     `http://localhost:7070/api/admin/event/delete/${id}`,
//     {},
//     header,
//     {}
//   );
// };


// const getPendingIdproof = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/identityproof/pendingIdStatus`,
//     {},
//     header,
//     {}
//   );
// };



// const createBloodDonate = (id,data,header) => {
//   return fetch(
//     "post",
//     `http://localhost:7070/api/admin/blooddonation/createBloodDonation/${id}`,
//     data,
//     header,
//     {}
//   );
// };


// const ApproveRejectIdproof = (param, id, header) => {
//   return fetch(
//     "put",
//     `http://localhost:7070/api/admin/identityproof/updateIdVerification/${id}`,
//     {},
//     header,
//     param
//   );
// };
// //get all blood donations
// const getAllDonationHistory = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/blooddonation/getAllDonation`,
//     {},
//     header,
//     {}
//   );
// };

// //get all apointment(past+future)
// const getAllAppointmentHistory = (header) => {
//   return fetch(
//     "get",
//     `http://localhost:7070/api/admin/appointment/list_all_appointment`,
//     {},
//     header,
//     {}
//   );
// };

// export const adminAPI = {
//   getPendingAppointments,
//   ApproveRejectAppointments,
//   ApproveRejectIdproof,
//   getPendingIdproof,
//   getBloodStocks,
//   getUsersList,
//   getAllDonationHistory,
//   getAllAppointmentHistory,
//   updateBloodStock,
//   createBloodDonate,
//   getUpcomingEvents,
//   addUserByAdmin,
//   createACamp,
//   updateACamp,
//   deleteACamp
// };

import { fetch } from "../services/helper";

const BASE_URL = process.env.REACT_APP_API_URL;

// GET BLOOD STOCKS
const getBloodStocks = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/bloodinventory/getblood`,
    {},
    header,
    {}
  );
};

// GET USERS
const getUsersList = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/users/listOfAll`,
    {},
    header,
    {}
  );
};

// UPCOMING EVENTS
const getUpcomingEvents = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/event/upcoming_events`,
    {},
    header,
    {}
  );
};

// PENDING APPOINTMENTS
const getPendingAppointments = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/appointment/pending`,
    {},
    header,
    {}
  );
};

// APPROVE/REJECT APPOINTMENT
const ApproveRejectAppointments = (data, header) => {
  return fetch(
    "put",
    `${BASE_URL}/api/admin/appointment/updateAppointmentsts`,
    data,
    header,
    {}
  );
};

// UPDATE BLOOD STOCK
const updateBloodStock = (data, header) => {
  return fetch(
    "put",
    `${BASE_URL}/api/admin/bloodinventory/addblood`,
    data,
    header,
    {}
  );
};

// ADD USER
const addUserByAdmin = (data, header) => {
  return fetch(
    "post",
    `${BASE_URL}/api/admin/user/add_donor_user`,
    data,
    header,
    {}
  );
};

// CREATE CAMP
const createACamp = (data, header) => {
  return fetch(
    "post",
    `${BASE_URL}/api/admin/event/createEvent`,
    data,
    header,
    {}
  );
};

// UPDATE CAMP
const updateACamp = (data, header) => {
  return fetch(
    "put",
    `${BASE_URL}/api/admin/event/createEvent`,
    data,
    header,
    {}
  );
};

// DELETE CAMP
const deleteACamp = (id, header) => {
  return fetch(
    "delete",
    `${BASE_URL}/api/admin/event/delete/${id}`,
    {},
    header,
    {}
  );
};

// PENDING ID PROOF
const getPendingIdproof = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/identityproof/pendingIdStatus`,
    {},
    header,
    {}
  );
};

// CREATE BLOOD DONATION
const createBloodDonate = (id, data, header) => {
  return fetch(
    "post",
    `${BASE_URL}/api/admin/blooddonation/createBloodDonation/${id}`,
    data,
    header,
    {}
  );
};

// APPROVE/REJECT ID PROOF
const ApproveRejectIdproof = (param, id, header) => {
  return fetch(
    "put",
    `${BASE_URL}/api/admin/identityproof/updateIdVerification/${id}`,
    {},
    header,
    param
  );
};

// ALL DONATIONS
const getAllDonationHistory = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/blooddonation/getAllDonation`,
    {},
    header,
    {}
  );
};

// ALL APPOINTMENTS
const getAllAppointmentHistory = (header) => {
  return fetch(
    "get",
    `${BASE_URL}/api/admin/appointment/list_all_appointment`,
    {},
    header,
    {}
  );
};

export const adminAPI = {
  getPendingAppointments,
  ApproveRejectAppointments,
  ApproveRejectIdproof,
  getPendingIdproof,
  getBloodStocks,
  getUsersList,
  getAllDonationHistory,
  getAllAppointmentHistory,
  updateBloodStock,
  createBloodDonate,
  getUpcomingEvents,
  addUserByAdmin,
  createACamp,
  updateACamp,
  deleteACamp,
};
