// API Response types
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  result: T | null;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  sub: string;
  role: string;
  email: string;
  accessToken: string;
  type: string;
}

// User types
export interface User {
  _id?: string;
  role: string;
  isVerified: boolean;
  matricule: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: string;
  telephone: string;
  emergencyContact: string;
  height: number;
  pound: number;
  bloodGroup: string;
  specialty: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserData {
  role: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  sex?: string;
  telephone?: string;
  emergencyContact?: string;
  height?: number;
  pound?: number;
  bloodGroup?: string;
  specialty?: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  sex?: string;
  telephone?: string;
  emergencyContact?: string;
  height?: number;
  pound?: number;
  bloodGroup?: string;
  specialty?: string;
}

export interface UpdatePasswordData {
  newPassword: string;
}
