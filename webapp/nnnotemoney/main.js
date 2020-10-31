// Config
const localDBName = "nn_noteMoneyLists";

// Variable
var lists = [];

// DOM
const listContainer = document.querySelector("#list-container");
const listPaidBy = document.querySelector("#list-paid-by");
const listAmount = document.querySelector("#list-amount");
const textNote = document.querySelector("#text-note");
const isListHalf = document.querySelector("#is-list-half");
const addListButton = document.querySelector("#add-list-button");

// Function
const saveToDB = () => {
  localStorage.setItem(localDBName, JSON.stringify(lists));
};

const loadFromDB = () => {
  const data = localStorage.getItem(localDBName);
  lists = data ? JSON.parse(data) : [];
};

const removeList = (index) => {
  alert("remove: " + index);
};

const setListClear = (index) => {
  const cf = confirm("Set clear for " + lists[index].note + "?");
  if (cf) {
    lists[index].isClear = true;
    drawLists();
    saveToDB();
  }
};

const clearFormAdd = () => {
  listAmount.value = "";
  textNote.value = "";
};

const onAddList = () => {
  if (!listAmount.value) {
    listAmount.focus();
    return;
  } else if (!textNote.value) {
    textNote.focus();
    return;
  }

  const list = {
    paidBy: listPaidBy.value,
    amount: listAmount.value,
    isHalf: isListHalf.checked,
    note: textNote.value,
    isClear: false,
  };
  lists.push(list);

  saveToDB();
  clearFormAdd();
  drawLists();
};

const initListContainer = () => {
  const defaultTr = `
  <tr>
  <th>Paid By</th>
  <th>Note</th>
  <th>Amount</th>
  <th>Half</th>
  <th>Result</th>
  <th>Clear</th>
  </tr>
`;

  listContainer.innerHTML = defaultTr;
};

const drawLists = () => {
  initListContainer();

  lists.forEach((list, index) => {
    let tr = document.createElement("tr");
    const td_paidBy = document.createElement("td");
    const td_note = document.createElement("td");
    const td_amount = document.createElement("td");
    const td_half = document.createElement("td");
    const td_result = document.createElement("td");
    const td_clear = document.createElement("td");

    td_paidBy.innerHTML = list.paidBy;
    td_note.innerHTML = list.note;
    td_amount.innerHTML = list.amount;
    td_half.innerHTML = list.isHalf ? "YES" : "NO";
    td_result.innerHTML = "[Result]";
    td_clear.innerHTML = list.isClear
      ? `<span class="text-success">Clear</span>`
      : `<button onClick="setListClear(${index})">Clear</button>`;

    tr.append(td_paidBy);
    tr.append(td_note);
    tr.append(td_amount);
    tr.append(td_half);
    tr.append(td_result);
    tr.append(td_clear);

    listContainer.append(tr);
  });
};

// Event
window.onload = () => {
  loadFromDB();
  drawLists();
  addListButton.addEventListener("click", onAddList);
};
