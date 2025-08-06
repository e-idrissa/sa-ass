export const homeTableData = [
  {
    id: "1",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "pending",
    date: new Date("2025-08-25"),
  },
  {
    id: "2",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "pending",
    date: new Date("2025-08-25"),
  },
  {
    id: "3",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "pending",
    date: new Date("2025-08-25"),
  },
  {
    id: "4",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "confirmed",
    date: new Date("2025-08-25"),
  },
  {
    id: "5",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "completed",
    date: new Date("2025-08-25"),
  },
  {
    id: "6",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "rejected",
    date: new Date("2025-08-25"),
  },
  {
    id: "7",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "completed",
    date: new Date("2025-08-25"),
  },
  {
    id: "8",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "pending",
    date: new Date("2025-08-25"),
  },
  {
    id: "9",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "confirmed",
    date: new Date("2025-08-25"),
  },
  {
    id: "10",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "completed",
    date: new Date("2025-08-25"),
  },
  {
    id: "11",
    user: "Adam Smith",
    email: "adam@consult.com",
    reason: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    status: "completed",
    date: new Date("2025-08-25"),
  },
];

export const usersTableData: IUsersTableData[] = [
  {
    id: "1",
    isConfirmed: true,
    role: "doctor",
    matricule: 1001,
    email: "john.doe@example.com",
    user: "John Doe",
    telephone: "+1234567890",
  },
  {
    id: "2",
    isConfirmed: false,
    role: "doctor",
    matricule: 1002,
    email: "jane.smith@example.com",
    user: "Jane Smith",
    telephone: "+1987654321",
  },
  {
    id: "3",
    isConfirmed: true,
    role: "patient",
    matricule: 1003,
    email: "robert.johnson@example.com",
    user: "Robert Johnson",
    telephone: "+1122334455",
  },
  {
    id: "4",
    isConfirmed: true,
    role: "patient",
    matricule: 1004,
    email: "emily.davis@example.com",
    user: "Emily Davis",
    telephone: "+1555666777",
  },
  {
    id: "5",
    isConfirmed: false,
    role: "doctor",
    matricule: 1005,
    email: "michael.wilson@example.com",
    user: "Michael Wilson",
    telephone: "+1444333222",
  },
  {
    id: "6",
    isConfirmed: true,
    role: "doctor",
    matricule: 1006,
    email: "sarah.miller@example.com",
    user: "Sarah Miller",
    telephone: "+1777888999",
  },
  {
    id: "7",
    isConfirmed: true,
    role: "patient",
    matricule: 1007,
    email: "david.moore@example.com",
    user: "David Moore",
    telephone: "+1666777888",
  },
  {
    id: "8",
    isConfirmed: false,
    role: "patient",
    matricule: 1008,
    email: "lisa.taylor@example.com",
    user: "Lisa Taylor",
    telephone: "+1888999000",
  },
  {
    id: "9",
    isConfirmed: true,
    role: "doctor",
    matricule: 1009,
    email: "james.anderson@example.com",
    user: "James Anderson",
    telephone: "+1999888777",
  },
  {
    id: "10",
    isConfirmed: true,
    role: "patient",
    matricule: 1010,
    email: "jennifer.thomas@example.com",
    user: "Jennifer Thomas",
    telephone: "+1222333444",
  },
];

export const prescriptionsData: IPrescription[] = [
  {
    id: 1,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 2,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 3,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 4,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 5,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 6,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 7,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 8,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 9,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 10,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 11,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-25")
  },
  {
    id: 12,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 13,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 14,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 15,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 16,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 17,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  ,
  {
    id: 18,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  {
    id: 19,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
  {
    id: 20,
    doctor: "Alexander Dowie",
    patient: "Mai Lee",
    drugDosage: [
      {
        id: "00001",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00002",
        drugId: "00001",
        frequency: "3 x 3",
      },
      {
        id: "00003",
        drugId: "00001",
        frequency: "3 x 3",
      },
    ],
    recordUrl: "http://my-storage.com",
    createdAt: new Date("2025-07-20")
  },
]
