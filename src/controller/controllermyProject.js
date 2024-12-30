const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

const renderMyproject = async (req, res) => {
  const query = `SELECT * FROM public.myprojects`;
  const fields = await sequelize.query(query, { type: QueryTypes.SELECT });

  // console.log(fields);

  res.render("task/MyProject", { data: fields });
};

const renderAddProject = (req, res) => {
  res.render("task/addmyproject");
};

const postMyproject = async (req, res) => {
  const { name, startDate, endDate, description, images } = req.body;
  const { nodejs, reactjs, nextjs, typescript } = req.body;

  try {
    if (name.length == 0) {
      return res.redirect("addnewproject");
    }

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

    const query = `INSERT INTO public."myprojects" (title, "startDate", "endDate", description, technology, image) VALUES ('${name}', '${startDate}', '${endDate}', '${description}', '${checkBox}', '${images}' )`;

    const ress = await sequelize.query(query, { type: QueryTypes.INSERT });
    console.log(ress);

    res.redirect("MyProject#my-project");
  } catch (error) {
    res.redirect("/addnewproject");
  }
};

const renderEditProject = async (req, res) => {
  const { id } = req.params;
  const tch = req.query.tech;
  console.log(tch);
  const query = `SELECT * FROM public.myprojects WHERE id = ${id}`;
  const fields = await sequelize.query(query, { type: QueryTypes.SELECT });

  const tech = fields[0].technology;

  const node = tech.includes("NodeJs");
  const next = tech.includes("NextJs");
  const react = tech.includes("ReactJs");
  const typescript = tech.includes("TypeScript");
  res.render("task/editmyproject", {
    data: fields[0],
    node,
    next,
    react,
    typescript,
  });
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const img = req.query.image;

  let { name, startDate, endDate, description, images } = req.body;
  const { nodejs, reactjs, nextjs, typescript } = req.body;

  if (images == "") {
    images = img;
  }
  console.log("Ini imagenya:", images);
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
  const query = `UPDATE public.myprojects SET title='${name}', "startDate"='${startDate}', "endDate"='${endDate}', description='${description}', technology='${checkBox}', image='${images}' WHERE id = ${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/MyProject#my-project");
};

const deleteMyProject = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM public.myprojects WHERE id = ${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/MyProject");
};

const renderDetailProject = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM public.myprojects WHERE id = ${id}`;
  const ress = await sequelize.query(query, { type: QueryTypes.SELECT });

  let tech = ress[0].technology;
  console.log(tech.split(" ").join());

  let arrImg = [];

  for (let i = 0; i < tech.length; i++) {
    if (tech[i].includes("ReactJs")) {
      arrImg.push("atom.png");
    } else if (tech[i].includes("NodeJs")) {
      arrImg.push("nodejs.png");
    } else if (tech[i].includes("NextJs")) {
      arrImg.push("nextjs.png");
    } else if (tech[i].includes("TypeScript")) {
      arrImg.push("typescript.png");
    }
  }

  console.log(arrImg);

  res.render("task/project-detail", {
    data: ress[0],
    img: arrImg,
  });
};

module.exports = {
  renderMyproject,
  postMyproject,
  deleteMyProject,
  renderDetailProject,
  renderAddProject,
  renderEditProject,
  editProject,
};
