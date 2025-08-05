type IUser = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
};

type IHomeTableData = {
  user: string;
  email: string;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type IUsersTableData = {
  id: string;
  role: string;
  isConfirmed: boolean;
  matricule: number;
  email: string;
  user: string;
  telephone: string;
};

type IUserInfos = {
  id: string;
  role: string;
  isConfirmed: boolean;
  matricule: number;
  email: string;
  user: string;
  dateOfBirth: Date
  sex: string
  telephone: string;
  emergencyContact: string;
  height: string;
  pound: string;
  bloodGroup: string;
  speciality?: string
};
