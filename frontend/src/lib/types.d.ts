type IUser = {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

type IUsersTableData = {
  id: string;
  role: string;
  isVerified: boolean;
  matricule: number;
  email: string;
  user: string;
  telephone: string;
};

type IUserInfos = {
  id: string;
  role: string;
  isVerified: boolean;
  matricule: number;
  email: string;
  user: string;
  dateOfBirth: Date;
  sex: string;
  telephone: string;
  emergencyContact: string;
  height: string;
  pound: string;
  bloodGroup: string;
  speciality?: string;
};

type IAppointment = {
  id: string;
  creatorId: string;
  patient: {
    id: string
    name: string;
    email: string;
  };
  doctor: {
    id: string
    name: string;
    email: string;
  };
  reason: string;
  status: string;
  date: Date;
};

type IDrug = {
  id: string;
  name: string;
};

type IDrugDosage = {
  id: string;
  drugId: string;
  frequency: string;
};

type IPrescription = {
  id: number;
  doctor: string;
  patient: string;
  drugDosage: IDrugDosage[];
  recordUrl?: string;
  createdAt: Date;
};

type IDrug = {
  id: string;
  name: string;
};

type IWeekAppointments = {
  date: string
  day: string
  count: number
}
