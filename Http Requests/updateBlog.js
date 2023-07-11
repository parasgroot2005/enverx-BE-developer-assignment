//token to be used for authorization
const token = localStorage.getItem("token");


const updateTaskBtn = document.getElementById("update-form");
updateTaskBtn.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const createdAt = document.getElementById("createdAt").value;
  const updatedAt = document.getElementById("updatedAt").value;
  const tags = document.getElementById("tags").value;
  const isPublished = document.getElementById("isPublished").value;
  const views = document.getElementById("views").value;

  fetch(`http://localhost:3000/posts/:id`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      author: author,
      content:content,
      createdAt:createdAt,
      updatedAt:updatedAt,
      tags:tags,
      isPublished:isPublished,
      views:views,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Task updated successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error updating task. Please try again later.");
    });
});