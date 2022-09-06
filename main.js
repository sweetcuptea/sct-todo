// variable : selector
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('#todo-button');
const todoContainer = document.querySelector('.todo-list-container');
const todoCount = document.querySelector('.todo-count');

// array : todo list
const todoLocal = localStorage.getItem('data');
let todoArray;

if(todoLocal === null) {
    todoArray = [];
} else {
    todoArray = JSON.parse(todoLocal);    
    for(i = 0; i < todoArray.length; i++) {
        todoCreate(i);
    };

    // todoRenderAll(todoArray); // method : 2
};

// function todoRenderAll(todoArray) { // method : 2
//     for(i = 0;i < todoArray.length;i++){
//         todoCreate(i);
//     };
// };

// function : creating elements
function todoCreate(i) {

    // variable : create elements
    let todoList = document.createElement('div');
    let todoListText = document.createElement('p');
    let todoButtonCheck = document.createElement('button');
    let todoButtonRemove = document.createElement('button');

    // adding css classes to the elements
    todoList.classList.add('todo-list', 'flex-default');
    todoListText.classList.add('todo-list-text');
    todoButtonCheck.classList.add('todo-button','sucess');
    todoButtonRemove.classList.add('todo-button', 'danger');
    
    // create icons using html tag
    todoButtonCheck.innerHTML = '<i class="ti ti-check"></i>';
    todoButtonRemove.innerHTML = '<i class="ti ti-trash"></i>';

    // appending the elements
    todoContainer.appendChild(todoList);
    todoList.appendChild(todoListText);
    todoList.appendChild(todoButtonCheck);
    todoList.appendChild(todoButtonRemove);

    todoListText.innerHTML = todoArray[i];

    // button action : marking list when the task done by clicking (button)
    todoButtonCheck.addEventListener('click', () => {
        for(i = 0; i < todoArray.length; i++) {
            if(todoListText.innerText === todoArray[i]) {
                todoListText.classList.toggle('done');
            };
        };
    });

    // button action : removing list by clicking (button)
    todoButtonRemove.addEventListener('click', () => {
        for(i = 0; i < todoArray.length; i++) {
            if(todoListText.innerText === todoArray[i]) {
                todoArray.splice(i,1);
                todoListText.parentElement.remove()
                localStorage.setItem('data', JSON.stringify(todoArray));
                todoCountView();
                console.log(todoListText.innerText + ' - task deleted');
            };
        };
    });

};

// function : displaying the lists elements
function todoRender() {

    let todoValue = todoInput.value.trim();

    if(todoValue === '' || todoArray.includes(todoValue)) {
        todoInput.setAttribute('placeholder', 'input your task here');
        todoInput.style.border = '2px solid var(--color-danger)';
        todoInput.style.backgroundColor = 'var(--color-danger)';
    } else {
        todoArray.push(todoInput.value.replace(/^\s+|\s+$/gm,''));
        localStorage.setItem('data', JSON.stringify(todoArray));
        todoInput.setAttribute('placeholder', 'create a task');
        todoInput.style.border = '2px solid var(--color-200)';
        todoInput.style.backgroundColor = 'var(--color-100)';

        // todoContainer.innerHTML = ''; // method : 2
        // renderAll(todoArray); // method : 2
        
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

// input action : input todo by pressing (enter)
todoInput.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        todoRender();
        todoCountView();
    };
});

// button action : input todo by clicking (button)
todoButton.addEventListener('click', (e) => {
    e.preventDefault();
    todoRender();
    todoCountView();
});


