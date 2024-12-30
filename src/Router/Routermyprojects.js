const express = require("express");
const router = express.Router();

const controllerPage = require("../controller/controllermyProject");

router.get("/MyProject", controllerPage.renderMyproject);
router.get("/addnewproject", controllerPage.renderAddProject);
router.get("/editProject/:id", controllerPage.renderEditProject);
router.get("/project-detail/:id", controllerPage.renderDetailProject);
router.post("/MyProject", controllerPage.postMyproject);
router.patch("/updateproject/:id", controllerPage.editProject);
router.delete("/deleteMyProject/:id", controllerPage.deleteMyProject);

module.exports = router;
