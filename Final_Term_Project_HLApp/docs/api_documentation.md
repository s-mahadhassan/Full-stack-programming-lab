# API Documentation - Healthcare Management System (HLApp)

The HLApp API backend runs by default on `http://localhost:5000/api`. All protected endpoints require a `Bearer <token>` token in the `Authorization` header.

---

## MODULE 1: AUTHENTICATION (`/api/auth`)

### 1. User Registration
* **Endpoint**: `POST /auth/register`
* **Access**: Public
* **Payload**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "patient",
  "age": 28,
  "gender": "female",
  "bloodGroup": "O+",
  "address": "123 Health Ave"
}
```
*Note: If the role is `'doctor'`, you should pass specialization, experience, department, phone, and fees instead of age/gender/bloodGroup.*

### 2. User Login
* **Endpoint**: `POST /auth/login`
* **Access**: Public
* **Payload**:
```json
{
  "email": "admin@hlapp.com",
  "password": "adminpassword123"
}
```

### 3. Get User Profile
* **Endpoint**: `GET /auth/profile`
* **Access**: Protected (JWT token required)

---

## MODULE 2: DOCTOR & PATIENT CRUD (`/api/doctors`, `/api/patients`)

### 1. List Doctors
* **Endpoint**: `GET /doctors`
* **Access**: Public

### 2. Add Doctor
* **Endpoint**: `POST /doctors`
* **Access**: Protected (Admin only)
* **Payload**:
```json
{
  "name": "Dr. Watson",
  "email": "watson@hlapp.com",
  "specialization": "General Medicine",
  "experience": 10,
  "department": "OPD",
  "phone": "+92-300-1234567",
  "fees": 100
}
```

### 3. List Patients
* **Endpoint**: `GET /patients`
* **Access**: Protected (Admin & Doctor only)

---

## MODULE 3: APPOINTMENT & TREATMENT (`/api/appointments`, `/api/treatments`)

### 1. Book Appointment
* **Endpoint**: `POST /appointments`
* **Access**: Protected (Patient/Admin)
* **Payload**:
```json
{
  "doctorId": "doctor_mongoose_id",
  "date": "2026-06-15",
  "time": "11:30 AM",
  "reason": "Severe headache"
}
```

### 2. Update Appointment Status
* **Endpoint**: `PUT /appointments/:id/status`
* **Access**: Protected (Admin/Doctor only)
* **Payload**:
```json
{
  "status": "approved",
  "doctorId": "doctor_mongoose_id_if_assigning"
}
```

### 3. Initiate Patient Treatment Plan
* **Endpoint**: `POST /treatments`
* **Access**: Protected (Doctor only)
* **Payload**:
```json
{
  "appointmentId": "appointment_mongoose_id",
  "patientId": "patient_mongoose_id",
  "diagnosis": "Severe Migraine",
  "treatmentStatus": "active",
  "physicalCheckup": {
    "bloodPressure": "120/80",
    "pulse": 72,
    "temperature": 98.6,
    "weight": 70
  }
}
```

---

## MODULE 4: PRESCRIPTION & NOTIFICATION (`/api/prescriptions`, `/api/notifications`)

### 1. Add Prescription
* **Endpoint**: `POST /prescriptions`
* **Access**: Protected (Doctor only)
* **Payload**:
```json
{
  "appointmentId": "appointment_mongoose_id",
  "patientId": "patient_mongoose_id",
  "medications": [
    {
      "name": "Ibuprofen 400mg",
      "dosage": "1 tablet",
      "frequency": "Twice daily",
      "duration": "5 days"
    }
  ],
  "instructions": "Take after meals."
}
```

### 2. Fetch Inbox Notifications
* **Endpoint**: `GET /notifications`
* **Access**: Protected (User owner)
