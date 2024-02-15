const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Mock authors data
const authors = [];
let cnt = 1

const login = (req, res) => {
  const { email, password } = req.body;
  const author = authors.find(author => author.email === email);
  if (!author || !bcrypt.compareSync(password, author.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: author.id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful', token });
};

const register = (req, res) => {
  const { name, email, password } = req.body;
  // Check if email already exists
  if (authors.find(author => author.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newAuthor = { id: cnt++, name, email, password: hashedPassword };
  authors.push(newAuthor);
  res.status(201).json({ message: 'Author registered successfully' });
  console.log(authors);
};

module.exports = { login, register };
