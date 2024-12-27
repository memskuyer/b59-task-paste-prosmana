let arrBelajar = [];
let datas = [];

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

let arr = [];
const renderMyproject = (req, res) => {
  let getlocalStorage = JSON.parse(localStorage.getItem("project") || "[]");
  if (arr == "") {
    arr.push(...getlocalStorage);
  }
  res.render("task/MyProject", { data: getlocalStorage });
};

const postMyproject = (req, res) => {
  const { name, startDate, endDate, description, images } = req.body;
  const { nodejs, reactjs, nextjs, typescript } = req.body;

  let checkBox = [];
  if (nodejs) {
    checkBox.push(nodejs);
  }
  if (reactjs) {
    checkBox.push(reactjs);
  }
  if (nextjs) {
    checkBox.push(nextjs);
  }
  if (typescript) {
    checkBox.push(typescript);
  }

  let data = {
    author: "Papoy",
    projectName: name,
    startDate: startDate,
    endDate: endDate,
    description: description,
    checkBox: checkBox,
    images: images,
  };
  // let getlocalStorage = JSON.parse(localStorage.getItem("project") || "[]");
  arr.push(data);
  localStorage.setItem("project", JSON.stringify(arr));
  res.render("task/MyProject", { data: arr });
};

const deleteMyProject = (req, res) => {
  const { index } = req.params;
  let getlocalStorage = JSON.parse(localStorage.getItem("project") || "[]");

  getlocalStorage.splice(index, 1);
  localStorage.setItem("project", JSON.stringify(getlocalStorage));
  res.redirect("/MyProject");
};

const renderDetailProject = (req, res) => {
  const index = req.params.index;
  let getlocalStorage = JSON.parse(localStorage.getItem("project") || "[]");
  let cb = getlocalStorage[index].checkBox;

  let arrImg = [];
  for (let i = 0; i < cb.length; i++) {
    if (cb[i].includes("ReactJs")) {
      arrImg.push("atom.png");
    } else if (cb[i].includes("NodeJs")) {
      arrImg.push("nodejs.png");
    } else if (cb[i].includes("NextJs")) {
      arrImg.push("nextjs.png");
    } else if (cb[i].includes("TypeScript")) {
      arrImg.push("typescript.png");
    }
  }

  res.render("task/project-detail", {
    data: getlocalStorage[index],
    img: arrImg,
  });
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
  deleteMyProject,
  renderDetailProject,
  contact,
  testimonial,
  notfound,
  addBlog,
};
