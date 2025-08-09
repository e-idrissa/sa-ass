export const admin: IUser = {
  role: "admin",
  id: "123",
  firstName: "Joe",
  lastName: "Mitchell",
  email: "admin@econsult.com",
};

export const doctor: IUser = {
  role: "doctor",
  id: "123",
  firstName: "Joe",
  lastName: "Mitchell",
  email: "admin@econsult.com",
};

export const patient: IUser = {
  role: "patient",
  id: "123",
  firstName: "Joe",
  lastName: "Mitchell",
  email: "admin@econsult.com",
};

export const sampleUser: IUserInfos = {
  id: "usr_123456789",
  role: "doctor",
  isVerified: true,
  matricule: 1001,
  email: "dr.john.smith@example.com",
  user: "Dr. John Smith",
  dateOfBirth: new Date("1985-05-15"),
  sex: "Male",
  telephone: "+1234567890",
  emergencyContact: "+1987654321",
  height: "180 cm",
  pound: "75 kg",
  bloodGroup: "A+",
  speciality: "Cardiology"
};

export const weekAppointments: IWeekAppointments[] = [
  {
    date: "2",
    day: "Mon",
    count: 4,
  },
  {
    date: "3",
    day: "Tue",
    count: 4,
  },
  {
    date: "4",
    day: "Wed",
    count: 4,
  },
  {
    date: "4",
    day: "Thu",
    count: 0,
  },
  {
    date: "5",
    day: "Fri",
    count: 4,
  },
  {
    date: "7",
    day: "Sat",
    count: 4,
  },
  {
    date: "8",
    day: "Sun",
    count: 0,
  },
]
