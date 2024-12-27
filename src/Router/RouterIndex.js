const express = require("express");
const router = express.Router();

const controllerPage = require("../controller/controllerPages");

router.get("/", controllerPage.renderHome);

router.get("/blog", controllerPage.renderBlog);
router.get("/add-blog", controllerPage.renderAddBlog);
router.post("/blog", controllerPage.addBlog);
router.get("/detail-blog/:id", controllerPage.getDetailBlogId);
router.delete("/blog-delete/:index", controllerPage.deleteBlog);

router.get("/edit-blog/:id", controllerPage.getBlogId);
router.patch("/edit-blogs/:id", controllerPage.editBlogWithId);

router.get("/MyProject", controllerPage.renderMyproject);
router.post("/MyProject", controllerPage.postMyproject);
router.delete("/deleteMyProject/:index", controllerPage.deleteMyProject);
router.get("/project-detail/:index", controllerPage.renderDetailProject);

router.get("/contact", controllerPage.contact);
router.get("/testimonial", controllerPage.testimonial);

router.get("*", controllerPage.notfound);

module.exports = router;
