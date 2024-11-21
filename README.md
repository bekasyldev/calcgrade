# 📊 Student Grade Calculator

## 🌟 Project Overview

A student-friendly web application designed to help students calculate and track their course grades seamlessly. The app provides a flexible grading system that adapts to different course structures and tracking periods.

## ✨ Features

- Dynamic grade tracking for multiple course variants
- Support for different course structures (Lecture/SRO/Practice/Lab)
- Checkpoint (Рубежка) grade calculation
- Responsive and intuitive user interface
- Real-time grade validation
- Weighted grade calculation

## 🚀 Technologies Used

- Next.js 13
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- Lucide React Icons

## 📋 Supported Course Variants

The app supports multiple course structures:
1. SRO/Practice
2. Lecture/SRO/Practice
3. Lecture/SRO/Lab/Practice
4. Lecture/SRO/Lab

## 🔢 Grading Logic

- Supports multiple input types: 
  - Numeric grades (0-100)
  - `н` (absent)
  - `н.п` (not allowed)
- Calculates weighted averages based on course structure
- Provides overall course rating

## 💻 How to Use

1. Select your course variant
2. Choose the week range (1-7 or 8-15)
3. Enter grades for each component
4. Input midterm checkpoint grade
5. Click "Calculate" to see your overall rating

## 📝 Input Guidelines

- Enter grades between 0-100
- Use `н` for absent
- Use `н.п` for not allowed
- Fill all fields before calculating

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
