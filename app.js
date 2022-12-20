//Defining Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Loading Event Listeners

loadEventListeners();

//Loading All Event Listeners

function loadEventListeners(){

    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Adding Tasks Event
    form.addEventListener('submit', addTask);

    //Removing Tasks Event
    taskList.addEventListener('click', removeTask);

    //Clearing Tasks Event
    clearBtn.addEventListener('click', clearTasks);

    //Filtering Tasks Event
    filter.addEventListener('keyup', filterTasks);

}

//Getting Tasks from Local Storage
function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task){

    //Creating li Element

        const li = document.createElement('li');

    //Adding Class
    
        li.className = 'collection-item';
    
    //Creating Text Node and Append to li 
    
        li.appendChild(document.createTextNode(task));
    
    //Creating New Link Element
    
        const link = document.createElement('a');
    
    //Adding Class
    
        link.className = 'delete-item secondary-content';
    
    //Adding Icon HTML
    
        link.innerHTML = '<i class = "fa fa-remove"></i>';
    
    //Appending the link to li
    
        li.appendChild(link);
    
    //Append li to ul
    
        taskList.appendChild(li);

    });
}



//Adding Task

function addTask(e){

    if(taskInput.value === ''){
        alert('Add a Task');
    }

//Creating li Element

    const li = document.createElement('li');

//Adding Class

    li.className = 'collection-item';

//Creating Text Node and Append to li 

    li.appendChild(document.createTextNode(taskInput.value));

//Creating New Link Element

    const link = document.createElement('a');

//Adding Class

    link.className = 'delete-item secondary-content';

//Adding Icon HTML

    link.innerHTML = '<i class = "fa fa-remove"></i>';

//Appending the link to li

    li.appendChild(link);

//Append li to ul

    taskList.appendChild(li);

//Store in LS

    storeTaskInLocalStorage(taskInput.value);

//Clear Input

    taskInput.value = '';


e.preventDefault();

}


//Storing Tasks

function storeTaskInLocalStorage(task){

    let tasks;

    if(localStorage.getItem('tasks') === null){

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//Removing Tasks

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){

            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){

    let tasks;

    if(localStorage.getItem('tasks') === null){

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task, index){

        if(taskItem.textContent === task){

            tasks.splice(index, 1);

        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clearing Tasks

function clearTasks(){

    // First Method(Empty String) to Clear Tasks
    // taskList.innerHTML = '';

    // Second Method(While Loop) to Clear Tasks
    while(taskList.firstChild){

        taskList.removeChild(taskList.firstChild);

    }

    //Clear from Local Storage
    clearTasksFromLocalStorage();

}

//Clear Tasks from Local Storage

function clearTasksFromLocalStorage(){

    localStorage.clear();

}

//Filtering Tasks

function filterTasks(e){

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){

        const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){

        task.style.display = 'block';

        } else {

        task.style.display = 'none';

        }
    });
}