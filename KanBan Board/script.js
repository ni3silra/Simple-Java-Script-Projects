const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColoumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updateOnLoad = false;
let listofList = [];

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
// Drag Functionality
let draggedItem;
let currentColomn;
let dragging = false;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}


// Set localStorage Arrays
function updateSavedColumns() {

    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    listArrays =  [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });

}


// Filter Arrays to remove null
function filterArray(array) {
    return array.filter((item) => item !== null);
  }

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    //   console.log('columnEl:', columnEl);
    //   console.log('column:', column);
    //   console.log('item:', item);
    //   console.log('index:', index);
    // List Item
    const listEl = document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute('ondragstart', 'drag(event)');
    listEl.contentEditable = true;
    listEl.id = index;
    listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
    // Append
    columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    if (!updateOnLoad)
        getSavedColumns();
    

    // Backlog Column
    backlogList.textContent = '';
    backlogListArray.forEach((listItem, index) => {
        createItemEl(backlogList, 0, listItem, index);
    });
    backlogListArray = filterArray(backlogListArray);
    // Progress Column
    progressList.textContent = '';
    progressListArray.forEach((listItem, index) => {
        createItemEl(progressList, 1, listItem, index);
    });
    progressListArray = filterArray(progressListArray);
    // Complete Column
    completeList.textContent = '';
    completeListArray.forEach((listItem, index) => {
        createItemEl(completeList, 2, listItem, index);
    });
    completeListArray = filterArray(completeListArray);
    // On Hold Column
    onHoldList.textContent = '';
    onHoldListArray.forEach((listItem, index) => {
        createItemEl(onHoldList, 3, listItem, index);
    });
    onHoldListArray = filterArray(onHoldListArray);
    // Run getSavedColumns only once, Update Local Storage
    updateOnLoad = true;
    updateSavedColumns();


}

// Update item - delete if necessary, or update Array value
function updateItem(id, column) {
    const selectedArray = listArrays[column];
    const selectedColumnEl = listColoumns[column].children;
    if (!dragging) {
      if (!selectedColumnEl[id].textContent) {
        delete selectedArray[id];
      } else {
        selectedArray[id] = selectedColumnEl[id].textContent;
      }
      updateDOM();
    }
  }

// Add to column list, reset textbox
function addToColumn(column) {
    const itemText = addItems[column].textContent;
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent = '';
    updateDOM();
  }

// Show InputBox

function showInputBox(column){
    console.log("Add button clicked " + column)
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addItemContainers[column].style.display = 'flex';
}

// Hide InputBox

function hideInputBox(column){
    console.log("Save button clicked " + column)
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addItemContainers[column].style.display = 'none';
    addToColumn(column);
}

function rebuildArrays() {
    backlogListArray = [];
    for (let i = 0; i < backlogList.children.length; i++) {
      backlogListArray.push(backlogList.children[i].textContent);
    }
    progressListArray = [];
    for (let i = 0; i < progressList.children.length; i++) {
      progressListArray.push(progressList.children[i].textContent);
    }
    completeListArray = [];
    for (let i = 0; i < completeList.children.length; i++) {
      completeListArray.push(completeList.children[i].textContent);
    }
    onHoldListArray = [];
    for (let i = 0; i < onHoldList.children.length; i++) {
      onHoldListArray.push(onHoldList.children[i].textContent);
    }
}

// When Item is dragged 

function drag(e) {
    draggedItem = e.target;
    dragging = true;
    //console.log(draggedItem);
}


// colomn allows to drop item 
function allowDrop(e) {
    e.preventDefault();
}

// Dropping items

function drop(e) {
    e.preventDefault();
    // remove color and padding 
    listColoumns.forEach((colomn) => {
        colomn.classList.remove('over');
    });

    // Add Item in Colomn 
    const parent = listColoumns[currentColomn];
    parent.appendChild(draggedItem);
    dragging = false;
    rebuildArrays();
    updateDOM();
}

// when Item enter in colomn

function onDragEnter(index) {
    listColoumns[index].classList.add('over');
    currentColomn = index;
}

// Test Functions


updateDOM();
// getSavedColumns();
// updateSavedColumns();

