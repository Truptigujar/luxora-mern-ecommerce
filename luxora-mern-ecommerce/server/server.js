require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const newsletterRoutes = require("./routes/newsletter");
const contactRoutes = require("./routes/contact");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("LUXORA API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 LUXORA server running on http://localhost:${PORT}`));
