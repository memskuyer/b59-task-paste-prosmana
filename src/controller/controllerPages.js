const { SELECT } = require("sequelize/lib/query-types");
const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

const renderHome = (req, res) => {
  res.render("index");
};

const renderBlog = async (req, res) => {
  const query = `SELECT * FROM public."Blogs"`;
  const blog = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("blog", { data: blog });
};

const renderAddBlog = (req, res) => {
  res.render("add-blog");
};

const getDetailBlogId = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const blog = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log(blog);

  res.render("detail-blog", { data: blog[0] });
};

const getBlogId = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const blog = await sequelize.query(query, { type: QueryTypes.SELECT });
  console.log(blog);

  res.render("edit-blog", { data: blog[0] });
};

const editBlogWithId = async (req, res) => {
  const { id } = req.params;
  const img = req.query.image;

  let { title, content, images } = req.body;

  if (images == "") {
    images = img;
  }

  const query = `UPDATE public."Blogs" SET title = :title, content = :content, image = :images WHERE id = ${id}`;
  await sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: { title, content, images },
  });
  res.redirect("/blog");
};

const deleteBlog = async (req, res) => {
  const { index } = req.params;
  const query = `DELETE FROM public."Blogs" WHERE id = ${index}`;
  const blog = await sequelize.query(query, { type: QueryTypes.DELETE });
  console.log(blog);

  res.redirect("/blog");
};

const addBlog = async (req, res) => {
  const { title, content, images } = req.body;

  try {
    if (title.length == 0) {
      return res.render("add-blog", {
        titlemessage: "Title Tidak Boleh Kosong",
      });
    }
    const query = `INSERT INTO public."Blogs" (title, content, image) VALUES ( :title, :content, :images)`;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: { title, content, images },
    });

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
    res.redirect("/add-blog");
  }
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
  contact,
  testimonial,
  notfound,
  addBlog,
};
