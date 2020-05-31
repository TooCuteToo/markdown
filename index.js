const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

const Article = require("./model/article");

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createAt: "desc" });
  res.render("articles/index", { articles });
});

app.use("/articles", articlesRouter);

app.listen(5000);
