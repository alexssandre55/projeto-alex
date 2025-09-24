// Elementos
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-input");

const addNoteBtn = document.querySelector(".add-note");

// Funções
function showNotes() {
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);
        
        notesContainer.appendChild(noteElement);
 });
}

function clearNotes() {
    notesContainer.replaceChildren([]);
}

function addNote() {
const notes = getNotes();

    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);
    note.push(noteObject)

    saveNotes(notes);

    noteInput.value = "";
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {

    const element = document.createElement("div");

    element.classList.add("note");

    const textarea = document.createElement("textarea");

    textarea.value = content;

    textarea.placeholder = "Adicionar algum texto...";

    element.appendChild(textarea);

    const pinIcon = document.createElement("i");

    pinIcon.classList.add(...["bi, bi-pin"]);

    element.appendChild(pinIcon);

    if(fixed) {
        element.classList.add("fixed");
    }

    // Evento do elemento
    element.querySelector(".b-pin").addEventListener("click", () => {
      toggleFixNote(id);
    });

    return element;
}

function toggleFixNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);
    showNotes();
}


//Local storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const oederedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return ordereNotes;
};

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Eventos
addNoteBtn.addEventListener("click", () => addNote());

// Inicialização
showNotes();