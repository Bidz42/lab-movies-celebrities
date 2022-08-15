const router = require("express").Router();
const app= require("../app")
const Movie= require("../models/Movie.model")
const Celebrity= require("../models/Celebrity.model");

router.route("/create")
  .get((req, res) => {
      Celebrity.find()
      .then((celebrities) => {res.render("movies/new-movie", { celebrities });
      })
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => res.redirect("/movies/movies"))
      .catch((err) => res.render("movies/new-movie"));
});

router.get("/movies", (req, res) => {
    Movie.find()
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((err) => {
        console.log((err))
        res.redirect("/movies/movies")
    })
});

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movies) => res.render("movies/movie-details", { movies }))
    .catch((err) => console.log(err))
});

router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies/movies"))
    .catch((err) => console.log(err))
});

router.route("/:id/edit")
    .get((req, res) => {
        const { id } = req.params;
    Movie.findById(id)
    .populate("cast")
    .then((movie) =>{
    Celebrity.find()
    .then((celebrities) => {res.render("movies/edit-movie", {
        movies: movie,
        celebrities: {celebrities}
    })
    })
    })
})
.post((req, res) => {
const { id } = req.params;
const { title, genre, plot, cast } = req.body;
Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, {new:true})
.then(() => res.redirect(`/movies/movies`))
.catch((err) => console.log(err))
});

module.exports = router;
 
 
