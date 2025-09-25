const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
};

exports.addBookForm = (req, res) => {
  res.render("addBook");
};

exports.addBook = async (req, res) => {
  const { title, author, isbn } = req.body;
  await Book.create({ title, author, isbn });
  res.redirect("/");
};

// DELETE Book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.redirect("/");
};

exports.showAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render("allBooks", { books });
  } catch (err) {
    res.status(500).send("Error loading books");
  }
};
// SEARCH Book
exports.searchForm = (req, res) => {
  res.render("searchBook", { books: [] });
};

exports.searchBook = async (req, res) => {
  const { keyword } = req.body;
  const books = await Book.find({
    $or: [
      { title: new RegExp(keyword, "i") },
      { author: new RegExp(keyword, "i") },
      { isbn: new RegExp(keyword, "i") }
    ]
  });

// Show book details by ID
exports.bookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.send("Book not found");
    res.render("bookDetails", { book });
  } catch (err) {
    res.status(500).send("Error loading book details");
  }
};

// Search form page
exports.searchForm = (req, res) => {
  res.render("searchBook");
};

// Handle search request
exports.searchBook = async (req, res) => {
  const { title } = req.body;
  try {
    const book = await Book.findOne({ title });
    if (!book) return res.send("Book not found");
    res.redirect(`/book/${book._id}`);
  } catch (err) {
    res.status(500).send("Search error");
  }
};

  res.render("searchBook", { books });
};