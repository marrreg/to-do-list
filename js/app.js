let newTaskButton = document.getElementById('newTaskButton');
let newTaskText = document.getElementById('newTaskText');
let taskList = document.getElementById("taskList");
let deleteButtons = document.getElementsByClassName('deleteButton');
let completeButtons = document.getElementsByClassName('completeButton');

//document.addEventListener('DOMContentLoaded', function () {
//
//});

class Task {
    constructor(summary, status) {
        this.summary = summary;
        this.status = 'open';
    }

    markDone() {
        this.status = 'done';
    }

    markOpen() {
        this.status = 'open';   
    }
}

let tasks = [];

populateWithSampleTasks();
renderTasks();

newTaskButton.addEventListener('click', function () {
    addNewTask(newTaskText.value);
    newTaskText.value = '';
});

function addNewTask(summary) {
    if (summary) {
        tasks.push(new Task(summary));
        renderTasks();
    } else {
        console.log("Attempted to add an empty task.")
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function handleStatusClick(index) {
    if (tasks[index].status === 'open') {
        tasks[index].markDone();
    } else if (tasks[index].status === 'done') {
        tasks[index].markOpen();
    }
    renderTasks();
}

function populateWithSampleTasks() {
    tasks.push(new Task("Wyniesc smieci"));
    tasks.push(new Task("Zrobic zakupy"));
    tasks.push(new Task("Wyprowadzic psa"));
    tasks.push(new Task("Stworzyc nowa aplikacje do zadan"));
    tasks.push(new Task("Ugotowac obiad"));
}

function renderTasks() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.id = i;

        const completeIcon = document.createElement('i');
        if (tasks[i].status === 'done') {
            completeIcon.className = ['fa fa-check-circle completeButton']
        } else if (tasks[i].status === 'open') {
            completeIcon.className = ['fa fa-circle-thin completeButton'];
        }

        li.appendChild(completeIcon);

        const taskSummary = document.createElement('span');
        taskSummary.textContent = tasks[i].summary;
        li.appendChild(taskSummary);

        const deleteIcon = document.createElement('i');
        deleteIcon.className = ['fa fa-trash deleteButton'];
        li.appendChild(deleteIcon);

        taskList.appendChild(li);
    }

    addEventListeners();
}

function addEventListeners() {
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function(event) {
            deleteTask(this.parentNode.id);
        });
    }

    for (let i = 0; i < completeButtons.length; i++) {
        completeButtons[i].addEventListener('click', function(event) {
            handleStatusClick(this.parentNode.id);
        });
    }
}