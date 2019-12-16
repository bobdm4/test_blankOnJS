const refs = {
  tab1: document.querySelector("#tab1"),
  tab3: document.querySelector("#tab3"),
  tab2: document.querySelector("#tab2"),
  percent: document.querySelector("#percent"),
  email: document.querySelector("#email"),
  btn_register: document.querySelector("#register")
};

refs.tab1.addEventListener("click", handleDisplayPercent);
refs.tab3.addEventListener("click", handleDisplayPercent);
refs.tab2.addEventListener("click", handleDisplayPercent);
refs.btn_register.addEventListener("click", handleSubmitRegister);

const answers = {
  items: ["answer1", "answer2", "answer3"],
  add(data) {
    this.items.push(data);
  }
};

try {
  let answerListFromLocalstorage = localStorage.getItem("answerList");
  if (answerListFromLocalstorage !== null) {
    if (answerListFromLocalstorage.length > 0) {
      answers.items.push(...JSON.parse(answerListFromLocalstorage));
    }
  }
} catch (e) {
  console.log("loacalStorage error: ", e);
}

function handleDisplayPercent() {
  const tab = document.querySelector("input[type=radio]:checked");
  buildAnswerItem(tab.value);
}

function handleSubmitRegister() {
  if (validateEmail()) {
    const tab = document.querySelector("input[type=radio]:checked");
    answers.add(tab.value);
    localStorage.setItem("answerList", JSON.stringify(answers.items));
  }
}

function buildAnswerItem(item) {
  const data = answers.items;
  const percent = parseFloat(
    (data.filter(el => el === item).length / data.length) * 100
  ).toFixed(2);
  const div = refs.percent;
  switch (item) {
    case "answer1":
      div.innerHTML = `
      <div class="checked">
      <p class="percent">${percent}%</p>
      <p class="answer">людей обращают внимание на A</p>
      </div>`;
      break;
    case "answer2":
      div.innerHTML = `
        <div class="checked">
        <p class="percent">${percent}%</p>
        <p class="answer">людей обращают внимание на Б</p>
        </div>`;
    case "answer3":
      div.innerHTML = `
        <div class="checked">
        <p class="percent">${percent}%</p>
        <p class="answer">людей обращают внимание на B</p>
        </div>`;
    default:
      break;
  }
}

function validateEmail() {
  var emailID = document.querySelector("#email").value;
  const atpos = emailID.indexOf("@");
  const dotpos = emailID.lastIndexOf(".");

  if (atpos < 1 || dotpos - atpos < 2) {
    alert("Проверте коректность введенных данных!");
    document.querySelector("#email").focus();
    return false;
  }
  return true;
}
