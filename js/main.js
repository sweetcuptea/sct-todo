// variable selector
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('#todo-button');
const todoContainer = document.querySelector('.todo-list-container');
const todoCount = document.querySelector('.todo-count');

// get 'data' from localstorage
const todoLocal = localStorage.getItem('data');
let todoArray;

// check and initiate lists acording to localstorage 'data'
if(todoLocal === null) {
    todoArray = [];
} else {
    todoArray = JSON.parse(todoLocal);
    for(i = 0; i < todoArray.length; i++) {
        todoCreate(i);
        todoCountView(i);
    };
};

// function : create a list elements with the button 'check' and 'remove'
function todoCreate(i) {

    // create : elements & variables
    let todoList = document.createElement('div');
    let todoListText = document.createElement('p');
    let todoButtonCheck = document.createElement('button');
    let todoButtonRemove = document.createElement('button');
    // add : classes
    todoList.classList.add('todo-list', 'flex-default');
    todoListText.classList.add('todo-list-text');
    todoButtonCheck.classList.add('todo-button','sucess');
    todoButtonRemove.classList.add('todo-button', 'danger');
    // add : icon 
    todoButtonCheck.innerHTML = '<i class="ti ti-check"></i>';
    todoButtonRemove.innerHTML = '<i class="ti ti-trash"></i>';
    // appending child elements
    todoContainer.appendChild(todoList);
    todoList.appendChild(todoListText);
    todoList.appendChild(todoButtonCheck);
    todoList.appendChild(todoButtonRemove);

    // button check : 'mark done' the list and set the condition of the list to localstorage
    todoButtonCheck.addEventListener('click', () => {
        for(i = 0; i < todoArray.length; i++) {
            if(todoListText.innerText === todoArray[i].task) {
                if(todoArray[i].check === true) {
                    todoListText.classList.remove('done');
                    todoArray[i].check = false;
                } else {
                    todoListText.classList.add('done');
                    todoArray[i].check = true;
                };
                localStorage.setItem('data', JSON.stringify(todoArray));
            };
        };
    });

    // button remove : removing the list from the parent elements
    todoButtonRemove.addEventListener('click', () => {
        for(i = 0; i < todoArray.length; i++) {
            if(todoListText.innerText === todoArray[i].task) {
                todoArray.splice(i,1);
                todoListText.parentElement.remove()
                localStorage.setItem('data', JSON.stringify(todoArray));
                todoCountView();
                console.log(todoListText.innerText + ' - task deleted');
            };
        };
    });

    // displaying todo lists
    todoListText.innerHTML = todoArray[i].task;

    if(todoArray[i].check === true){
        todoListText.classList.add('done');
    } else {
        todoListText.classList.remove('done');
    }
    
};

// function : when the form input have a value to be inserted, then it will displayed on the lists
function todoRender() {

    let todoValue = todoInput.value.trim();

    if(todoValue === '' || todoArray.some(target => target.task === todoValue)) {
        todoInput.setAttribute('placeholder', 'input your task here');
        todoInput.style.border = '2px solid var(--color-danger)';
        todoInput.style.backgroundColor = 'var(--color-danger)';
    } else {
        todoArray.push({task: todoInput.value.replace(/^\s+|\s+$/gm,''), check: false})
        localStorage.setItem('data', JSON.stringify(todoArray));
        todoInput.setAttribute('placeholder', 'create a task');
        todoInput.style.border = '2px solid var(--color-200)';
        todoInput.style.backgroundColor = 'var(--color-100)';
        todoCreate(todoArray.length -1);
        todoInput.value = '';
        todoInput.focus();
        console.log(todoArray);
    }

};

// function : displaying how many task you have
function todoCountView() {
    if (todoArray.length === 0){
        todoCount.innerHTML = '&check;';
    } else {
        todoCount.innerText = todoArray.length;
    }
};

// input enter : inputing the lists by pressing 'enter' on the keyboard
todoInput.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        todoRender();
        todoCountView();
    };
});

// button click : inputing the lists by clicking the button
todoButton.addEventListener('click', (e) => {
    e.preventDefault();
    todoRender();
    todoCountView();
});