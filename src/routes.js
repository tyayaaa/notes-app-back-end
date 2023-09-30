const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

// routes.js Memuat kode konfigurasi routing server
const routes = [
  { // membuat notes
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  { // menampilkan notes
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  { // membaca notes
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  { // mengedit notes
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },

  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
