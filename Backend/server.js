const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const { CategoryName } = req.body;
    const sql = 'UPDATE categories SET CategoryName = ? WHERE CategoryID = ?';
    db.query(sql, [CategoryName, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ id, CategoryName });
    });
});

app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categories WHERE CategoryID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    });
});


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
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id; 
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
        return res.status(400).json({ error: 'ProductName and CategoryId are required' });
    }

    const sql = 'UPDATE products SET ProductName = ?, CategoryId = ? WHERE ProductId = ?';
    db.query(sql, [ProductName, CategoryId, productId], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id; 

    
    const sql = 'DELETE FROM products WHERE ProductId = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});