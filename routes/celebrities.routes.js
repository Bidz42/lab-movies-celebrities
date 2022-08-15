const router = require("express").Router();
const app = require("../app")
const Celebrity = require("../models/Celebrity.model")

router.route("/create")
    .get((req, res)=> res.render("celebrities/new-celebrity"))
    .post((req, res) => {
        const { name, occupation, catchPhrase } = req.body;
        Celebrity.create({ name, occupation, catchPhrase })
    .then(()=>{res.redirect("/celebrities/celebrities")})
    .catch((err)=>res.render("celebrities/new-celebrity"))
});


router.get("/celebrities", (req, res) => {
  Celebrity.find()
  .then((celebrities) => res.render("celebrities/celebrities", {celebrities}))
  .catch((err) => {
      console.log ((err))
      res.redirect("/")
  })
});

//BONUS ITERATIONS
router.get("/:id", (req, res) => {
    Celebrity.findById(req.params.id)
    .then((celebrities) => res.render("celebrities/celebrity-details", { celebrities }))
    .catch((err) => console.log(err))
});

router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
    Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities/celebrities"))
    .catch((err) => console.log(err))
});

router.route("/:id/edit")
    .get((req, res) => {
        const { id } = req.params;
    Celebrity.findById(id)
    .then((celebrities) => {res.render("celebrities/edit-celebrity", {
        celebrities
    })}
    )})
    .post((req, res) => {
const { id } = req.params;
const { name, occupation, catchPhrase} = req.body;
Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase}, {new: true})
.then(() => res.redirect(`/celebrities/celebrities`))
.catch((err) => console.log(err))
});

module.exports = router;