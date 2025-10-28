-- Mock data for demo purposes
-- Use the database
USE edusamagra_db;

-- 1. Create a demo institution
INSERT INTO institutions (name, type, state, district) 
VALUES ('National Institute of Technology, Demo', 'University', 'Delhi', 'New Delhi');

-- Get the ID of the inserted institution
SET @inst_id = LAST_INSERT_ID();

-- 2. Create users (Password for all is "password123")
-- Hashed using bcrypt.hashpw(b'password123', bcrypt.gensalt())
SET @pwhash = '$2b$12$Ea.AyE/fxOCfAM10sbnvS.L.PLw/JFNFj2Lg.6Y/iM8.muqPKOeQW';

-- Student User
INSERT INTO users (email, password_hash, role, institution_id) 
VALUES ('student@edu.in', @pwhash, 'student', @inst_id);
SET @student_user_id = LAST_INSERT_ID();

-- Teacher User
INSERT INTO users (email, password_hash, role, institution_id) 
VALUES ('teacher@edu.in', @pwhash, 'teacher', @inst_id);
SET @teacher_user_id = LAST_INSERT_ID();

-- Institution Admin User
INSERT INTO users (email, password_hash, role, institution_id) 
VALUES ('institution@edu.in', @pwhash, 'institution', @inst_id);

-- System Admin User
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@edu.in', @pwhash, 'admin');

-- 3. Create Student Profile
INSERT INTO students (user_id, full_name, course, current_semester, overall_gpa, attendance_percentage) 
VALUES (@student_user_id, 'Rohan Kumar', 'B.Tech CSE', 4, 8.5, 78.0);
SET @student_id = LAST_INSERT_ID();

-- 4. Create Teacher Profile
INSERT INTO teachers (user_id, full_name, subject, avg_feedback) 
VALUES (@teacher_user_id, 'Dr. Priya Sharma', 'Data Structures', 4.5);
SET @teacher_id = LAST_INSERT_ID();

-- 5. Add Academic Records for the student
INSERT INTO records (student_id, semester, gpa, attendance) VALUES
(@student_id, 1, 8.2, 90.0),
(@student_id, 2, 8.8, 85.0),
(@student_id, 3, 8.5, 75.0);
-- (Current semester 4 data is in the main profile)

-- 6. Add Teacher Qualifications
INSERT INTO teacher_qualifications (teacher_id, degree, university, year_completed) VALUES
(@teacher_id, 'Ph.D. in Computer Science', 'IIT Delhi', 2018),
(@teacher_id, 'M.Tech in AI', 'IIT Bombay', 2014);

-- 7. Add Institution Events
INSERT INTO events (institution_id, title, description, event_date) VALUES
(@inst_id, 'Innovate 2025 Hackathon', 'Annual inter-college hackathon.', CURDATE() + INTERVAL 10 DAY),
(@inst_id, 'Guest Lecture on AI', 'Talk by industry expert on GenAI.', CURDATE() + INTERVAL 5 DAY);

-- 8. Add Timetable Entries
INSERT INTO timetables (institution_id, class_name, teacher_id, subject, day_of_week, start_time, end_time) VALUES
(@inst_id, 'B.Tech CSE - Sem 4', @teacher_id, 'Data Structures', 'Monday', '10:00:00', '11:00:00'),
(@inst_id, 'B.Tech CSE - Sem 4', @teacher_id, 'Data Structures', 'Wednesday', '11:00:00', '12:00:00');

-- 9. Add Government Schemes
INSERT INTO schemes (name, description, status) VALUES
('Digital India Scholarship', 'Scholarship for students in tech fields.', 'active'),
('Samagra Shiksha', 'Integrated scheme for school education.', 'active'),
('SWAYAM', 'Online learning platform courses.', 'active');