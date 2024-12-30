const deleteAlert = (id) => {
  Swal.fire({
    title: "Apakah kamu yakin?",
    text: `Apakah kamu ingin mendelete data dengan id ${id}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ya,Hapus",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Berhasil dihapus",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        document.getElementById(
          "formDeletes"
        ).action = `/deleteMyProject/${id}?_method=DELETE`;
        document.getElementById("deletes").click();
      }, 1500);
    }
  });
};

const handleAddProject = () => {
  event.preventDefault();
  const form = event.target.form;

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    form.submit();
  }, 1500);
};

const alertEdit = () => {
  event.preventDefault();
  const form = event.target.form;

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    form.submit();
  }, 1500);
};
