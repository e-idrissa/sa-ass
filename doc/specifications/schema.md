# Schema Definition

This file defines each database table schema of the app.

## 🧑🏻‍⚕️Users Service Schemas

### Patients Table

- `id: String`
- `role: String`
- `isVerified: boolean`
- `matricule: String`
- `email: String`
- `hashPassword: String`
- `firstName: String`
- `lastName: String`
- `dateOfBirth: Date`
- `sex: String`
- `telephone: String`
- `emergencyContact: String`
- `height: String`
- `pound: String`
- `bloodGroup: String`

### Doctors Table

- `id: String`
- `role: String`
- `isVerified: boolean`
- `matricule: String`
- `email: String`
- `hashPassword: String`
- `firstName: String`
- `lastName: String`
- `dateOfBirth: Date`
- `sex: String,`
- `telephone: String`
- `emergencyContact: String`
- `height: String`
- `pound: String`
- `bloodGroup: String`
- `speciality: String`

## 🗓️ Appointments Service

### Appointments Table

- `id: String`
- `patientId: String`
- `doctorId: String`
- `reason: String`
- `date: Date`
- `status: String`
- `createdAt: String`
- `updatedAt: String`

## 💊 Prescriptions Service

### Prescriptions Table

- `id : Number`
- `creatorId: String`
- `doctorId: String`
- `patientId: String`
- `drugDosage: DrugDosage[]`
- `recordUrl: String`
- `createdAt: String`

### Drugs Dosage Table

- `id: String`
- `drugId: string`
- `frequency: String`
- `period: Number`

### Drugs Table

- `id: String`
- `name: String`

## 📁 Records Service

### Records Table

- `id: String`
- `name: String`
- `url: String`
- `type: String`
