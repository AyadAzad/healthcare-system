// database/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./healthcare-system.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database.');
    db.run('PRAGMA foreign_keys = ON;'); // Enable foreign key support
  }
});
// Create Patients Table
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;'); // Enable foreign keys

  db.run(`
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT,
            phone INTEGER,
            city TEXT
        );
    `, (err) => {
    if (err) console.error('Error creating patients table:', err.message);
  });

  db.run(`
        CREATE TABLE IF NOT EXISTS hospitals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            city TEXT NOT NULL,
            services TEXT NOT NULL,
            address TEXT NOT NULL
        );
    `, (err) => {
    if (err) console.error('Error creating hospitals table:', err.message);
  });

  db.run(`
        CREATE TABLE IF NOT EXISTS doctors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hospital_id INTEGER,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            specialty TEXT NOT NULL,
            phone TEXT,
            address TEXT,
            experience INTEGER,
            available_time TEXT,
            fee INTEGER,
            FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
        );
    `, (err) => {
    if (err) console.error('Error creating doctors table:', err.message);
  });

  // Repeat for other tables...

  // Insert initial data
  db.run(`
        INSERT INTO doctors (hospital_id,first_name, last_name, email, password, specialty, phone, address, experience, available_time, fee)
        VALUES
            (1,'Ahmed', 'Al-Mansoori', 'ahmed.mansoori@example.com', 'password123', 'Cardiologist', '+9647501234567', 'Baghdad, Iraq', 15, '10:00 AM - 02:00 PM', 50000),
            (2,'Fatima', 'Al-Hassan', 'fatima.hassan@example.com', 'password123', 'Pediatrician', '+9647502345678', 'Basra, Iraq', 10, '09:00 AM - 01:00 PM', 40000),
            (3,'Mohammed', 'Al-Khalifa', 'mohammed.khalifa@example.com', 'password123', 'Dermatologist', '+9647503456789', 'Erbil, Iraq', 12, '11:00 AM - 03:00 PM', 45000),
            (4,'Ali', 'Al-Saadi', 'ali.saadi@example.com', 'password123', 'Orthopedic Surgeon', '+9647504567890', 'Najaf, Iraq', 20, '08:00 AM - 12:00 PM', 60000),
            (5,'Leila', 'Al-Taha', 'leila.taha@example.com', 'password123', 'Gynecologist', '+9647505678901', 'Mosul, Iraq', 8, '01:00 PM - 05:00 PM', 35000),
            (1,'Omar', 'Al-Farouq', 'omar.farouq@example.com', 'password123', 'Neurologist', '+9647506789012', 'Karbala, Iraq', 18, '10:00 AM - 04:00 PM', 55000),
            (2,'Sara', 'Al-Majid', 'sara.majid@example.com', 'password123', 'Psychiatrist', '+9647507890123', 'Sulaymaniyah, Iraq', 7, '02:00 PM - 06:00 PM', 30000),
            (3,'Hassan', 'Al-Rashid', 'hassan.rashid@example.com', 'password123', 'General Surgeon', '+9647508901234', 'Kirkuk, Iraq', 14, '09:00 AM - 03:00 PM', 50000),
            (4,'Amina', 'Al-Nouri', 'amina.nouri@example.com', 'password123', 'Dentist', '+9647509012345', 'Duhok, Iraq', 9, '08:00 AM - 01:00 PM', 40000),
            (5,'Khalid', 'Al-Zahra', 'khalid.zahra@example.com', 'password123', 'ENT Specialist', '+9647500123456', 'Ramadi, Iraq', 11, '12:00 PM - 04:00 PM', 45000);
    `, (err) => {
    if (err) console.error('Error inserting doctors:', err.message);
  });

  db.run(`
        INSERT INTO hospitals (name, city, services, address)
        VALUES
            ('Erbil General Hospital', 'Erbil', 'Cardiology, Pediatrics, Surgery', '123 Main Street, Erbil'),
            ('Sulaymaniyah Medical Center', 'Sulaymaniyah', 'Dermatology, Orthopedics, Gynecology', '456 Health Avenue, Sulaymaniyah'),
            ('Kirkuk City Hospital', 'Kirkuk', 'Neurology, Psychiatry, ENT', '789 Wellness Road, Kirkuk'),
            ('Baghdad Central Hospital', 'Baghdad', 'Cardiology, Surgery, Pediatrics', '101 Healing Boulevard, Baghdad'),
            ('Basra Health Hub', 'Basra', 'Dermatology, Gynecology, Dentistry', '202 Care Lane, Basra'),
            ('Najaf Specialty Clinic', 'Najaf', 'Orthopedics, Neurology, ENT', '303 Recovery Street, Najaf'),
            ('Mosul General Hospital', 'Mosul', 'Psychiatry, Surgery, Cardiology', '404 Hope Avenue, Mosul');
    `, (err) => {
    if (err) console.error('Error inserting hospitals:', err.message);
  });
});
module.exports = db;