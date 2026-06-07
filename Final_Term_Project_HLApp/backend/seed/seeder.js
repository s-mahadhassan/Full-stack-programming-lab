/**
 * Purpose: Database Seeder Script
 * Description: Clears existing collections and populates the database with test accounts
 * (1 Admin, 15 Doctors, and 15 Patients) and related entities (Appointments, Treatments, Prescriptions).
 * Use `npm run seed` to execute this script.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Models
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Treatment = require('../models/Treatment');
const Prescription = require('../models/Prescription');
const Notification = require('../models/Notification');

// Connect to Database
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthcare_db')
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.error('DB Connection error:', err.message);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // Clear all existing data
    console.log('Clearing database...');
    await User.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();
    await Appointment.deleteMany();
    await Treatment.deleteMany();
    await Prescription.deleteMany();
    await Notification.deleteMany();

    console.log('Database cleared.');

    // 1. Create Admin User
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@hlapp.com',
      password: 'adminpassword123', // will be hashed by mongoose pre-save hook
      role: 'admin'
    });
    console.log('Admin account seeded.');

    // 2. Create 15 Doctors
    const doctorSpecializations = [
      { spec: 'Cardiology', dept: 'Cardiology Center', fees: 200 },
      { spec: 'Pediatrics', dept: 'Pediatric Clinic', fees: 150 },
      { spec: 'Dermatology', dept: 'Skin Care Wing', fees: 120 },
      { spec: 'Neurology', dept: 'Neurology Institute', fees: 250 },
      { spec: 'Orthopedics', dept: 'Bone & Joint Ward', fees: 180 },
      { spec: 'General Medicine', dept: 'General OPD', fees: 100 },
      { spec: 'Psychiatry', dept: 'Mental Health Unit', fees: 160 },
      { spec: 'Oncology', dept: 'Cancer Care Center', fees: 300 },
      { spec: 'Gynecology', dept: 'Maternity Clinic', fees: 170 },
      { spec: 'Ophthalmology', dept: 'Eye Care Dept', fees: 110 },
      { spec: 'Urology', dept: 'Renal Care', fees: 190 },
      { spec: 'Gastroenterology', dept: 'Digestive Health', fees: 160 },
      { spec: 'Pulmonology', dept: 'Respiratory OPD', fees: 150 },
      { spec: 'Endocrinology', dept: 'Diabetes & Endocrine', fees: 210 },
      { spec: 'Nephrology', dept: 'Kidney Dialysis Unit', fees: 220 }
    ];

    const doctorNames = [
      'Dr. Sarah Connor', 'Dr. John Watson', 'Dr. Meredith Grey', 'Dr. Gregory House',
      'Dr. Stephen Strange', 'Dr. Shaun Murphy', 'Dr. Perry Cox', 'Dr. Derek Shepherd',
      'Dr. Leonard McCoy', 'Dr. Michaela Quinn', 'Dr. Julius Hibbert', 'Dr. Allison Cameron',
      'Dr. Eric Foreman', 'Dr. Robert Chase', 'Dr. James Wilson'
    ];

    const doctorsList = [];

    for (let i = 0; i < 15; i++) {
      const email = `doctor${i + 1}@hlapp.com`;
      const userDoc = await User.create({
        name: doctorNames[i],
        email: email,
        password: 'doctorpassword123', // password for all doctors
        role: 'doctor'
      });

      const doctorProfile = await Doctor.create({
        userId: userDoc._id,
        specialization: doctorSpecializations[i].spec,
        experience: 5 + (i % 7) * 3, // 5 to 23 years
        department: doctorSpecializations[i].dept,
        phone: `+92-333-55500${10 + i}`,
        fees: doctorSpecializations[i].fees,
        availability: {
          days: i % 2 === 0 ? ['Monday', 'Wednesday', 'Friday'] : ['Tuesday', 'Thursday'],
          hours: i % 3 === 0 ? '09:00 - 13:00' : '14:00 - 18:00'
        }
      });
      doctorsList.push(doctorProfile);
    }
    console.log('15 Doctors seeded successfully.');

    // 3. Create 15 Patients
    const patientNames = [
      'Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Prince', 'Evan Wright',
      'Fiona Gallagher', 'George Clark', 'Hannah Abbott', 'Ian Malcolm', 'Julia Roberts',
      'Kevin Bacon', 'Laura Croft', 'Michael Scott', 'Nina Williams', 'Oscar Wilde'
    ];

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const medicalHistories = [
      ['Hypertension'], ['Asthma'], [], ['Diabetes Type 2'], [],
      ['Seasonal Allergies'], ['Hyperthyroidism'], [], [], ['Mild Arthritis'],
      [], ['Eczema'], ['Chronic Migraine'], [], ['High Cholesterol']
    ];

    const patientsList = [];

    for (let i = 0; i < 15; i++) {
      const email = `patient${i + 1}@hlapp.com`;
      const userDoc = await User.create({
        name: patientNames[i],
        email: email,
        password: 'patientpassword123', // password for all patients
        role: 'patient'
      });

      // Link to an assigned doctor (distribute among seeded doctors)
      const assignedDoc = doctorsList[i % doctorsList.length]._id;

      const patientProfile = await Patient.create({
        userId: userDoc._id,
        age: 18 + (i * 4), // 18 to 74 years
        gender: i % 2 === 0 ? 'female' : 'male',
        bloodGroup: bloodGroups[i % bloodGroups.length],
        address: `${100 + i * 15} Health Street, Phase ${1 + (i % 5)}, Cityville`,
        medicalHistory: medicalHistories[i],
        assignedDoctor: assignedDoc
      });
      patientsList.push(patientProfile);
    }
    console.log('15 Patients seeded successfully.');

    // 4. Create some Appointments (Pending, Approved, Rejected, Completed)
    const appointmentDates = [
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // in 2 days
      new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // in 4 days
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)  // tomorrow
    ];

    const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:00 PM'];
    
    // Appointment 1: Pending (Patient 1 with Doctor 1)
    const app1 = await Appointment.create({
      patientId: patientsList[0]._id,
      doctorId: doctorsList[0]._id,
      date: appointmentDates[0],
      time: timeSlots[0],
      reason: 'Routine cardiovascular checkup, feeling slight chest stiffness.',
      status: 'pending',
      statusHistory: [{ status: 'pending', updatedBy: 'patient', timestamp: new Date() }]
    });

    // Appointment 2: Approved (Patient 2 with Doctor 2)
    const app2 = await Appointment.create({
      patientId: patientsList[1]._id,
      doctorId: doctorsList[1]._id,
      date: appointmentDates[1],
      time: timeSlots[1],
      reason: 'Fever and throat pain since yesterday.',
      status: 'approved',
      statusHistory: [
        { status: 'pending', updatedBy: 'patient', timestamp: new Date() },
        { status: 'approved', updatedBy: 'doctor', timestamp: new Date() }
      ]
    });

    // Appointment 3: Completed (Patient 3 with Doctor 3)
    const app3 = await Appointment.create({
      patientId: patientsList[2]._id,
      doctorId: doctorsList[2]._id,
      date: appointmentDates[2],
      time: timeSlots[2],
      reason: 'Skin rash on upper arm.',
      status: 'completed',
      statusHistory: [
        { status: 'pending', updatedBy: 'patient', timestamp: new Date() },
        { status: 'approved', updatedBy: 'doctor', timestamp: new Date() },
        { status: 'completed', updatedBy: 'doctor', timestamp: new Date() }
      ]
    });

    // Appointment 4: Rejected (Patient 4 with Doctor 4)
    const app4 = await Appointment.create({
      patientId: patientsList[3]._id,
      doctorId: doctorsList[3]._id,
      date: appointmentDates[3],
      time: timeSlots[3],
      reason: 'Severe headache and migrainous symptoms.',
      status: 'rejected',
      statusHistory: [
        { status: 'pending', updatedBy: 'patient', timestamp: new Date() },
        { status: 'rejected', updatedBy: 'doctor', timestamp: new Date() }
      ]
    });

    // Appointment 5: Approved (Patient 5 with Doctor 5)
    const app5 = await Appointment.create({
      patientId: patientsList[4]._id,
      doctorId: doctorsList[4]._id,
      date: appointmentDates[4],
      time: timeSlots[4],
      reason: 'Follow-up on bone fracture healing.',
      status: 'approved',
      statusHistory: [
        { status: 'pending', updatedBy: 'patient', timestamp: new Date() },
        { status: 'approved', updatedBy: 'doctor', timestamp: new Date() }
      ]
    });

    console.log('5 Sample appointments seeded.');

    // 5. Create Treatment Record for Completed Appointment (Patient 3 and Doctor 3)
    const treatment1 = await Treatment.create({
      patientId: patientsList[2]._id,
      doctorId: doctorsList[2]._id,
      appointmentId: app3._id,
      diagnosis: 'Contact Dermatitis (Mild skin irritation due to laundry detergent)',
      treatmentStatus: 'active',
      physicalCheckup: {
        bloodPressure: '120/80',
        pulse: 76,
        temperature: 98.4,
        weight: 68
      },
      followUpVisits: [
        {
          visitDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in 7 days
          notes: 'Check if rash has resolved and evaluate medication efficiency.',
          status: 'scheduled'
        }
      ],
      statusUpdates: [
        { status: 'active', notes: 'Initial diagnosis and topical ointment prescribed.' }
      ]
    });

    // Create Treatment Record for Approved Appointment (Patient 5 and Doctor 5)
    const treatment2 = await Treatment.create({
      patientId: patientsList[4]._id,
      doctorId: doctorsList[4]._id,
      appointmentId: app5._id,
      diagnosis: 'Recovering Distal Radius Fracture',
      treatmentStatus: 'under_observation',
      physicalCheckup: {
        bloodPressure: '115/75',
        pulse: 70,
        temperature: 98.6,
        weight: 75
      },
      followUpVisits: [
        {
          visitDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // in 14 days
          notes: 'Remove plaster cast and inspect mobility.',
          status: 'scheduled'
        }
      ],
      statusUpdates: [
        { status: 'under_observation', notes: 'Cast is secure. Patient reports minimal pain.' }
      ]
    });

    console.log('2 Sample treatment records seeded.');

    // 6. Create Prescription for Treatment 1 / Appointment 3
    const prescription1 = await Prescription.create({
      appointmentId: app3._id,
      patientId: patientsList[2]._id,
      doctorId: doctorsList[2]._id,
      medications: [
        {
          name: 'Hydrocortisone Cream 1%',
          dosage: 'Apply small amount',
          frequency: 'Twice daily',
          duration: '7 days'
        },
        {
          name: 'Cetirizine 10mg',
          dosage: '1 tablet',
          frequency: 'Once daily (at night)',
          duration: '5 days'
        }
      ],
      instructions: 'Avoid scratching the affected area. Change laundry detergent to hypoallergenic alternatives.'
    });

    // Create Prescription for Treatment 2 / Appointment 5
    const prescription2 = await Prescription.create({
      appointmentId: app5._id,
      patientId: patientsList[4]._id,
      doctorId: doctorsList[4]._id,
      medications: [
        {
          name: 'Calcium + Vitamin D3 Supplement',
          dosage: '1 tablet',
          frequency: 'Once daily',
          duration: '30 days'
        },
        {
          name: 'Ibuprofen 400mg',
          dosage: '1 tablet',
          frequency: 'Twice daily (only if pain persists)',
          duration: '10 days'
        }
      ],
      instructions: 'Keep cast dry. Limit heavy wrist exercises.'
    });

    console.log('2 Sample prescriptions seeded.');

    // 7. Seed some Notifications
    // Patient 3 notification
    const p3User = await User.findOne({ email: 'patient3@hlapp.com' });
    await Notification.create({
      userId: p3User._id,
      title: 'Medication Alert',
      message: 'Reminder: Apply Hydrocortisone Cream as prescribed by Dr. Meredith Grey.',
      type: 'medication',
      isMobileSent: true
    });

    // Patient 5 notification
    const p5User = await User.findOne({ email: 'patient5@hlapp.com' });
    await Notification.create({
      userId: p5User._id,
      title: 'Follow-up Visit Reminder',
      message: 'Reminder: You have an upcoming follow-up visit scheduled with Dr. Stephen Strange on ' + new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      type: 'followup',
      isMobileSent: true
    });

    console.log('Notifications seeded.');

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
