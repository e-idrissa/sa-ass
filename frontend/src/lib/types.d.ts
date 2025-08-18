type IToken = {
  sub: string;
  email: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
}

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
  drug: string;
  frequency: string;
  day: number
};

type IPrescription = {
  id: number;
  doctor: {
    id: string,
    name: string,
    email: string
  };
  patient: {
    id: string,
    name: string,
    email: string
  };
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
