const items = document.querySelectorAll(".items");
const allStatus = document.querySelectorAll(".status");
let draggableItems = null;

items.forEach((item) => {
   item.addEventListener("dragstart", dragStart);
   item.addEventListener("dragend", dragEnd);
});

//! dragstart
function dragStart() {
   draggableItems = this;
   console.log("dragStart");
}

//! dragend
function dragEnd() {
   draggableItems = null;
   console.log("dragEnd");
}

allStatus.forEach((status) => {
   status.addEventListener("dragover", dragOver);
   status.addEventListener("dragenter", dragEnter);
   status.addEventListener("dragleave", dragLeave);
   status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
   e.preventDefault(); //! default behavior is not allowing us to drag and drop elements that's why we have to prevent default
   //! event e.stoppropagation
}

function dragEnter() {
   // console.log("dragEnter");
}

function dragLeave() {
   // console.log("dragLeave");
}

function dragDrop() {

   this.append(draggableItems);

   // console.log("dropped");
}

//! modal
const modalBtn = document.querySelectorAll("[data-target-modal]");
const closeModal = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

//! Open Modal
modalBtn.forEach((btn) => {
   btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.targetModal).classList.add("active");
      overlay.classList.add("active");
   });
});

//! Close Modal
closeModal.forEach((btn) => {
   btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("active");
      overlay.classList.remove("active");
   });
});

//! Clicking anywhere will also close the modal
window.onclick = (event) => {
   if (event.target == overlay) {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => modal.classList.remove("active"));
      overlay.classList.remove("active");
   }
};

//! create items  
const submit = document.getElementById("submit");
submit.addEventListener("click", createItems);

//! For remaining characters
const inputElement = document.getElementById('input');
const maxLength = inputElement.maxLength;
const number = document.getElementById('remaining-chars');
inputElement.addEventListener('input', remainingChar);

//! create items function
function createItems() {
   const div = document.createElement("div");
   const inputValue = document.getElementById("input").value;
   const txt = document.createTextNode(inputValue);

   div.appendChild(txt);
   div.classList.add("items");
   div.setAttribute("draggable", "true");

   //! span for delete icon
   const span = document.createElement("span");
   const spanText = document.createTextNode("\u00D7");
   span.classList.add("close");
   span.appendChild(spanText);

   div.appendChild(span);

   //! noStatus parent for div
   noStatus.appendChild(div);

   //! delete created items
   span.addEventListener("click", () => {
      span.parentElement.remove();
   });

   div.addEventListener("dragstart", dragStart);
   div.addEventListener("dragend", dragEnd);

   //! for resetting the input
   document.getElementById("input").value = "";

   //! for removing overlay
   form.classList.remove("active");
   overlay.classList.remove("active");

   //! for resetting the remaining char number
   number.textContent = maxLength;

}

//! For remaining characters function
function remainingChar(event) {
   const enteredText = event.target.value;
   const enteredTextLength = enteredText.length;
   const remaining = maxLength - enteredTextLength;
   number.textContent = remaining;

   if (remaining <= 5) {
      number.classList.add('warning');
      inputElement.classList.add('warning');
   } else {
      number.classList.remove('warning');
      inputElement.classList.remove('warning');
   }
}

