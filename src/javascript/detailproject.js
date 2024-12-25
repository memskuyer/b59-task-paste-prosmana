const urlParams = new URLSearchParams(window.location.search).get("id");
const urlDuration = new URLSearchParams(window.location.search).get("duration");
console.log(urlDuration);

const getLocalStorage = JSON.parse(localStorage.getItem("project"));
const getData = getLocalStorage[urlParams];

let arrImg = [];

const testLogic = (data) => {
  const react = `<img
         src="../../assets/images/atom.png"
         alt="react"
         style="width: 50px"
         id="tech-image" />`;

  const nodejs = `<img
         src="../../assets/images/nodejs.png"
         alt="nodejs"
         style="width: 50px"
         id="tech-image" />`;

  const nextjs = `<img
         src="../../assets/images/nextjs.png"
         alt="nextjs"
         style="width: 50px"
         id="tech-image" />`;

  const typescript = `<img
         src="../../assets/images/typescript.png"
         alt="typescript"
         style="width: 50px"
         id="tech-image" />`;

  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("ReactJs")) {
      arrImg.push(react);
    } else if (data[i].includes("NodeJs")) {
      arrImg.push(nodejs);
    } else if (data[i].includes("NextJs")) {
      arrImg.push(nextjs);
    } else if (data[i].includes("TypeScript")) {
      arrImg.push(typescript);
    }
  }
};

const renderDetail = () => {
  let hero = document.getElementById("hero-content");
  testLogic(getData.checBox);
  hero.innerHTML = `
   <div class="content-one">
     <h1>${getData.name}</h1>
     <p>Author: ${getData.author} <br /><span style="font-size: 15px">Durasi: ${
    urlDuration == 0 ? -1 : urlDuration
  } Bulan</span></p>
     <p>${getData.description}</p>
     <p>Technology</p>
     <p>${arrImg}</p>
    </div>
    <div class="content-two">
        <img src="../../assets/images/${getData.images}" alt="${
    getData.name
  }" />
    </div>
  `;
};
renderDetail();
