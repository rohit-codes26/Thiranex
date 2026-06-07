const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("neoTasks")) || [];

let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("neoTasks", JSON.stringify(tasks));
}

function updateStats(){

    totalTasks.innerText = tasks.length;

    completedTasks.innerText = tasks.filter(task => task.completed).length;
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "completed") return task.completed;

        if(currentFilter === "pending") return !task.completed;

        return true;
    });

    const searchText = searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(searchText)
    );

    filteredTasks.forEach((task,index)=>{

        const card = document.createElement("div");

        card.className = `task-card ${task.completed ? "completed" : ""}`;

        card.innerHTML = `
            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <h3>${task.text}</h3>

            <p>📅 ${task.date || "No Date"}</p>

            <div class="task-actions">

                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        const completeBtn = card.querySelector(".complete-btn");

        const deleteBtn = card.querySelector(".delete-btn");

        completeBtn.addEventListener("click", ()=>{

            task.completed = !task.completed;

            saveTasks();

            renderTasks();
        });

        deleteBtn.addEventListener("click", ()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();
        });

        taskList.appendChild(card);
    });

    updateStats();
}

addTaskBtn.addEventListener("click", ()=>{

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        text:text,
        priority:priorityInput.value,
        date:taskDate.value,
        completed:false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskDate.value = "";
});

document.querySelectorAll(".filter").forEach(button=>{

    button.addEventListener("click", ()=>{

        document.querySelectorAll(".filter").forEach(btn=>{
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

searchInput.addEventListener("input", renderTasks);

themeToggle.addEventListener("click", ()=>{

    document.body.classList.toggle("light-mode");
});

renderTasks();
