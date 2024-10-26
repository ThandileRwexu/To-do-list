document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    tasks.forEach(task => createTaskElement(task));

    
    addBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                id: Date.now()
            };
            tasks.push(task);
            saveTasks();
            createTaskElement(task);
            taskInput.value = "";
        }
    });

    
    function createTaskElement(task) {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.dataset.id = task.id;

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", toggleTask);

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", editTask);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.addEventListener("click", deleteTask);

        li.append(span, editBtn, deleteBtn);
        taskList.appendChild(li);
    }

   
    function toggleTask(e) {
        const taskId = e.target.parentElement.dataset.id;
        const task = tasks.find(t => t.id == taskId);
        task.completed = !task.completed;
        saveTasks();
        e.target.parentElement.classList.toggle("completed");
    }

    
    function editTask(e) {
        const taskId = e.target.parentElement.dataset.id;
        const task = tasks.find(t => t.id == taskId);
        const newText = prompt("Edit your task:", task.text);
        if (newText) {
            task.text = newText;
            saveTasks();
            e.target.parentElement.querySelector("span").textContent = newText;
        }
    }

  
    function deleteTask(e) {
        const taskId = e.target.parentElement.dataset.id;
        tasks = tasks.filter(t => t.id != taskId);
        saveTasks();
        e.target.parentElement.remove();
    }

   
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
