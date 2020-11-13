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
  const defaultTr = ``;

  //   const defaultTr = `
  //   <tr>
  //   <th>Paid By</th>
  //   <th>Note</th>
  //   <th>Amount</th>
  //   <th>Half</th>
  //   <th>Result</th>
  //   <th>Clear</th>
  //   </tr>
  // `;

  listContainer.innerHTML = defaultTr;
};

const drawLists = () => {
  initListContainer();

  for (let index = lists.length - 1; index > 0; index--) {
    const list = lists[index];

    let tr = document.createElement("div");

    const td_paidBy = document.createElement("div");
    const td_note = document.createElement("div");
    const td_amount = document.createElement("div");
    const td_half = document.createElement("div");
    const td_clear = document.createElement("div");
    const td_result = document.createElement("div");

    td_paidBy.innerHTML = list.paidBy;
    td_amount.innerHTML = list.amount + " ฿";
    td_note.innerHTML = list.note;
    td_half.innerHTML = list.isHalf ? "Half" : "Full";
    td_clear.innerHTML = list.isClear
      ? `<span class="text-success">Clear</span>`
      : `<button onClick="setListClear(${index})">Clear</button>`;

      if (list.paidBy === "nn") {

      } else if (list.paidBy === "o") {
        
      }

    td_result.innerHTML = "[Result]";

    tr.className = "card";
    td_paidBy.className = "width-half";
    td_amount.className = "width-half text-right";
    td_note.className = "width-full text-description";
    td_half.className = "width-half";
    td_clear.className = "width-half text-right";
    td_result.className = "width-full";

    tr.append(td_paidBy);
    tr.append(td_amount);
    tr.append(td_note);
    tr.append(td_half);
    tr.append(td_clear);
    tr.append(td_result);

    listContainer.append(tr);
  }

  // lists.forEach((list, index) => {
  //   let tr = document.createElement("div");
  //   tr.className = "card";

  //   const td_paidBy = document.createElement("div");
  //   const td_note = document.createElement("div");
  //   const td_amount = document.createElement("div");
  //   const td_half = document.createElement("div");
  //   const td_result = document.createElement("div");
  //   const td_clear = document.createElement("div");

  //   td_paidBy.innerHTML = list.paidBy;
  //   td_note.innerHTML = list.note;
  //   td_amount.innerHTML = list.amount;
  //   td_half.innerHTML = list.isHalf ? "YES" : "NO";
  //   td_result.innerHTML = "[Result]";
  //   td_clear.innerHTML = list.isClear
  //     ? `<span class="text-success">Clear</span>`
  //     : `<button onClick="setListClear(${index})">Clear</button>`;

  //   tr.append(td_paidBy);
  //   tr.append(td_note);
  //   tr.append(td_amount);
  //   tr.append(td_half);
  //   tr.append(td_result);
  //   tr.append(td_clear);

  //   listContainer.append(tr);
  // });
};

// Event
window.onload = () => {
  loadFromDB();
  drawLists();
  addListButton.addEventListener("click", onAddList);
};
