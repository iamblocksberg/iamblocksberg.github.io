// Config
const localDBName = "nn_noteMoneyLists";

// Variable
var lists = [];
const users = [
  {
    id: "nn",
    name: "หนิง",
  },
  {
    id: "o",
    name: "โอ",
  },
];
const usersId = {
  o: "o",
  nn: "nn",
};

// DOM
const listContainer = document.querySelector("#list-container");
const listPaidBy = document.querySelector("#list-paid-by");
const listAmount = document.querySelector("#list-amount");
const textNote = document.querySelector("#text-note");
const isListHalf = document.querySelector("#is-list-half");
const addListButton = document.querySelector("#add-list-button");
const calResultButton = document.querySelector("#cal-result-button");

// Function
const getNameById = (id) => {
  for (const user of users) {
    if (user.id === id) {
      return user.name;
    }
  }
};

const getTotalFromId = (id) => {
  let total = 0;

  for (const list of lists) {
    if (list.isClear === false && list.paidBy === id) {
      const price = parseFloat(list.amount / (list.isHalf ? 2 : 1));
      total += price;
    }
  }

  return total;
};

const calResult = () => {
  let result = "";
  const deptOfO = getTotalFromId(usersId.nn);
  const deptOfNn = getTotalFromId(usersId.o);

  if (deptOfO > deptOfNn) {
    result = `${getNameById(usersId.o)}ต้องให้${getNameById(usersId.nn)} ${
      deptOfO - deptOfNn
    } ฿`;
  } else if (deptOfNn > deptOfO) {
    result = `${getNameById(usersId.nn)}ต้องให้${getNameById(usersId.o)} ${
      deptOfNn - deptOfO
    } ฿`;
  } else {
    result = `ไม่ติดหนี้กัน`;
  }

  alert(result);
};

const saveToDB = () => {
  localStorage.setItem(localDBName, JSON.stringify(lists));
};

const loadFromDB = () => {
  const data = localStorage.getItem(localDBName);
  lists = data ? JSON.parse(data) : [];
};

const removeList = (index) => {
  const cf = confirm("Delete " + lists[index].note + "?");
  if (cf) {
    lists.splice(index, 1);
    drawLists();
    saveToDB();
  }
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

  for (let index = lists.length - 1; index >= 0; index--) {
    const list = lists[index];

    let tr = document.createElement("div");

    const td_paidBy = document.createElement("div");
    const td_note = document.createElement("div");
    const td_amount = document.createElement("div");
    // const td_half = document.createElement("div");
    const td_result = document.createElement("div");
    const td_clear = document.createElement("div");
    const td_remove = document.createElement("div");

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
    td_remove.innerHTML = `<button onClick="removeList(${index})">Remove</button>`;

    let resultText = "";
    let resultAmount = list.isHalf ? list.amount / 2 : list.amount;
    if (list.paidBy === usersId.nn) {
      resultText = `${getNameById(usersId.o)}ต้องให้${getNameById(
        usersId.nn
      )} ${resultAmount} ฿`;
    } else if (list.paidBy === usersId.o) {
      resultText = `${getNameById(usersId.nn)}ต้องให้${getNameById(
        usersId.o
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
    td_remove.className = "width-4 text-right";

    tr.append(td_paidBy);
    tr.append(td_amount);
    // tr.append(td_half);
    tr.append(td_result);
    tr.append(td_clear);
    tr.append(td_note);
    tr.append(td_remove);

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

const drawUserList = () => {
  let isSetSelected = "selected";
  for (const user of users) {
    listPaidBy.innerHTML += `<option value="${user.id}" ${isSetSelected}>${user.name}</option>`;
    if (isSetSelected != "") {
      isSetSelected = "";
    }
  }
};

// Event
window.onload = () => {
  loadFromDB();
  drawLists();
  drawUserList();
  addListButton.addEventListener("click", onAddList);
  calResultButton.addEventListener("click", calResult);
};
