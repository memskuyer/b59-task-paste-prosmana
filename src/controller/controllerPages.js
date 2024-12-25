let arrBelajar = [];
const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

const renderHome = (req, res) => {
  res.render("index");
};

const renderBlog = async (req, res) => {
  const query = `SELECT * FROM public."Blogs"`;
  const blog = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("blog", { data: blog });
};

const deleteBlog = async (req, res) => {
  const { index } = req.params;
  const query = `DELETE FROM public."Blogs" WHERE id = ${index}`;
  const blog = await sequelize.query(query, { type: QueryTypes.DELETE });
  console.log(blog);

  res.redirect("/blog");
};

const addBlog = async (req, res) => {
  try {
    const { title, content, images } = req.body;

    const query = `INSERT INTO public."Blogs" (title, content, image) VALUES ( '${title}', '${content}', '${images}')`;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
    });

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
    res.redirect("/add-blog");
  }
};

const renderAddBlog = (req, res) => {
  res.render("add-blog");
};

const getDetailBlogId = async (req, res) => {
  res.render("detail-blog");
};

const getBlogId = async (req, res) => {
  res.render("edit-blog");
};

const editBlogWithId = async (req, res) => {
  res.redirect("/blog");
};

const renderMyproject = (req, res) => {
  res.render("task/MyProject");
};

const postMyproject = (req, res) => {
  res.render("/MyProject");
};

const renderDetailProject = (req, res) => {
  res.render("task/project-detail");
};
const contact = (req, res) => {
  res.render("contact");
};
const testimonial = (req, res) => {
  res.render("testimonial");
};

const notfound = (req, res) => {
  res.render("notfound");
};

module.exports = {
  renderHome,
  renderBlog,
  renderAddBlog,
  getDetailBlogId,
  getBlogId,
  editBlogWithId,
  deleteBlog,
  renderMyproject,
  postMyproject,
  renderDetailProject,
  contact,
  testimonial,
  notfound,
  addBlog,
};
