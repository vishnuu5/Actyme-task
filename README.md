# Actyme.com – MERN Stack App with Weekly Prize Draws, Stripe Payments, and Adapter Monitoring

This project is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It features:

- Weekly prize draws using a cron job
- Stripe payment integration (test mode)
- Adapter connectivity tests with logging and monitoring
- i18n support for English and French
- Logging via Morgan and Winston logger

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, i18next, Stripe.js
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Tools**: Morgan, Winston, node-cron, dotenv

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/vishnuu5/Actyme-task.git
cd actyme
```

### 2. Backend Setup (/server)

```bash
cd server
npm install
```

### Create a .env file in /server:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/actyme
STRIPE_SECRET_KEY=
USE_REAL_ADAPTER=true
NODE_ENV=development
```

### Start backend:

```bash
npm run dev
```

### 3. Frontend Setup (/client)

```bash
cd ../client
npm install
```

### Create a .env file in /client:

```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

### Start frontend:

```bash
npm run dev
```

### Key Endpoints

**Stripe Payments**
Method Endpoint Description
POST /api/payment/create-checkout-session Creates a Stripe Checkout session

**Weekly Draw**
Method Triggered by cron job Description
GET - Selects winners from MongoDB weekly

**Adapter Monitoring**
Method Endpoint Description
GET /api/adapter/test-connectivity Tests third-party adapter availability

This generates a report at /server/logs/connectivity-report.json and logs results via logger.js.

### i18n Languages

Language Toggle Button
English Default
French Use "Switch Lang" UI

Translations stored in /client/src/i18n/locales/en.json and fr.json.

### Bonus Features

Stripe payments in test mode

Adapter connectivity testing with logs

i18n toggle (English / French)

Weekly cron job prize draw

Structured error and activity logging

Modern responsive UI with Tailwind

### Testing Notes

1.Stripe Test Payments
Use card: 4242 4242 4242 4242 with any valid expiry, CVV.
Ensure Stripe keys are correctly set in both .env files.

2.Adapter Test
Click “Recheck Adapter Connectivity” on the homepage.
Results logged in:
Console (via Winston)
/server/logs/connectivity-report.json

3.Weekly Draw
Simulated via node-cron. Set to run every Sunday at 00:00.
To test manually: import and call drawWinners() in a script.

🧠 Author
Vishnu Athmakuru
Feel free to reach out for any improvements or issues.

---
