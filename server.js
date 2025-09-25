// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const bodyParser = require("body-parser");
// const path = require("path");
// require("dotenv").config();

// const bookRoutes = require("./routes/bookRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // ✅ Connect to MongoDB Atlas using env variable
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB error:", err));

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: process.env.SESSION_SECRET || "library-secret", // ✅ use env for security
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URI, // ✅ store sessions in Atlas
//   }),
// }));

// // Set view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // Routes
// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.use(authRoutes);

// // Protect book routes unless logged in
// app.use((req, res, next) => {
//   if (!req.session.userId && req.path !== "/login" && req.path !== "/signup") {
//     return res.redirect("/login");
//   }
//   next();
// });

// // Book-related routes
// app.use("/", bookRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "library-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("index"));
app.use(authRoutes);

// Protect book routes unless logged in
app.use((req, res, next) => {
  if (!req.session.userId && req.path !== "/login" && req.path !== "/signup") {
    return res.redirect("/login");
  }
  next();
});
app.use("/", bookRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

