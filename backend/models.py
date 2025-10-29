# SQLAlchemy database models
from database import db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class Institution(db.Model):
    __tablename__ = 'institutions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Enum('University', 'College', 'School'), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    users = db.relationship('User', backref='institution', lazy=True)
    events = db.relationship('Event', backref='institution', lazy=True)
    timetables = db.relationship('Timetable', backref='institution', lazy=True)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('student', 'teacher', 'institution', 'admin'), nullable=False)
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=True)
    student = db.relationship('Student', backref='user', uselist=False, lazy=True, cascade="all, delete-orphan")
    teacher = db.relationship('Teacher', backref='user', uselist=False, lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    course = db.Column(db.String(100))
    current_semester = db.Column(db.Integer, default=1)
    overall_gpa = db.Column(db.Numeric(3, 2), default=0.00)
    attendance_percentage = db.Column(db.Numeric(5, 2), default=100.00)
    records = db.relationship('Record', backref='student', lazy=True, cascade="all, delete-orphan")
    
    # --- Relationships for Portfolio ---
    portfolio_projects = db.relationship('PortfolioProject', back_populates='student', lazy=True, cascade="all, delete-orphan")
    skills = db.relationship('StudentSkill', back_populates='student', lazy=True, cascade="all, delete-orphan")
    links = db.relationship('StudentLink', back_populates='student', lazy=True, cascade="all, delete-orphan")

class Teacher(db.Model):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(100))
    avg_feedback = db.Column(db.Numeric(3, 2), default=0.00)
    qualifications = db.relationship('TeacherQualification', backref='teacher', lazy=True, cascade="all, delete-orphan")

class Record(db.Model):
    __tablename__ = 'records'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    semester = db.Column(db.Integer, nullable=False)
    gpa = db.Column(db.Numeric(3, 2), nullable=False)
    attendance = db.Column(db.Numeric(5, 2), nullable=False)

class Scheme(db.Model):
    __tablename__ = 'schemes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.Enum('active', 'inactive'), default='active')

class AIInsight(db.Model):
    __tablename__ = 'ai_insights'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=True)
    insight_type = db.Column(db.String(100), nullable=False)
    risk_level = db.Column(db.Enum('low', 'medium', 'high', 'N/A'), default='N/A')
    confidence = db.Column(db.Numeric(5, 2), default=0.00)
    prediction_text = db.Column(db.Text)

class TeacherQualification(db.Model):
    __tablename__ = 'teacher_qualifications'
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    degree = db.Column(db.String(100), nullable=False)
    university = db.Column(db.String(255), nullable=False)
    year_completed = db.Column(db.Integer)

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    event_date = db.Column(db.Date, nullable=False)

class Timetable(db.Model):
    __tablename__ = 'timetables'
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    class_name = db.Column(db.String(100), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=True)
    subject = db.Column(db.String(100), nullable=False)
    day_of_week = db.Column(db.Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

class PortfolioProject(db.Model):
    __tablename__ = 'portfolio_projects'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    project_link = db.Column(db.String(500), nullable=True)
    tags = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    student = db.relationship('Student', back_populates='portfolio_projects')

# --- NEW TABLES FOR SKILLS AND LINKS ---

class StudentSkill(db.Model):
    __tablename__ = 'student_skills'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    skill_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=True) # e.g., "Technical", "Soft Skill"
    
    student = db.relationship('Student', back_populates='skills')

class StudentLink(db.Model):
    __tablename__ = 'student_links'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False) # e.g., "GitHub", "LinkedIn"
    url = db.Column(db.String(500), nullable=False)
    
    student = db.relationship('Student', back_populates='links')