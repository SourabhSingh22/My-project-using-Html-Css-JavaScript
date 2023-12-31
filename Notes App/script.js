const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox);
    inputBox.appendChild(img);
    updateNotes();
});

function updateNotes() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.addEventListener("input", updateStorage);
    });
}

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

notesContainer.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("input-box") && e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
});

updateNotes(); // Call to initialize the notes' event listeners
