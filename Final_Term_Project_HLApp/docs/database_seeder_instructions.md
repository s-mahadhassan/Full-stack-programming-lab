# Database Seeder Instructions - HLApp

The database seeder is configured to populate the MongoDB database with initial records for academic viva demonstration and testing.

## Running the Seeder

1. Make sure your local MongoDB instance is running at `mongodb://127.0.0.1:27017` (or modify `MONGO_URI` in `.env`).
2. Navigate to the `backend/` directory.
3. Run the following command:
   ```bash
   npm run seed
   ```

## Seeded Data Metrics

Running this script clears all existing collections in the database and registers:

* **1 System Admin**:
  * Email: `admin@hlapp.com`
  * Password: `adminpassword123`
* **15 Doctors**:
  * Emails: `doctor1@hlapp.com` to `doctor15@hlapp.com`
  * Password: `doctorpassword123`
  * Specializations: Cardiology, Pediatrics, Dermatology, Neurology, Orthopedics, General Medicine, Psychiatry, Oncology, Gynecology, Ophthalmology, Urology, Gastroenterology, Pulmonology, Endocrinology, Nephrology.
* **15 Patients**:
  * Emails: `patient1@hlapp.com` to `patient15@hlapp.com`
  * Password: `patientpassword123`
  * Pre-linked to an assigned Doctor.
* **5 Appointments**:
  * Pre-populated with various states (pending, approved, rejected, completed).
* **2 Treatment Records**:
  * Active lifecycle entries containing physical vitals (BP, pulse, temp, weight) and follow-up schedules.
* **2 Prescriptions**:
  * Linked to appointments, listing specific drug dosage grids.
* **Sample inbox notifications** for patients.
