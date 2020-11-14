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
const getNameById = (id) => {
  if (id === "nn") {
    return "หนิง";
  } else if (id === "o") {
    return "โอ";
  }
};

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
    // const td_half = document.createElement("div");
    const td_result = document.createElement("div");
    const td_clear = document.createElement("div");

    td_paidBy.innerHTML = "จ่ายโดย: " + getNameById(list.paidBy);
    td_amount.innerHTML = list.isHalf
      ? `<span class="text-line-through text-description">${
          list.amount
        }</span> ${list.amount / 2} ฿`
      : `${list.amount} ฿`;
    td_note.innerHTML = list.note;
    // td_half.innerHTML = list.isHalf ? "Half" : "Full";
    td_clear.innerHTML = list.isClear
      ? `<span class="text-success">Clear</span>`
      : `<button onClick="setListClear(${index})">Clear</button>`;

    let resultText = "";
    let resultAmount = list.isHalf ? list.amount / 2 : list.amount;
    if (list.paidBy === "nn") {
      resultText = `${getNameById("o")}ต้องให้${getNameById(
        "nn"
      )} ${resultAmount} ฿`;
    } else if (list.paidBy === "o") {
      resultText = `${getNameById("nn")}ต้องให้${getNameById(
        "o"
      )} ${resultAmount} ฿`;
    }
    td_result.innerHTML = resultText;

    tr.className = "card";
    td_paidBy.className = "width-half";
    td_amount.className = "width-half text-right";
    // td_half.className = "width-half";
    td_result.className = "width-8";
    td_clear.className = "width-4 text-right";
    td_note.className = "width-8 text-description";

    tr.append(td_paidBy);
    tr.append(td_amount);
    // tr.append(td_half);
    tr.append(td_result);
    tr.append(td_clear);
    tr.append(td_note);

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
