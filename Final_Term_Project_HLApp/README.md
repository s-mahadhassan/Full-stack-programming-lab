# Healthcare Management System - HLApp (Final Term Project)

A complete Full-Stack Healthcare Management System developed as a Final Term Project for the BSSE-VI A Full Stack Programming Lab. 

HLApp features secure JWT authentication, role-based dashboards, clinical patient CRUD logs, doctor assignments, booking scheduling, treatment lifecycles (physical checkups & follow-up visits), prescriptions, automated email notifications (Nodemailer), and simulated SMS alert notifications inside a smartphone UI mock console.

---

## Project Structure

```
Final_Term_Project_HLApp/
├── backend/
│   ├── config/       # DB Connections
│   ├── controllers/  # API Handlers
│   ├── middleware/   # Authentication, Authorization & Global Error Handlers
│   ├── models/       # Mongoose Schemas (User, Doctor, Patient, Appointment, etc.)
│   ├── routes/       # Express Resource Routes
│   ├── services/     # Email Dispatch services
│   ├── utils/        # Token Helpers
│   ├── seed/         # Database Seeder Scripts
│   ├── server.js     # Entrypoint
│   └── package.json
│
├── frontend/
│   ├── app/          # Next.js App Router (Dashboards, screens, layouts)
│   ├── components/   # Reusable UI elements (Sidebar, Header, Table, Modals)
│   ├── services/     # Axios API request clients
│   ├── context/      # Authentication Provider React Context
│   ├── middleware/   # Route guard middlewares
│   ├── styles/       # Premium Vanilla CSS theme configurations
│   └── package.json
│
└── docs/             # Technical specifications & seeder guides
```

---

## Installation & Setup

### Prerequisites
* **Node.js** (v18+ recommended)
* **npm** (v9+)
* **MongoDB** running locally (`mongodb://127.0.0.1:27017/healthcare_db`)

### Step 1: Clone or Open Workspace
Ensure the folder structure is unpacked.

### Step 2: Setup Backend
1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Initialize the environment variables by making a copy of `.env.example`:
   ```bash
   copy .env.example .env
   ```
4. Run the database seeder to inject the 15+ doctors, 15+ patients, and test credentials:
   ```bash
   npm run seed
   ```
5. Start the backend developer API server:
   ```bash
   npm run start
   ```
   *The API will start running on `http://localhost:5000`.*

### Step 3: Setup Frontend
1. Navigate to the `frontend/` folder:
   ```bash
   cd ../frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The portal will open on `http://localhost:3000`.*

---

## Sample Test Accounts

Use the following seeded accounts to test the portals:

### 1. System Administrator
* **Email**: `admin@hlapp.com`
* **Password**: `adminpassword123`

### 2. Clinical Specialist (Doctor)
* **Email**: `doctor1@hlapp.com` (to `doctor15@hlapp.com`)
* **Password**: `doctorpassword123`
* **Profile**: Dr. Sarah Connor (Cardiology Specialist)

### 3. Registered Patient
* **Email**: `patient1@hlapp.com` (to `patient15@hlapp.com`)
* **Password**: `patientpassword123`
* **Profile**: Alice Smith (Pre-assigned to Dr. Sarah Connor)

---

## Technical Features Implemented

* **Secure Authentication**: password hashing via bcrypt, JWT tokens, role-based protection routes.
* **Separation of Profiles**: Admin handles CRUD for Doctors/Patients. Patients edit own profile; Doctors edit medical logs.
* **Treatment Lifecycle**: Doctors record vitals (BP, pulse, temp, weight), track diagnosis status changes, and schedule follow-ups.
* **Medication Prescriptions**: Linked to appointments. Supports adding multiple drug doses dynamically.
* **Device Alert Simulator**: Simulated SMS console mockup styled as a smartphone in the patient portal.
* **Toast Interactions**: Clean action validations, delete prompts, and feedback popups.
