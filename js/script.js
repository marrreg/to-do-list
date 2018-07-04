let newTaskButton = document.getElementById('newTaskButton');
let taskList = document.getElementById('taskList');
let newTaskText = document.getElementById('newTaskText');
let deleteButtons = document.getElementsByClassName('deleteButton');

//document.addEventListener('DOMContentLoaded', function () {
//
//});

class Task {
    constructor(summary, status) {
        this.summary = summary;
        this.status = "open";
    }

    markDone() {
        this.status = "done"
    }
}

let tasks = [];

populateWithSampleTasks();

newTaskButton.addEventListener('click', function () {
    addNewTask(newTaskText.value);
});

function addNewTask(taskText) {
    if (taskText.length) {
        let newTask = '<li class="list-item">' + '<i class="fa fa-circle-thin completeButton" aria-hidden="true"></i>' + '<i class="fa fa-circle-thin startButton" aria-hidden="true"></i>' + taskText + ' ' + '<i class="fa fa-trash-o deleteButton" aria-hidden="true"></i>' + '</li>';
        taskList.innerHTML += newTask;
        newTaskText.value = '';
        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', function () {
                this.parentNode.remove();
            });
        }
    } else {
        console.log('Rejected: Attempted to add empty task.');
    }
}

function populateWithSampleTasks() {
    tasks.push(new Task("Wyniesc smieci"));
    tasks.push(new Task("Zrobic zakupy"));
    tasks.push(new Task("Wyprowadzic psa"));
    tasks.push(new Task("Stworzyc nowa aplikacje do zadan"));
    tasks.push(new Task("Ugotowac obiad"));

    tasks.forEach(function(task) { addNewTask(task.summary); })
}