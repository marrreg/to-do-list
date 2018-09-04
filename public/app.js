'use strict';

let newTaskButton = document.getElementById('newTaskButton');
let newTaskText = document.getElementById('newTaskText');
let taskList = document.getElementById('taskList');
let deleteButtons = document.getElementsByClassName('deleteButton');
let statusButtons = document.getElementsByClassName('statusButton');
let statusSelection = document.getElementById('status-selection');
let tasks = []; // tasks is the main "storage" for Task objects in the application
let activeStatusSelection = 'open';

// Task class represents a single Task.
class Task {
    constructor(summary, estimate) {
        // Summary is the brief description of the task, status represents whether it's open or done
        this.summary = summary;
        this.status = 'open';
        this.startTimestamp = '';
        this.stopTimestamp = '';
        this.duration = 0;
        this.estimate = estimate;
    } // Covered in the controller

    markDone() {
        // Change task's status to done
        this.status = 'done';
        this.stopTimestamp = new Date;
        this.duration = Math.round((this.stopTimestamp - this.startTimestamp)/1000);
    }

    markOpen() {
        // Change task's status (back) to open
        this.status = 'open';
    }

    markOngoing() {
        this.status = 'ongoing';
        this.startTimestamp = new Date;
    }

    setEstimate(estimateInSeconds) {
        this.estimate = estimateInSeconds;
    }
}

function addNewTask(newTaskString) {
    // If there is something in the text field, a new Task object with provided summary shall be added to the tasks array
    if (newTaskString) {
        let openingBracketIndex = newTaskString.indexOf("[");
        let closingBracketIndex = newTaskString.indexOf("]");
        let newTaskEstimate = 0;
        let newTaskSummary = newTaskString;

        if (openingBracketIndex != -1 && closingBracketIndex != -1) {
            newTaskEstimate = parseInt(newTaskString.substring(openingBracketIndex + 1, closingBracketIndex));
            newTaskSummary = newTaskString.substring(0, openingBracketIndex).trim() + newTaskString.substring(closingBracketIndex + 1);
        }

        tasks.push(new Task(newTaskSummary, newTaskEstimate));

        console.log(tasks[tasks.length-1]);

        // Once a new task is added, it seems reasonable to switch to open tasks view if not selected. Status setting is not yet extracted to a dedicated function, so simulating a click for now.
        statusSelection.children[0].click();

        // Once the task is added, the task list is re-rendered (that is: the view is cleared and filled with all tasks in the array)
        executeWithAllTasks(renderTasks);  // NOTE: ANY CHANGE IN THE TASKS LIST SHOULD BE FOLLOWED BY RE-RENDERING THE VIEW
    } else {
        console.log("Attempted to add an empty task.")
    }
}

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
        console.log(tasks[index]);
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

function populateWithSampleTasks() {
    // Add some sample tasks to the tasks array, for testing purposes
    tasks.push(new Task("Zrobic change request projektow ABC"));
    tasks.push(new Task("Zrobic rzeczy z maila od abc.pl"));
    tasks.push(new Task("Zorganizowac do firmy ABC (3 sztuki) + kabelki, ktore sa podobno trudnodostepne"));
    tasks.push(new Task("Sprawdzic, czy da sie zestawic AB1-2 z AB dla ABC"));
    tasks.push(new Task("Porozmawiac z Johnem na temat jego dostepnosci na ABC i odpisac Bridget"));
    tasks.push(new Task("Zalogowac czas pracy"));
    tasks.push(new Task("Zamowic obiad na jutro"));
    tasks.push(new Task("zrobic wewnetrznego taska do ABC-155"));
    tasks.push(new Task("zorganizowac rozwiazanie ABC-54"));
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
    // Add event listeners to the list items. Executed for each tasks re-render.
    // for (let i = 0; i < deleteButtons.length; i++) {
    //     deleteButtons[i].addEventListener('click', function(event) {
    //         deleteTask(this.parentNode.id);
    //     });
    // }

    for (let i = 0; i < statusButtons.length; i++) {
        statusButtons[i].addEventListener('click', function(event) {
            handleStatusClick(this.parentNode.id);
        });
    }
}

function ajaxAddNewTask(newTaskString) {
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

    console.log(classList);
    console.log($(el).hasClass("deleteButton"));

    if (id === 'newTaskButton') {
      // This is problematic, because when we click exactly on the icon inside the button,
      // it is not recorded as a click on newTaskButton and hence, not recognized here.

      ajaxAddNewTask(newTaskText.value); // This should be used eventually
    } else if ($(el).hasClass("deleteButton")) {
      console.log(parentId);
      deleteTask(parentId);
    };
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      addNewTask(newTaskText.value);
      mostRecentTaskText = newTaskText.value; // todo: remove later (see the comment for that variable)
      newTaskText.value = '';
    }
  });
}

function addGeneralEventListeners() {
    // Add event listeners visible at all times, such as new task button
    newTaskButton.addEventListener('click', function () {
        // When a new task is added, it should be appended to the tasks array and the text field shall be cleared
        addNewTask(newTaskText.value);
        mostRecentTaskText = newTaskText.value; // todo: remove later (see the comment for that variable)
        newTaskText.value = '';
    });

    newTaskText.addEventListener('keydown', function(e){
        if (e.keyCode === 13) {
            addNewTask(newTaskText.value);
            mostRecentTaskText = newTaskText.value; // todo: remove later (see the comment for that variable)
            newTaskText.value = '';
        }
    });

    addStatusSelectionEventListeners();
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
    addGeneralEventListeners(); // This needs to be commented out if we wish to use the new, document-based listeners
    addAllEventListeners();
    populateWithSampleTasks();
    executeWithAllTasks(renderTasks);
});
