const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6761',
    database: 'product_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

// Routes for Category CRUD
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/categories', (req, res) => {
    const { CategoryName } = req.body;
    const sql = 'INSERT INTO categories (CategoryName) VALUES (?)';
    db.query(sql, [CategoryName], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, CategoryName });
    });
});

// Routes for Product CRUD
app.get('/api/products', (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const sql = `
        SELECT p.ProductId, p.ProductName, c.CategoryName, c.CategoryId
        FROM products p
        INNER JOIN categories c ON p.CategoryId = c.CategoryId
        LIMIT ? OFFSET ?
    `;
    db.query(sql, [parseInt(pageSize), parseInt(offset)], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    const { ProductName, CategoryId } = req.body;
    const sql = 'INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)';
    db.query(sql, [ProductName, CategoryId], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ProductName, CategoryId });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});