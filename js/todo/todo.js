const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", addTask);

function addTask(){

    const text = taskInput.value;

    if(text === "") return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    renderTasks();

    taskInput.value = "";
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${task.text}
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);

    });

}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
}