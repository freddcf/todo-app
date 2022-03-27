
// Get the date info
const dateElement = document.querySelector('#date');
const options = {weekday:'long', month:'short', day:'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us', options)


// Getting the TODO elements that the user can interact with
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAll = document.querySelector('.footer button');

// calling on click adding task func
addBtn.addEventListener('click', addTask);

// removing unnecessary spaces
inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add('active');
    } else { 
        addBtn.classList.remove('active');
    }
}

// calling func that loads the task
showTasks();

function addTask(event) {
    event.preventDefault();
    let userData = inputBox.value;
    if (userData.trim() == 0) {
        alert('[ERROR] Fill in the todo area before adding!');
        inputBox.value = '';
    } else {
        let getLocalStorage = localStorage.getItem('new Todo');
        if (getLocalStorage == null) {
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorage);
        }
        listArray.push(userData);
        localStorage.setItem('new Todo', JSON.stringify(listArray));
        showTasks();
    }

}

function showTasks() {
    let getLocalStorage = localStorage.getItem('new Todo');
    if (getLocalStorage == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector('span.pending');
    pendingNumber.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAll.classList.add('active');
    } else {
        deleteAll.classList.remove('active');
    }
    let newLiTag = '';
    listArray.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span><span class="oi">`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
}

// delete tasks func
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('new Todo');
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);
    localStorage.setItem('new Todo', JSON.stringify(listArray));
    showTasks();
}

// delete all tasks func btn
deleteAll.onclick = () => {
    listArray = [];
    localStorage.setItem('new Todo', JSON.stringify(listArray));
    showTasks();
}

