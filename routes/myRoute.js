const Router = require("express");
const myController = require("../controllers/myController.js");

const router = Router();

router.get("/", myController.get_index); 
router.get("/login", myController.get_login); 
router.post("/auth", myController.post_login); 
router.get("/logout", myController.get_logout); 

module.exports = router;