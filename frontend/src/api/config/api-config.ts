import axios, { AxiosInstance } from "axios";

// Environment variables for service URLs
const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4001";
const USERS_SERVICE_URL =
  process.env.NEXT_PUBLIC_USERS_SERVICE_URL || "http://localhost:4002";
const APPOINTMENTS_SERVICE_URL =
  process.env.NEXT_PUBLIC_APPOINTMENTS_SERVICE_URL || "http://localhost:4003";
const PRESCRIPTIONS_SERVICE_URL =
  process.env.NEXT_PUBLIC_PRESCRIPTIONS_SERVICE_URL || "http://localhost:4004";
const NOTIFICATIONS_SERVICE_URL =
  process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVICE_URL || "http://localhost:4005";

// Create axios instance for Auth Service
const authApi: AxiosInstance = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create axios instance for Users Service
const usersApi: AxiosInstance = axios.create({
  baseURL: USERS_SERVICE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an axios instance for Appointments Service
const AppointmentsApi: AxiosInstance = axios.create({
  baseURL: APPOINTMENTS_SERVICE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an axios instance for Prescriptions Service
const PrescriptionsApi: AxiosInstance = axios.create({
  baseURL: PRESCRIPTIONS_SERVICE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an axios instance for Notifications Service
const NotificationsApi: AxiosInstance = axios.create({
  baseURL: NOTIFICATIONS_SERVICE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include cookies and headers
const addAuthInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      // Ensure cookies are sent with requests
      config.withCredentials = true;
      
      // Add auth token from localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor for error handling
const addResponseInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Redirect to login or refresh token
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors
addAuthInterceptor(authApi);
addAuthInterceptor(usersApi);
addAuthInterceptor(AppointmentsApi);
addAuthInterceptor(PrescriptionsApi);
addAuthInterceptor(NotificationsApi);
addResponseInterceptor(authApi);
addResponseInterceptor(usersApi);
addResponseInterceptor(AppointmentsApi);
addResponseInterceptor(PrescriptionsApi);
addResponseInterceptor(NotificationsApi);

const api = {
  authApi,
  usersApi,
  AppointmentsApi,
  PrescriptionsApi,
  NotificationsApi,
};

export default api;
