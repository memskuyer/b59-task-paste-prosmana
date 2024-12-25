var arr = [];

let lcProject = JSON.parse(localStorage.getItem("project") || "[]");
if (lcProject != []) {
  arr.push(...lcProject);
} else {
  submitForm();
}

const submitForm = (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let description = document.getElementById("description").value;

  let arrCheckbox = [];
  let checkBox = document.querySelectorAll("input[type=checkbox]:checked");
  for (let i = 0; i < checkBox.length; i++) {
    arrCheckbox.push(checkBox[i].value);
  }

  let imageUpload = document.getElementById("upload-images");
  let imagesInput = document.querySelector(`input[type=file]`);

  if (name == "") {
    return alert("name input Tidak Boleh Kosong");
  } else if (startDate == "") {
    return alert("Start date input Tidak Boleh Kosong");
  } else if (endDate == "") {
    return alert("End Date input Tidak Boleh Kosong");
  } else if (description == "") {
    return alert("description input Tidak Boleh Kosong");
  } else if (description.length <= 100) {
    return alert("description input harus 100 Huruf");
  } else if (arrCheckbox.length == 0) {
    return alert("pilih checkbox minimal 1");
  } else if (imageUpload.files.length == 0) {
    return alert("Images input Tidak Boleh Kosong");
  }

  let res = {
    author: "Papoy",
    name: name,
    startDate: startDate,
    endDate: endDate,
    description: description,
    checBox: arrCheckbox,
    images: imagesInput.files[0].name,
  };

  arr.push(res);
  localStorage.setItem("project", JSON.stringify(arr));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Berhasil Menambahkan project baru",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    location.reload();
    window.location.href = "#my-project";
  }, 2000);
};

const getStorage = () => {
  let projectList = document.getElementById("listProject");

  for (let i = 0; i < lcProject.length; i++) {
    let checkboxArr = [];
    lcProject[i].checBox.forEach((b) => {
      checkboxArr.push(b);
    });

    let dateStart = new Date(lcProject[i].startDate.replaceAll("-", "/"));
    let dateend = new Date(lcProject[i].endDate.replaceAll("-", "/"));

    let duration =
      dateend.getMonth() -
      dateStart.getMonth() +
      12 * (dateend.getFullYear() - dateStart.getFullYear());

    // console.log(duration);
    projectList.innerHTML += `
        <div id=${i} class="card">
        <img src="../../assets/images/${
          lcProject[i].images
        }" alt="" class="img-hero" />
        <h2>
        <a href="/project-detail?id=${i}&duration=${duration}" style="text-decoration:none; color:black">
        ${lcProject[i].name}
        </a>
        </h2>
        <p>Durasi: ${duration == 0 ? -1 : duration} Bulan | ${
      lcProject[i].author
    } </p>
        <p>
        ${lcProject[i].description}
        </p>
          <p>${checkboxArr}</p>
        <div class="btn-section-two">
        <button onclick="funcEdit()" class="btn-edit">edit</button>
        <button type="button" onclick="funcDelete(${i})" class="btn-delete">delete</button>
        </div>
        </div>
        </div>
        `;
  }
};

getStorage();

function funcEdit() {
  Swal.fire({
    title: "Fungsi Edit sedang dalam experiment",
    text: "Mohon bersabar.",
    imageUrl:
      "https://static4.depositphotos.com/1000899/288/i/450/depositphotos_2887376-stock-photo-mechanical-engineer.jpg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}

function funcDelete(id) {
  Swal.fire({
    title: "Function Delete sedang dalam experiment",
    text: "Mohon bersabar.",
    imageUrl:
      "https://static4.depositphotos.com/1000899/288/i/450/depositphotos_2887376-stock-photo-mechanical-engineer.jpg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}
