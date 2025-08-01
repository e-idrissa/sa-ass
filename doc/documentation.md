# ⚕️eConsult

This is a microservices app build with [Next.JS](https://nextjs.org/) that handles the UI part and the Next.JS `Server Actions` plays the API Gateway. Services are developed with [Nest.JS](https://docs.nestjs.com/), a powerful JavaScript framework to build scalable and high performance web applications.

## How it works

On the first lunch of the app, a set of drugs and and an admin user are automatically populated in their respective tables to enhance the UX.

The admin create app users (patients and doctors) and manage the entire app. 

Patients can add some importants documents to their account and share them with others. They can take an appointment with a doctor and this one will validate or reject it. Both can easily view their appointments.

When the doctor accepts a appointment, the user is notified and the appointment status changes in the system. Doctors can create a dedicated prescriptions to a specific patient.

## How to run

Build on a microservice architecture style, run the following commands in the terminal after you download the project and navigate to its location in the terminal.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
🎉 Congratulations, your frontend app is running on `http://localhost:3000`

### Services

As the app has 6 distinct services, you need to open additional 6 terminal profiles in your terminal.

Here is a list of the services of the app:
- auth
- users
- prescriptions
- appointments
- records
- notifications

For each on of them, before going any further, consider to create a `.env` and populate it with `.env.example` file content and update it.

⚠️ Don't change the services port values.

Now, run the following for each service:
```bash
cd [service-name]
npm install
npm start:dev
```


**Admin Credentials:**
- `email: admin@econsult.com`
- `password: 1234@Admin`

🥳 Amazing job so far. Now the app is fully running on your machine. Enjoy it!