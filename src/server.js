/* eslint-env node */
// ini pake standard eslint
// server.js Memuat kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  server.route(routes); // menjalankan routes

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
