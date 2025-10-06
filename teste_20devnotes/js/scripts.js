

    document.addEventListener('DOMContentLoaded', function() {
            // Elementos DOM
            const notesContainer = document.getElementById('notes-container');
    const noteContentInput = document.getElementById('note-content');
    const addNoteButton = document.querySelector('.add-note');
    const searchInput = document.getElementById('search-input');
    const exportButton = document.getElementById('export-notes');

    // Carregar notas do localStorage
    let notes = JSON.parse(localStorage.getItem('devnotes')) || [];

    // Função para salvar notas no localStorage
    function saveNotes() {
        localStorage.setItem('devnotes', JSON.stringify(notes));
            }

    // Função para criar uma nova nota
    function createNoteElement(note, index) {
                const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
    <div class="note-content">${note.content}</div>
    <div class="note-date">${new Date(note.date).toLocaleString('pt-BR')}</div>
    <div class="note-actions">
        <button class="note-action delete-note" data-index="${index}">
            <i class="bi bi-trash"></i>
        </button>
    </div>
    `;
    return noteElement;
            }

    // Função para renderizar notas
    function renderNotes(filteredNotes = null) {
                const notesToRender = filteredNotes || notes;

    if (notesToRender.length === 0) {
        notesContainer.innerHTML = `
                        <div class="empty-state">
                            <i class="bi bi-journal-x"></i>
                            <h3>Nenhuma nota encontrada</h3>
                            <p>${filteredNotes ? 'Tente ajustar sua busca' : 'Adicione sua primeira nota acima'}</p>
                        </div>
                    `;
    return;
                }

    notesContainer.innerHTML = '';
                notesToRender.forEach((note, index) => {
                    const noteElement = createNoteElement(note, index);
    notesContainer.appendChild(noteElement);
                });

                // Adicionar event listeners aos botões de deletar
                document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            deleteNote(index);
        });
                });
            }

    // Função para adicionar uma nova nota
    function addNote() {
                const content = noteContentInput.value.trim();

    if (content === '') {
        alert('Por favor, digite o conteúdo da nota.');
    return;
                }

    const newNote = {
        content: content,
    date: new Date().toISOString()
                };

    notes.unshift(newNote);
    saveNotes();
    renderNotes();
    noteContentInput.value = '';
    noteContentInput.focus();
            }

    // Função para deletar uma nota
    function deleteNote(index) {
                if (confirm('Tem certeza que deseja excluir esta nota?')) {
        notes.splice(index, 1);
    saveNotes();
    renderNotes();
                }
            }

    // Função para filtrar notas
    function filterNotes() {
                const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        renderNotes();
    return;
                }

                const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm)
    );

    renderNotes(filteredNotes);
            }

    // Função para exportar notas como CSV
    function exportToCSV() {
                if (notes.length === 0) {
        alert('Não há notas para exportar.');
    return;
                }

    let csvContent = "Conteúdo,Data\n";
                
                notes.forEach(note => {
                    const escapedContent = `"${note.content.replace(/"/g, '""')}"`;
    const formattedDate = new Date(note.date).toLocaleString('pt-BR');
    csvContent += `${escapedContent},${formattedDate}\n`;
                });

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'devnotes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
            }

    // Event Listeners
    addNoteButton.addEventListener('click', addNote);

    noteContentInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
        addNote();
                }
            });

    searchInput.addEventListener('input', filterNotes);

    exportButton.addEventListener('click', exportToCSV);

    // Renderizar notas iniciais
    renderNotes();
        });