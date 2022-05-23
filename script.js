const textInput = document.getElementById("task");
const addButton = document.getElementById("add-task-btn");
const tasksList = document.getElementById("tasks-list");
const saveInd = document.getElementById("saveIndex");
const saveTaskButton = document.getElementById("save-todo-btn");

let todoArray = [];
displayList();

addButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null){
        todoArray = [];
    }
    else {
        todoArray = JSON.parse(todo);
    }
    if (textInput.value != 0){
        todoArray.push(textInput.value);
    }
    textInput.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));

    displayList()
})

function displayList(){
    let todo = localStorage.getItem("todo");
    if (todo === null){
        todoArray = [];
    }
    else {
        todoArray = JSON.parse(todo);
    }
    let htmlList = "";
    todoArray.forEach((list, index) => {
        htmlList += `<div>
 <p >${list}</p>
 <button onclick='edit(${index})'>Edit</button>
 <button onclick='deleteTodo(${index})' >Delete</button>
</div>`;
    });
    tasksList.innerHTML = htmlList;
}

function deleteTodo(index){
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayList();
}

function edit(index){
    saveInd.value = index;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    textInput.value = todoArray[index];
    addButton.style.display = "none";
    saveTaskButton.style.display ="block";
}
saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = textInput.value;
    addButton.style.display = "block";
    saveTaskButton.style.display = "none";
    textInput.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayList();
});