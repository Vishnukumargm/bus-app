import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const searchBuses = (source, destination) =>
  axios.get(`${BASE_URL}/buses`, { params: { source, destination } });

export const getSeats = (busId) =>
  axios.get(`${BASE_URL}/buses/${busId}/seats`);

export const bookTicket = (data) =>
  axios.post(`${BASE_URL}/bookings`, data);

export const getBooking = (id) =>
  axios.get(`${BASE_URL}/bookings/${id}`);