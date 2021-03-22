const options = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://diplom.students.nomoredomains.rocks',
    'https://diplom.students.nomoredomains.rocks',
    'http://millioneri.github.io',
    'https://millioneri.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
