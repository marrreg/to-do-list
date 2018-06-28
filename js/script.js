let newTaskButton = document.getElementById('newTaskButton');
let taskList = document.getElementById('taskList');
let newTaskText = document.getElementById('newTaskText');
let deleteButtons = document.getElementsByClassName('deleteButton');

//document.addEventListener('DOMContentLoaded', function () {
//
//});

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
    addNewTask("Wyniesc smieci");
    addNewTask("Zrobic zakupy");
    addNewTask("Wyprowadzic psa");
    addNewTask("Stowrzyc nowa aplikacje do zadan");
    addNewTask("Ugotowac obiad");
}