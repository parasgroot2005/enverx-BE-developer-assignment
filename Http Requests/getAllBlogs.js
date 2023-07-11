const token = localStorage.getItem("token");

fetch("http://localhost:3000/posts"),
  {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#data-table-body");

      data.forEach((item) => {
        const row = document.createElement("tr");

        const title = document.createElement("td");
        title.textContent = item.title;
        row.appendChild(title);

        const author = document.createElement("td");
        author.textContent = item.author;
        row.appendChild(author);

        const content = document.createElement("td");
        content.textContent = item.content;
        row.appendChild(content);

        const createdAt = document.createElement("td");
        createdAt.textContent = item.createdAt;
        row.appendChild(createdAt);

        const updatedAt = document.createElement("td");
        updatedAt.textContent = item.updatedAt;
        row.appendChild(updatedAt);

        const tags = document.createElement("td");
        tags.textContent = item.tags;
        row.appendChild(tags);

        const isPublished = document.createElement("td");
        isPublished.textContent = item.isPublished;
        row.appendChild(isPublished);

        const views = document.createElement("td");
        views.textContent = item.views;
        row.appendChild(views);

        tableBody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error(err);
    });