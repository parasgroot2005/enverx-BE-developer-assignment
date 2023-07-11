//token to be used for authorization
const token = localStorage.getItem("token");


const createTaskBtn = document.getElementById("create-form");
createTaskBtn.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const createdAt = document.getElementById("createdAt").value;
  const updatedAt = document.getElementById("updatedAt").value;
  const tags = document.getElementById("tags").value;
  const isPublished = document.getElementById("isPublished").value;
  const views = document.getElementById("views").value;

  const blog = {
    title,
    author,
    content,
    createdAt,
    updatedAt,
    tags,
    isPublished,
    views,
  };

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Blog created successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error creating Blog. Please try again later.");
    });
});