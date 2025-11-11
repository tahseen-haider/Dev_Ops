# 🧪 Test Backend

## 📝 Overview

**Test Backend** is a straightforward **Node.js + Express** backend project designed for **learning and testing purposes**. It provides a set of API endpoints and is fully configured for both **unit** and **end-to-end (E2E) testing** using the **Jest** and **Supertest** libraries.

---

## ✨ Features

* **RESTful API** built with Express.js.
* **Rate limiting** implemented using the `express-rate-limit` middleware.
* Supports comprehensive automated testing with **Jest** and **Supertest**.
* Easy to start, debug, and extend for custom projects.

---

## 💻 Prerequisites

Before running the project, ensure you have the following installed on your system:

* **Node.js**: Version **>= 18.x**
* **npm**: Version **>= 9.x**

---

## 🛠️ Installation and Setup

### 1. Install Dependencies

```bash
npm install
# or
npm i
```
### 2. Run Server

```bash
npm run dev
```
### 2. Run Tests

```bash
npm test
```

 ## 🚀 API Routes Overview
 
 | Method | Route                 | Description |
 |--------|----------------------|-------------|
 | GET    | `/`                  | Check if the backend is running. |
 | GET    | `/api/getUsers`      | Fetch all users (rate-limited). |
 | GET    | `/api/getUser/:id`   | Fetch a specific user by ID. |
 | POST   | `/api/storeUser`     | Add a new user. |
 | PUT    | `/api/updateUser/:id`| Update an existing user. |
 | DELETE | `/api/deleteUser/:id`| Remove a user by ID. |
 
 > **Note:** Users are stored in-memory; all data will reset when the server restarts.
