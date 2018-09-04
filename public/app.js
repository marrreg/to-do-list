'use strict';

let newTaskButton = document.getElementById('newTaskButton');
let newTaskText = document.getElementById('newTaskText');
let taskList = document.getElementById('taskList');
let statusButtons = document.getElementsByClassName('statusButton');
let statusSelection = document.getElementById('status-selection');
let activeStatusSelection = 'open';

function deleteTask(id) {
    // Remove the task with provided index. Once it's done, all indexes are moved respectively
    console.log('Deleting: ' + id);
    $.ajax({
      url: '/task/' + id,
      type: 'DELETE'
      // contentType: 'application/json' // it breaks stuff, todo: read more and fix properly
    });

    executeWithAllTasks(renderTasks);
}

function parseTaskText(taskString) {
  let openingBracketIndex = taskString.indexOf("[");
  let closingBracketIndex = taskString.indexOf("]");
  let estimate = 0;
  let summary = taskString;

  if (openingBracketIndex != -1 && closingBracketIndex != -1) {
      estimate = parseInt(taskString.substring(openingBracketIndex + 1, closingBracketIndex));
      summary = taskString.substring(0, openingBracketIndex).trim() + taskString.substring(closingBracketIndex + 1);
  }

  return { summary: summary, estimate: estimate };
}

function handleStatusClick(index) {
    // General handler for any clicks done on the status circle.

    // The action depends on the status of relevant task at the exact moment of status circle clicking
    if (tasks[index].status === 'open') {
        tasks[index].markOngoing();
        tasks.unshift(tasks.splice(index, 1)[0]);
    } else if (tasks[index].status === 'ongoing') {
        tasks[index].markDone();
    }
    executeWithAllTasks(renderTasks);
}

function handleStatusSelectionClick(index, id) {
    for (let i = 0; i < statusSelection.children.length; i++) {
        statusSelection.children[i].className = '';
    }
    statusSelection.children[index].className = 'active';
    activeStatusSelection = statusSelection.children[index].textContent;

    executeWithAllTasks(renderTasks);
}

function renderTasks(tasks) {
    // Clear the tasks view (taskList is the main <ul> of the application)

    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === 'done') {
            if (activeStatusSelection === 'open') {
                continue;
            }
        } else {
            if (activeStatusSelection === 'done') {
                continue;
            }
        }

        // Create a new <li> element, that we will fill with task information.
        const li = document.createElement('li');
        li.className = 'list-item'; // add standard task class
        li.id = tasks[i]._id; // add id, uniquely representing the task. It is later used for all operations on the task

        const completeIcon = document.createElement('i'); // Create an empty icon element

        // depending on whether the task is done or open, add a class with relevant font-awesome icon
        if (tasks[i].status === 'done') {
            completeIcon.className = 'fa fa-check-circle statusButton';
        } else if (tasks[i].status === 'open') {
            completeIcon.className = 'fa fa-circle-thin statusButton';
        } else if (tasks[i].status === 'ongoing') {
            completeIcon.className = 'fa fa-play-circle-o statusButton'
        }

        li.appendChild(completeIcon); // Add the icon to the <li> element defined earlier

        // Create a new <span> element and add the task summary inside (i.e. "Wyniesc smieci")
        const taskSummary = document.createElement('span');
        taskSummary.textContent = tasks[i].summary;
        if (tasks[i].status === 'done') {
            li.appendChild(taskSummary);
            const taskDuration = document.createElement('span');
            taskDuration.textContent = ' ' + tasks[i].duration + 's';
            li.appendChild(taskDuration);
        } else {
            li.appendChild(taskSummary);
        }
        // Add the freshly created <span> element to the <li>

        // Add the delete icon (trashcan)
        const deleteIcon = document.createElement('i');
        deleteIcon.className = ['fa fa-trash deleteButton'];
        li.appendChild(deleteIcon);

        // Add the newly created <li> element representing the complete task and all needed buttons to the task list
        taskList.appendChild(li);
    }

    addListEventListeners();
}

function renderStatusSelection() {
    statusSelection.innerHTML = '';
    for (let i = 0; i < statusSelectionOptions.length; i++) {
        const p = document.createElement('p');
        p.textContent = statusSelectionOptions[i].text;
        p.id = statusSelectionOptions[i].id;

        if (i != 1) {
            // If the middle element is being generated, it should remain highlighted
            p.className = 'light-text';
        }

        statusSelection.appendChild(p);
    }

    addStatusSelectionEventListeners();
}

function addListEventListeners() {
    for (let i = 0; i < statusButtons.length; i++) {
        statusButtons[i].addEventListener('click', function(event) {
            handleStatusClick(this.parentNode.id);
        });
    }
}

function ajaxAddNewTask(newTaskString) {
  if (newTaskString) {

    let newTaskStringParsed = parseTaskText(newTaskString);

    let newTaskSummary = newTaskStringParsed.summary;
    let newTaskEstimate = newTaskStringParsed.estimate;

    var taskToAdd = {
      summary: newTaskSummary,
      status: "open",
      startTimestamp: Date.now,
      stopTimestamp: null,
      duration: null,
      estimate: newTaskEstimate
    }

    $.ajax({
      url: '/task',
      type: 'POST',
      data: taskToAdd
      // contentType: 'application/json' // it breaks stuff, todo: read more and fix properly
    });

    newTaskText.value = '';
    executeWithAllTasks(renderTasks);
  } else {
    console.log("Attempted to add an empty task.");
  }
}

function executeWithAllTasks(handleData) {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    dataType: 'json',
    success: function(data) { handleData(data); }
    // contentType: 'application/json' // it breaks stuff, todo: read more and fix properly
  });
}

function addAllEventListeners() {
  document.addEventListener('click', function(e) {
    // let el = $(e.target);
    let el = e.target;
    let classList = el.classList;
    let id = el.id;
    let parentId = el.parentNode.id;

    if (id === 'newTaskButton') {
      // This is problematic, because when we click exactly on the icon inside the button,
      // it is not recorded as a click on newTaskButton and hence, not recognized here.

      ajaxAddNewTask(newTaskText.value); // This should be used eventually
    } else if ($(el).hasClass("deleteButton")) {
      deleteTask(parentId);
    };
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      ajaxAddNewTask(newTaskText.value);
    }
  });
}

function addStatusSelectionEventListeners() {
    for (let i = 0; i < statusSelection.children.length; i++) {
        statusSelection.children[i].addEventListener('click', function(event) {
            handleStatusSelectionClick(i, this.id);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Start operating on page contents only once the document is available
    addStatusSelectionEventListeners();
    addAllEventListeners();
    executeWithAllTasks(renderTasks);
});
