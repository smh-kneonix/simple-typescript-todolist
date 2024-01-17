"use strict";
const input = document.getElementById("inputTodo");
const date = document.getElementById("inputDate");
const inputButton = document.getElementById("submitTodo");
const form = document.querySelector("form");
const listOfElement = document.querySelector("#todosDiv");
form.addEventListener("submit", submitTodo);
let todos = readTodos();
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
todos.forEach(createTodoFront);
function submitTodo(e) {
    e.preventDefault();
    const newTodo = addTodoToDB(input.value, date.value);
    createTodoFront(newTodo);
    //save on localStorage
    saveTodos();
}
function addTodoToDB(inputValue, dateValue) {
    const newTodo = {
        text: inputValue,
        complated: false,
        date: dateValue,
    };
    todos.push(newTodo);
    return newTodo;
}
function createTodoFront(todo) {
    const inputValue = todo.text;
    const dateValue = todo.date;
    //create div element
    const divElement = document.createElement("div");
    divElement.classList.add("col-10", "shadow-lg", "rounded", "bg-transparent", "mt-3", "justify-content-between", "row", "border", "border-info", "align-items-center");
    //create p element
    const pElement = document.createElement("p");
    pElement.classList.add("col-8", "col-md-10", "vertical-line", "text-light", "mt-3");
    pElement.append(inputValue);
    divElement.appendChild(pElement);
    //create checkbox
    const checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.type = "checkbox";
    checkBox.value = "";
    checkBox.checked = todo.complated;
    const divOfCheckBox = document.createElement("div");
    divOfCheckBox.classList.add("col-4", "col-md-2", "text-center");
    // set time
    const deadTime = document.createElement("p");
    deadTime.classList.add("text-secondary", "date");
    deadTime.append(`${dateValue?.toString().replaceAll("-", "/")}`);
    date.value = "";
    //close button
    const btnClose = document.createElement("i");
    btnClose.classList.add("bi", "bi-x-lg", "text-light");
    // check box event listener
    checkBox.addEventListener("change", function () {
        todo.complated = checkBox.checked;
        saveTodos();
    });
    // add div to mainDiv and clear the input
    divOfCheckBox.append(deadTime);
    divOfCheckBox.append(checkBox);
    divOfCheckBox.append(btnClose);
    divElement.append(divOfCheckBox);
    listOfElement.append(divElement);
    listOfElement.append(divElement);
    input.value = "";
    //delete a Todo
    btnClose.addEventListener("click", function () {
        const newTodos = todos.filter((val) => {
            return val !== todo;
        });
        todos = newTodos;
        saveTodos();
        divElement.remove();
    });
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
