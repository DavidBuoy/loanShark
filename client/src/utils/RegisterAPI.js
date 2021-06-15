import axios from "axios";

const savePerson = (data) => {
    console.log(data)
    return axios.post("/api/register", data);
};

export default savePerson;