let Tasks = [];
let allMarked = false;

// const btn = document.getElementById('show-all')
// console.log(btn,'btn')

function getTasks(category = "") {
    if (category === "Active") 
    {
        return Tasks.filter(task => task.status === "Active");
    } 
    else if (category === "Completed") 
    {
        return Tasks.filter(task => task.status === "Completed");
    } 
    else 
    {
        return Tasks;
    }
}

function addTask(taskData) {
    Tasks.unshift(taskData);
    renderTasks();
}

function deleteTask(id) {
    Tasks = Tasks.filter(task => task.id !== id);
    // console.log('show');
    renderTasks();
}

function updateTask(id, name) {
    const task = Tasks.find(task => task.id === id);
    if (task) {
        task.name = name;
        renderTasks();
    }
}

function clearCompletedTasks() {
    Tasks = Tasks.filter(task => task.status !== "Completed");
    renderTasks();
}

function clearAllTasks() {
    Tasks = [];
    renderTasks();
}

function toggleTaskStatus(id) {
    const task = Tasks.find(task => task.id === id);
    if (task) {
        task.status = task.status === "Active" ? "Completed" : "Active";
        renderTasks();
    }
}

function renderTasks(filter = "") {
    const taskList = document.getElementById('todo-list');
    taskList.innerHTML = '';
    const tasks = getTasks(filter);

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.status === "Completed" ? "completed" : "";
        taskItem.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" 
                ${task.status === "Completed" ? "checked" : ""} 
                onclick="toggleTaskStatus(${task.id})">
                <label ondblclick="editTask(${task.id}, '${task.name}')">${task.name}</label>
                <button class="destroy" onclick="deleteTask(${task.id})">x</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById('task-count').textContent = Tasks.filter(task => task.status === "Active").length;
}

document.getElementById('new-task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskInput = event.target;
        const taskText = taskInput.value.trim();

        if (taskText) {
            const newTask = { id: Date.now(), name: taskText, status: "Active" };
            addTask(newTask);
            taskInput.value = '';
        }
    }
});

document.getElementById('show-all').addEventListener('click', function() {

    filterTasks('');
});

document.getElementById('show-active').addEventListener('click', function() {
    filterTasks('Active');
});

document.getElementById('show-completed').addEventListener('click', function() {
    filterTasks('Completed');
});


document.getElementById('toggle-all').addEventListener('click',function() {
    toggleTaskStatus('');
})

const markAll = document.querySelector('.toggle-all');
markAll.addEventListener('click', () => {
    allMarked = !allMarked;
    Tasks.forEach(task => task.status = allMarked ? 'Completed' : 'Active');
    // toggleTaskStatus(Tasks);
    renderTasks(Tasks);
    
});

function filterTasks(filter) {
    renderTasks(filter);
    document.querySelectorAll('.filters button').forEach(button => {
        button.classList.remove('selected');
    });
    // document.getElementById(`show-${filter.toLowerCase() || 'all'}`).classList.add('selected');
    if (filter === "Active") {
        document.getElementById('show-active').classList.add('selected');
    } else if (filter === "Completed") {
        document.getElementById('show-completed').classList.add('selected');
    } else {
        document.getElementById('show-all').classList.add('selected');
    }
}


function editTask(id, name) {
    const newName = prompt("Edit Task", name);
    if (newName) {
        updateTask(id, newName);
    }
}

renderTasks();