const token = localStorage.getItem("token");

const deleteForm = document.getElementById("button");
deleteForm.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`http://localhost:3000/posts/:id`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Task deleted successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error deleting task. Please try again later.");
    });
});