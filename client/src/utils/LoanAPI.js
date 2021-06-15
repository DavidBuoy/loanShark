import axios from "axios";

// get all loans by user_id
const getLoans = (query) => {
  return axios.get("/api/loans?user_id=" + query);
};
// get one loan
const getLoanById = (id) => {
  return axios.get("/api/loans/" + id);
};
// save a new loan
// loan is name, amount
// date and user_id are already set
const saveLoan = (loanData) => {
  return axios.post("/api/loans", loanData);
};
// delete loan
const deleteLoan = (id) => {
  return axios.delete("/api/loans/" + id);
};

export { getLoans, getLoanById, saveLoan, deleteLoan };
