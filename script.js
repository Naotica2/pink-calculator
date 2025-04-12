const display = document.getElementById("display");
let justEvaluated = false;
let history = [];

function append(value) {
  if (justEvaluated) {
    display.value = '';
    justEvaluated = false;
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  if (display.value) {
    if (display.value.startsWith('-')) {
      display.value = display.value.slice(1);
    } else {
      display.value = '-' + display.value;
    }
  }
}

function calculate() {
  try {
    let expression = display.value
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    let result = eval(expression);
    addToHistory(display.value, result);
    display.value = result;
    justEvaluated = true;
  } catch {
    display.value = 'Error';
    justEvaluated = true;
  }
}

function addToHistory(expression, result) {
  history.unshift(`${expression} = ${result}`);
  if (history.length > 6) history.pop();
  renderHistory();
}

function renderHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = history.map((item, index) => {
    return `<p onclick="showHistoryDetail(${index})" style="cursor:pointer">${item}</p>`;
  }).join("");
}

function showHistoryDetail(index) {
  const selected = history[index];
  const [expression, result] = selected.split(" = ");

  document.querySelectorAll(".history-detail").forEach(el => el.remove());

  const detail = document.createElement("div");
  detail.className = "history-detail";
  detail.innerHTML = `
    <p><strong>Question:</strong> ${expression}</p>
    <p><strong>Result:</strong> ${result}</p>
    <button onclick="closeHistoryDetail()" class="close-detail">Close</button>
  `;
  document.getElementById("history").appendChild(detail);
}

function closeHistoryDetail() {
  document.querySelectorAll(".history-detail").forEach(el => el.remove());
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("toggle-theme");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "Light Pink";
  } else {
    btn.textContent = "Dark Pink";
  }
});
