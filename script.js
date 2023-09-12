let taskList = [];
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");

// get data from data on buttom click
const handleOnSubmit = (form) => {
  const newTask = new FormData(form);

  const obj = {
    id: randomStr(),
    task: newTask.get("task"),
    hr: newTask.get("hr"),
    type: "entry",
  };
  if (ttlHrs + obj.hr > ttlHrPerWeek) {
    return alert(
      "Sorry boss not enough time left to fit this task from last week"
    );
  }
  const ttlHrs = total();

  // add to the global array

  taskList.push(obj);
  console.log(taskList);

  displayEntryTask();
};

// create a function that takes the array ,loop through it and create html and push to the dom.

const displayEntryTask = () => {
  let str = ``;

  const entryListOnly = taskList.filter((item) => item.type === "entry");

  entryListOnly.map((item, i) => {
    str += `
    <tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end">
  <button onclick = "handleOnDelete('${item.id}')"
  class="btn btn-danger">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button
  onclick="switchTask('${item.id}', 'bad')"
  class="btn btn-success">
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
  });

  entryElm.innerHTML = str;
};
const displyBadTask = () => {
  let str = ``;

  const badListOnly = taskList.filter((item) => item.type === "bad");

  badListOnly.map((item, i) => {
    str += `
  <tr>
  <td>${i + 1}</td>
  <td>${item.task}</td>
  <td>${item.hr}hr</td>
  <td class="text-end">
  <button
    onclick="switchTask('${item.id}', 'entry')"
    class="btn btn-warning">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button
    onclick = "handleOnDelete('${item.id}')"
    class="btn btn-danger">
      <i class="fa-solid fa-trash"></i>
    </button>
    
  </td>
  </tr>`;
  });

  badElm.innerHTML = str;
};

const randomStr = () => {
  const charLength = 6;
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let id = "";

  for (let i = 0; i < charLength; i++) {
    const randNum = Math.round(Math.random() * (str.length - 1));
    id += str[randNum];
  }

  return id;
};
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type,
      };
    }
    return item;
  });

  displayEntryTask();
  displayBadTask();
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delte?")) {
    taskList = taskList.filter((item) => item.id !== id);

    displyEntryTask();
    displyBadTask();
    total();
  }
};
const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + item.hr, 0);

  totalHrElm.innerText = ttl;
  return ttl;
};
