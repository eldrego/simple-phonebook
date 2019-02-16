import express from 'express';
import users from '../controllers/users';
import contacts from '../controllers/contacts';
import verifyToken from '../middlewares/verifyToken';
import validate from '../middlewares/validate';

const router = express.Router();

// Messages
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
});

// Authentication
router.post('/register', validate.register, users.register);
router.post('/login', validate.login, users.login);

// Phone Records
router.post('/contact', verifyToken, validate.create, contacts.create);
router.get('/contact/:id', verifyToken, contacts.getOne);
router.get('/contacts', verifyToken, contacts.getAll);
router.delete('/contact/:id', verifyToken, contacts.delete);
router.put('/contact/:id', verifyToken, validate.update, contacts.update);

// Default
router.get('/*', (req, res) => {
  res.send({ message: 'The endpoint you have initiated does not exist' });
});

module.exports = router;
