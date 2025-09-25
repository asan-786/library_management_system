const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const bookController = require("../controllers/bookController");

router.post("/add", async (req, res) => {
  const { title, author, isbn } = req.body;
  const book = await Book.create({ title, author, isbn });
  res.redirect(`/book/${book._id}`);
});


// Book detail page
router.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.send("Book not found");
  res.render("bookDetails", { book });
});

// Form to add book
router.get("/add", bookController.addBookForm);
router.post("/add", bookController.addBook);

// Home page showing all books
router.get("/", bookController.getAllBooks);

// SEARCH Routes
router.get("/search", bookController.searchForm);
router.post("/search", bookController.searchBook);

// DELETE Book
router.get("/delete/:id", bookController.deleteBook);
router.get("/books", bookController.showAllBooks);


// Export only once
module.exports = router;