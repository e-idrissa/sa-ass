type IUser = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string
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

type IAppointment = {
  id: string
  user: string
  email: string
  reason: string
  status: string
  date: Date
}
