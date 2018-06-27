let newTaskButton = document.getElementById('newTaskButton');
let taskList = document.getElementById('taskList');
let newTaskText = document.getElementById('newTaskText');
let deleteButtons = document.getElementsByClassName('deleteButton');

//document.addEventListener('DOMContentLoaded', function () {
//
//});

newTaskButton.addEventListener('click', function () {
    addNewTask(newTaskText.value);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            this.parentNode.remove();
        });
    }
});

function addNewTask(taskText) {
    let newTask = '<li>' + taskText + ' ' + '<button class="deleteButton">X</button>' + '</li>';
    taskList.innerHTML += newTask;
    newTaskText.value = '';
}
