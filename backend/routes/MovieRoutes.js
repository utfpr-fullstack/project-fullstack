const router = require("express").Router();
const MovieController = require("../controllers/MovieController");

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/save", verifyToken, imageUpload.array('images'), MovieController.create)
router.get("/", MovieController.getAll)
router.get("/myMovies", verifyToken, MovieController.getAllUserMovies)
router.get("/myRentals", verifyToken, MovieController.getAllUserRentals)
router.get("/:id", MovieController.getMovieById)
router.delete("/:id", verifyToken, MovieController.deleteMovieById)
router.patch("/:id", verifyToken, imageUpload.array('images'), MovieController.updateMovie)
router.patch("/doRent/:id", verifyToken, MovieController.doRent)

module.exports = router;