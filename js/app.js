let newTaskButton = document.getElementById('newTaskButton');
let newTaskText = document.getElementById('newTaskText');
let taskList = document.getElementById("taskList");
let deleteButtons = document.getElementsByClassName('deleteButton');
let statusButtons = document.getElementsByClassName('statusButton');
let tasks = []; // tasks is the main "storage" for Task objects in the application

// Task class represents a single Task.
class Task {
    constructor(summary, status) {
        // Summary is the brief description of the task, status represents whether it's open or done
        this.summary = summary;
        this.status = 'open';
    }

    markDone() {
        // Change task's status to done
        this.status = 'done';
    }

    markOpen() {
        // Change task's status (back) to open        
        this.status = 'open';   
    }

    markOngoing() {
        this.status = 'ongoing';
    }
}

function addNewTask(summary) {
    // If there is something in the text field, a new Task object with provided summary shall be added to the tasks array
    if (summary) {
        tasks.push(new Task(summary));
        // Once the task is added, the task list is re-rendered (that is: the view is cleared and filled with all tasks in the array)
        renderTasks();  // NOTE: ANY CHANGE IN THE TASKS LIST SHOULD BE FOLLOWED BY RE-RENDERING THE VIEW
    } else {
        console.log("Attempted to add an empty task.")
    }
}

function deleteTask(index) {
    // Remove the task with provided index. Once it's done, all indexes are moved respectively
    tasks.splice(index, 1);
    renderTasks();
}

function handleStatusClick(index) {
    // General handler for any clicks done on the status circle.

    // The action depends on the status of relevant task at the exact moment of status circle clicking
    if (tasks[index].status === 'open') {
        tasks[index].markOngoing();
    } else if (tasks[index].status === 'ongoing') {
        tasks[index].markDone();
    }
    renderTasks();
}

function populateWithSampleTasks() {
    // Add some sample tasks to the tasks array, for testing purposes
    tasks.push(new Task("Wyniesc smieci"));
    tasks.push(new Task("Zrobic zakupy"));
    tasks.push(new Task("Wyprowadzic psa"));
    tasks.push(new Task("Stworzyc nowa aplikacje do zadan"));
    tasks.push(new Task("Ugotowac obiad"));
}

function renderTasks() {
    // Clear the tasks view (taskList is the main <ul> of the application)
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        // Create a new <li> element, that we will fill with task information.
        const li = document.createElement('li');
        li.className = 'list-item'; // add standard task class
        li.id = i; // add id, uniquely representing the task. It is later used for all operations on the task

        const completeIcon = document.createElement('i'); // Create an empty icon element
        
        // depending on whether the task is done or open, add a class with relevant font-awesome icon
        if (tasks[i].status === 'done') {
            completeIcon.className = ['fa fa-check-circle statusButton'];
        } else if (tasks[i].status === 'open') {
            completeIcon.className = ['fa fa-circle-thin statusButton'];
        } else if (tasks[i].status === 'ongoing') {
            completeIcon.className = ['fa fa-play-circle-o statusButton']
        }

        li.appendChild(completeIcon); // Add the icon to the <li> element defined earlier

        // Create a new <span> element and add the task summary inside (i.e. "Wyniesc smieci")
        const taskSummary = document.createElement('span');
        taskSummary.textContent = tasks[i].summary;
        li.appendChild(taskSummary); // Add the freshly created <span> element to the <li>

        // Add the delete icon (trashcan)
        const deleteIcon = document.createElement('i');
        deleteIcon.className = ['fa fa-trash deleteButton'];
        li.appendChild(deleteIcon);

        // Add the newly created <li> element representing the complete task and all needed buttons to the task list
        taskList.appendChild(li);
    }

    addListEventListeners();
}

function addListEventListeners() {
    // Add event listeners to the list items. Executed for each tasks re-render.
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function(event) {
            deleteTask(this.parentNode.id);
        });
    }

    for (let i = 0; i < statusButtons.length; i++) {
        statusButtons[i].addEventListener('click', function(event) {
            handleStatusClick(this.parentNode.id);
        });
    }
}

function addGeneralEventListeners() {
    // Add event listeners visible at all times, such as new task button
    newTaskButton.addEventListener('click', function () {
        // When a new task is added, it should be appended to the tasks array and the text field shall be cleared
        addNewTask(newTaskText.value);
        newTaskText.value = '';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Start operating on page contents only once the document is available
    addGeneralEventListeners();
    populateWithSampleTasks();
    renderTasks();
});
