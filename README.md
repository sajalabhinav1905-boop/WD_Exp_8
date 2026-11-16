# Experiment 8 - Book Collection RESTful API

**Author:** Sajal Mishra  
**Institution:** JSS University, Noida  
**Specialization:** B.Tech Computer Science & Engineering (Data Science)  
**GitHub:** [sajalabhinav1905-boop](https://github.com/sajalabhinav1905-boop)

---

## 📌 Overview
This repository contains Experiment 8 of the Web Development Lab curriculum:
- Backend RESTful API built with **Node.js** and **Express.js**.
- Complete implementation of CRUD (Create, Read, Update, Delete) operations for a book collection.
- Endpoints adhering to standard HTTP verbs and status codes:
  - `GET /api/books` - Retrieve all books (with optional genre filtering).
  - `GET /api/books/:id` - Fetch single book details by ID.
  - `POST /api/books` - Create and add a new book (validates title and author).
  - `PUT /api/books/:id` - Update an existing book record.
  - `DELETE /api/books/:id` - Remove a book from the collection.
- Includes interactive API testing client in `index.html` for GitHub Pages deployment.

---

## 🚀 Running the Server Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the Express server
npm start
# Server will run on http://localhost:3000
```
