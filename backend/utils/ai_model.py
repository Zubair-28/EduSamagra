# Mock AI model logic placeholder
import random

def predict_student_risk(attendance, gpa):
    """
    Mock AI model for student risk prediction based on simple rules.
    """
    if attendance < 70 or gpa < 5.0:
        risk = "high"
        message = "High risk of failing. Attendance or GPA is critically low."
        confidence = random.uniform(0.8, 0.95)
    elif (attendance >= 70 and attendance < 80) or (gpa >= 5.0 and gpa < 6.5):
        risk = "medium"
        message = "Medium risk. Performance is average. Improvement recommended."
        confidence = random.uniform(0.6, 0.79)
    else:
        risk = "low"
        message = "Low risk. Student is performing well."
        confidence = random.uniform(0.85, 0.98)
    
    return {
        "risk_level": risk,
        "message": message,
        "confidence": round(confidence, 2)
    }

def predict_institution_rank(total_students, avg_gpa):
    """
    Mock AI model for institution ranking forecast.
    """
    # Simple mock logic
    if avg_gpa > 8.5 and total_students > 1000:
        prediction = "Predicted to improve in NIRF rankings by 5-10 spots."
        confidence = 0.75
    elif avg_gpa < 7.0:
        prediction = "At risk of dropping in NIRF rankings. Focus on academic quality."
        confidence = 0.6
    else:
        prediction = "Ranking expected to remain stable."
        confidence = 0.8
        
    return {
        "prediction_text": prediction,
        "confidence": confidence
    }

def predict_teacher_performance(avg_class_gpa, avg_feedback):
    """
    Mock AI model for teacher performance insight.
    """
    if avg_class_gpa > 8.0 and avg_feedback > 4.5:
        insight = "Excellent performance. High student outcomes and positive feedback."
        level = "high"
    elif avg_class_gpa > 7.0 and avg_feedback > 3.5:
        insight = "Good performance. Consistent results."
        level = "medium"
    else:
        insight = "Needs improvement. Review class performance and student feedback."
        level = "low"
        
    return {
        "insight_text": insight,
        "level": level
    }