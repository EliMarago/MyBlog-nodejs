import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))
let posts =[];

app.get("/", (req, res) => {
    res.render("home.ejs");
  });
  
  app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
  });

  app.post("/new-post", (req, res) => {
    const post = {
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(post);
    res.redirect("/");
  });
  app.get("/post/:id", (req, res) => {
    const post = posts[req.params.id];
    if (post) {
      res.render("post", { post: post });
    } else {
      res.status(404).send("Post not found");
    }
  });
app.listen(port,() =>{
    console.log(`Listening on port ${port}`);
})
