import axios from 'axios';

const API_BASE_USER = 'http://localhost:5050/api/user';
//const API_BASE_LOCATION = 'http://localhost:5050/api/location';
export const checkUsernameAvailability = async (username) => {
  const { data } = await axios.get(`${API_BASE_USER }/check-username`, { params: { username } });
  return data.available;
};

export const getCountries = async () => {
  const { data } = await axios.get(`${API_BASE_USER}/countries`);
  return data;
};

export const getStates = async (country) => {
  const { data } = await axios.get(`${API_BASE_USER}/states/${country}`);
  return data;
};

export const getCities = async (country, state) => {
  const { data } = await axios.get(`${API_BASE_USER}/cities/${country}/${state}`);
  return data;
};

export const saveUser = async (formData) => {
  // formData should be FormData instance due to file upload
  const { data } = await axios.post("http://localhost:5050/api/user/save", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
  return data;
};
