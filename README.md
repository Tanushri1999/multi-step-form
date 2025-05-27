# 🧾 Multi-Step User Profile Update Form (MERN Stack)

This is a full-stack MERN project that implements a **Multi-Step User Profile Update Form** with both **frontend and backend validation** (no third-party validation libraries used). The form supports dynamic fields, real-time API checks, conditional logic, file uploads, and secure password updates.

## 🚀 Live Demo

🔗 [Frontend Live on Vercel](https://multi-step-form-y8c3.vercel.app/)  
🔗 [Backend Live on Render](https://multi-step-form-1-nk2w.onrender.com)



---

## 📌 Features

-  Multi-Step Form with navigation & summary
-  Frontend & backend validation (manual, no libraries)
-  File upload (JPG/PNG, ≤ 2MB) with preview
-  Real-time username availability check
-  Password strength meter & secure password update
-  Dynamic fields (e.g., Gender = "Other", Profession = "Entrepreneur")
-  Dynamic country-state-city fields via API
-  MongoDB integration to save user profile
-  CORS configured for secure cross-origin requests

---

## 🧩 Tech Stack

**Frontend:** React, Tailwind CSS, React Hooks (`useForm`, `useState`, `useEffect`)  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Deployment:** Vercel (Frontend), Render (Backend)

---

## 🗂️ Folder Structure


---

## 📋 Form Fields & Validations

| #  | Field               | Type       | Validation Rules                                               |
|----|--------------------|------------|----------------------------------------------------------------|
| 1  | Profile Photo       | File Upload | JPG/PNG, ≤ 2MB, Required                                       |
| 2  | Username            | Text       | Unique, 4-20 chars, no spaces                                  |
| 3  | Current Password    | Password   | Required if changing password                                  |
| 4  | New Password        | Password   | 8+ chars, 1 special char, 1 number                             |
| 5  | Profession          | Dropdown   | Options: Student, Developer, Entrepreneur                     |
| 6  | Company Name        | Text       | Required if Profession = "Entrepreneur"                       |
| 7  | Address Line 1      | Text       | Required                                                      |
| 8  | Country             | Dropdown   | Dynamic from DB (API)                                         |
| 9  | State               | Dropdown   | Dependent on Country                                          |
| 10 | City                | Dropdown   | Dependent on State                                            |
| 11 | Subscription Plan   | Radio Btn  | Options: Basic, Pro, Enterprise                               |
| 12 | Newsletter          | Checkbox   | Default checked                                               |

---

## 🔐 Backend API Endpoints

- `GET /api/user/check-username?username=xyz`
- `GET /api/user/countries`
- `GET /api/user/states/:country`
- `GET /api/user/cities/:country/:state`
- `POST /api/user/save` 

---



