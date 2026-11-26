

const searchInput = document.getElementById("subjectSearch");

const clearSearch = document.getElementById("clearSearch");

const subjectCards = Array.from(

  document.querySelectorAll(".subject-card")

);

const resourceCount = document.getElementById("resourceCount");

const noResults = document.getElementById("noResults");

const subjectGrid = document.getElementById("subjectGrid");

function filterSubjects() {

  const query = searchInput.value.trim().toLowerCase();

  let visibleCount = 0;

  subjectCards.forEach((card) => {

    const subjectName = card.dataset.subject.toLowerCase();

    const visible = subjectName.includes(query);

    card.hidden = !visible;

    if (visible) visibleCount++;

  });

  resourceCount.textContent =

    `Showing ${visibleCount} of ${subjectCards.length} subjects`;

  noResults.hidden = visibleCount !== 0;

  subjectGrid.hidden = visibleCount === 0;

}

searchInput.addEventListener("input", filterSubjects);

clearSearch.addEventListener("click", () => {

  searchInput.value = "";

  filterSubjects();

  searchInput.focus();

});

filterSubjects();

// Mobile navigation

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(

    "aria-label",

    isOpen ? "Close menu" : "Open menu"

  );

  menuToggle.textContent = isOpen ? "✕" : "☰";

});

mainNav.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");

    menuToggle.textContent = "☰";

  });

});

// Study planner

const studyTask = document.getElementById("studyTask");

const addTask = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

function addStudyTask() {

  const task = studyTask.value.trim();

  if (!task) {

    studyTask.focus();

    studyTask.placeholder = "Type a study task first!";

    return;

  }

  const item = document.createElement("li");

  const taskText = document.createElement("span");

  const removeButton = document.createElement("button");

  taskText.textContent = task;

  removeButton.textContent = "Remove";

  removeButton.type = "button";

  removeButton.setAttribute("aria-label", `Remove ${task}`);

  removeButton.addEventListener("click", () => {

    item.remove();

  });

  item.append(taskText, removeButton);

  taskList.appendChild(item);

  studyTask.value = "";

  studyTask.placeholder = "e.g. Revise Government";

  studyTask.focus();

}

addTask.addEventListener("click", addStudyTask);

studyTask.addEventListener("keydown", (event) => {

  if (event.key === "Enter") addStudyTask();

});

// Quick knowledge check

const quizOptions = document.getElementById("quizOptions");

const quizFeedback = document.getElementById("quizFeedback");

quizOptions.querySelectorAll("button").forEach((button) => {

  button.addEventListener("click", () => {

    const correct = button.dataset.correct === "true";

    quizFeedback.textContent = correct

      ? "Correct! Regular practice and reviewing mistakes help you learn."

      : "Not quite. Try practising regularly and reviewing your mistakes.";

    quizFeedback.style.color = correct ? "#0d966b" : "#c13f3f";

    quizOptions.querySelectorAll("button").forEach((option) => {

      option.disabled = true;

    });

    if (!correct) {

      const retry = document.createElement("button");

      retry.textContent = "Try again";

      retry.className = "btn btn-outline";

      retry.style.marginTop = "8px";

      retry.addEventListener("click", () => {

        quizFeedback.textContent = "";

        retry.remove();

        quizOptions.querySelectorAll("button").forEach((option) => {

          option.disabled = false;

        });

      });

      quizOptions.appendChild(retry);

    }

  });

});

// Footer year

document.getElementById("currentYear").textContent =

  new Date().getFullYear();
