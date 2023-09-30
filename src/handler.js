// handler.js: Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
const { nanoid } = require('nanoid'); // import package u menangani properti id
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16); // memberikan parameter number yang merupakan ukuran dari string id
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote); // masukan nilai-nilai tersebut ke dalam array notes dengan method push()

  // method filter() berdasarkan id catatan untuk mengetahui apkh newNote sdh msk ke array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) { // gunakan isSuccess untuk menentukan respons yang diberikan server
    const response = h.response({
      status: 'success', // Jika isSuccess bernilai true
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail', // Jika isSuccess bernilai false
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // Stlh dpt nilai id dapatkn note dgn id tsb dr array notes menggunakan filter() u dapat objeknya
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  // dapatkan data notes baru yg dikirim client melalui body request
  const updatedAt = new Date().toISOString();
  // perbarui nilai dari updatedAt. dapatkan nilai terbaru dengan new Date().toISOString().

  const index = notes.findIndex((note) => note.id === id); // mengubah note lama dengan data terbaru
  // dapatkan dulu index array pada objek catatan sesuai id yang ditentukan dgn findIndex()
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  // dapatkan index dari objek catatan sesuai dengan id yang didapat
  if (index !== -1) {
    notes.splice(index, 1); // splice() untuk menghapus data pada array berdasarkan index
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  } // pengecekan terhadap nilai index

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
