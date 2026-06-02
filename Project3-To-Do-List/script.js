const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskDate =document.getElementById("taskDate");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const progressPercent = document.getElementById("progressPercent");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearAll = document.getElementById("clearAll");
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
if(savedTheme === "dark"){
    document.body.classList.add(
        "dark-mode"
    );
    themeBtn.textContent = "Light Mode";
}
displayTasks();
addBtn.addEventListener("click", addTask);
clearAll.addEventListener("click", function(){
    tasks = [];
    saveTasks();
    displayTasks();
});
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }
    tasks.push({
        text: taskText,
        date: taskDate.value,
        completed: false
    });    
    saveTasks();
    taskInput.value = "";
    displayTasks();
}
function displayTasks(filter = "all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }
    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    if (filteredTasks.length === 0) {
        taskList.innerHTML =
        "<p class='empty'>📝 No tasks yet! Add your first task.</p>";
        updateStats();
        return;
    }
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        if (task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <div>
                <span>${task.text}</span>
                <br>
                <small>${task.date}</small>
            </div>
            <div class="task-buttons">
                <button class="complete-btn">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        const completeBtn = li.querySelector(".complete-btn");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        completeBtn.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            displayTasks(filter);
        });
        editBtn.addEventListener("click", function(){
            let updatedTask = prompt("Edit Task", task.text);
            if(updatedTask){
                task.text = updatedTask;
                saveTasks();
                displayTasks(filter);
            }
        });
        deleteBtn.addEventListener("click", function () {
            if(confirm("Are you sure you want to delete this task?")){
                tasks.splice(index, 1);
                saveTasks();
                displayTasks(filter);
            }
        });
        taskList.appendChild(li);
    });
    updateStats();
}
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed/total)*100);
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    progressPercent.textContent = progress + "%";
}
function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );
        button.classList.add("active");
        const filter = button.dataset.filter;
        displayTasks(filter);
    });
});
themeBtn.addEventListener("click", function(){
        document.body.classList.toggle(
            "dark-mode"
        );
        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){
            localStorage.setItem(
                "theme", "dark"
            );
            themeBtn.textContent = "Light Mode";
        }
        else{
            localStorage.setItem(
                "theme", "light"
            );
            themeBtn.textContent = "Dark Mode";
        }
    }
);
