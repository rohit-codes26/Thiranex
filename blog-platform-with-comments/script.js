const publishBtn = document.getElementById("publishBtn");
const blogContainer = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function saveBlogs(){
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function displayBlogs(filteredBlogs = blogs){

  blogContainer.innerHTML = "";

  filteredBlogs.reverse().forEach((blog,index)=>{

    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    blogCard.innerHTML = `
      <h2>${blog.title}</h2>
      <p>${blog.content}</p>

      <div class="actions">
        <button class="like-btn">
          ❤️ ${blog.likes}
        </button>
      </div>

      <div class="comment-box">
        <input type="text" placeholder="Write comment..." id="commentInput-${index}">
        <button onclick="addComment(${index})">Add Comment</button>
      </div>

      <div class="comments">
        ${blog.comments.map(c=>`
          <div class="comment">${c}</div>
        `).join("")}
      </div>
    `;

    const likeBtn = blogCard.querySelector(".like-btn");

    likeBtn.addEventListener("click",()=>{

      blog.likes++;
      saveBlogs();
      displayBlogs();
    });

    blogContainer.appendChild(blogCard);
  });
}

publishBtn.addEventListener("click",()=>{

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if(title === "" || content === ""){
    alert("Please fill all fields");
    return;
  }

  const newBlog = {
    title,
    content,
    likes:0,
    comments:[]
  };

  blogs.push(newBlog);

  saveBlogs();
  displayBlogs();

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
});

function addComment(index){

  const input = document.getElementById(`commentInput-${index}`);

  if(input.value.trim() === "") return;

  blogs.reverse()[index].comments.push(input.value);

  blogs.reverse();

  saveBlogs();
  displayBlogs();
}

searchInput.addEventListener("input",(e)=>{

  const value = e.target.value.toLowerCase();

  const filtered = blogs.filter(blog=>
    blog.title.toLowerCase().includes(value) ||
    blog.content.toLowerCase().includes(value)
  );

  displayBlogs(filtered);
});

displayBlogs();
