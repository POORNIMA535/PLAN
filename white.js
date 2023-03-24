var selectedItem = null;
var addButton = document.querySelector("button");
var inputField = document.querySelector("#itemInput");

function addItem() {
  var newItemText = inputField.value.trim();
  if (newItemText === "") {
    alert("Please enter an item!");
    return;
 }

  if (selectedItem) {
    selectedItem.firstChild.nodeValue = newItemText;
    addButton.innerText = "Add Item";
    selectedItem = null;
    inputField.value = "";
    saveItems();
    return;
  }

  var itemsList = document.getElementById("itemsList");
  var newItem = document.createElement("div");
  newItem.innerHTML = newItemText + ' <button onclick="editItem(this)">Edit</button> <button onclick="deleteItem(this)">Delete</button>';
  itemsList.appendChild(newItem);
  inputField.value = "";
  saveItems();
}

function editItem(button) {
  inputField.value = button.parentNode.firstChild.nodeValue;
  addButton.innerText = "Save";
  selectedItem = button.parentNode;
}

function deleteItem(button) {
  var confirmDelete = confirm("Are you sure you want to delete this item?");
  if (confirmDelete) {
    button.parentNode.parentNode.removeChild(button.parentNode);
    saveItems();
  }
}

function saveItems() {
  var itemsList = document.getElementById("itemsList");
  var itemsArray = [];
  for (var i = 0; i < itemsList.childNodes.length; i++) {
    var itemText = itemsList.childNodes[i].firstChild.nodeValue;
    itemsArray.push(itemText);
  }
  var itemsJson = JSON.stringify(itemsArray);
  localStorage.setItem("items", itemsJson);
}

function loadItems() {
  var itemsList = document.getElementById("itemsList");
  var itemsJson = localStorage.getItem("items");
  if (itemsJson !== null) {
    var itemsArray = JSON.parse(itemsJson);
    for (var i = 0; i < itemsArray.length; i++) {
      var newItem = document.createElement("div");
      newItem.innerHTML = itemsArray[i] + ' <button onclick="editItem(this)">Edit</button> <button onclick="deleteItem(this)">Delete</button>';
      itemsList.appendChild(newItem);
    }
  }
}
loadItems();