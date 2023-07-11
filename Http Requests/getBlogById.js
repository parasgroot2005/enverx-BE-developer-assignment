const token = localStorage.getItem("token");

document.getElementById("submit_btn").addEventListener("click", function () {
  const user_Id = document.getElementById("userId").value;
  fetch(`http://localhost:3000/posts/:id`),
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let taskData = document.getElementById("task_data");
        for (let i = 0; i < data.length; i++) {
          let row = taskData.insertRow(-1);
          let title = row.insertCell(0);
          let author = row.insertCell(1);
          let content= row.insertCell(2);
          let createdAt= row.insertCell(3);
          let updatedAt = row.insertCell(4);
          let tags = row.insertCell(5);
          let isPublished= row.insertCell(6);
          let views = row.insertCell(7);
          title.innerHTML = data[i].title;
          author.innerHTML = data[i].author;
          content.innerHTML = data[i].content;
          createdAt.innerHTML = data[i].createdAt;
          updatedAt.innerHTML = data[i].updatedAt;
          tags.innerHTML = data[i].tags;
          isPublished.innerHTML = data[i].isPublished;
          views.innerHTML = data[i].views;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
});