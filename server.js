// Experiment 8: Node.js & Express.js RESTful API for Book Collection
// Author: Sajal Mishra (JSS University, Noida)

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-Memory Book Collection Data Store
let books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Software Engineering",
    year: 2008
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Programming",
    year: 1999
  },
  {
    id: 3,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    genre: "Data Science & Systems",
    year: 2017
  },
  {
    id: 4,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    genre: "Artificial Intelligence",
    year: 2020
  }
];

// 1. GET /api/books - Retrieve all books
app.get('/api/books', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filtered = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
    return res.status(200).json({ success: true, count: filtered.length, data: filtered });
  }
  res.status(200).json({ success: true, count: books.length, data: books });
});

// 2. GET /api/books/:id - Retrieve a single book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ success: false, message: `Book with ID ${bookId} not found.` });
  }

  res.status(200).json({ success: true, data: book });
});

// 3. POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'title' and 'author' fields are required."
    });
  }

  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title: title.trim(),
    author: author.trim(),
    genre: genre ? genre.trim() : "General",
    year: year ? parseInt(year, 10) : new Date().getFullYear()
  };

  books.push(newBook);
  res.status(201).json({
    success: true,
    message: "Book successfully created.",
    data: newBook
  });
});

// 4. PUT /api/books/:id - Update an existing book
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: `Book with ID ${bookId} not found.` });
  }

  const { title, author, genre, year } = req.body;

  books[bookIndex] = {
    ...books[bookIndex],
    title: title ? title.trim() : books[bookIndex].title,
    author: author ? author.trim() : books[bookIndex].author,
    genre: genre ? genre.trim() : books[bookIndex].genre,
    year: year ? parseInt(year, 10) : books[bookIndex].year
  };

  res.status(200).json({
    success: true,
    message: `Book with ID ${bookId} successfully updated.`,
    data: books[bookIndex]
  });
});

// 5. DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const initialLength = books.length;
  books = books.filter(b => b.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ success: false, message: `Book with ID ${bookId} not found.` });
  }

  res.status(200).json({
    success: true,
    message: `Book with ID ${bookId} successfully removed.`
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`RESTful API endpoints available at http://localhost:${PORT}/api/books`);
});
