
import React, { useEffect, useState } from "react";
import { 
    getProducts, addProduct, getCategories, updateProduct, deleteProduct
} from "../api";
import { 
    Button, TextField, Select, MenuItem, InputLabel, FormControl, Dialog, 
    DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ ProductName: '', CategoryId: '' });
    const [editProduct, setEditProduct] = useState(null); // Ensure it's null when no edit is in progress
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [page]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts(page, pageSize);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddProduct = async () => {
        if (newProduct.ProductName && newProduct.CategoryId) {
            try {
                await addProduct(newProduct.ProductName, newProduct.CategoryId);
                setNewProduct({ ProductName: '', CategoryId: '' });
                setIsAdding(false);
                fetchProducts(); 
            } catch (error) {
                console.error("Error adding product:", error);
            }
        } else {
            console.error("ProductName and CategoryId are required");
        }
    };

    const handleEditClick = (product) => {
        setEditProduct({ 
            ProductId: product.ProductId, 
            ProductName: product.ProductName, 
            CategoryId: product.CategoryId 
        });
    };


     const handleUpdateProduct = async (productId, updatedData) => {
        try {
            await updateProduct(productId, updatedData);
            fetchProducts(); 
            setEditProduct(null); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    
    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsAdding(!isAdding)}
            >
                {isAdding ? "Cancel" : "Add Product"}
            </Button>

            {isAdding && (
                <div>
                    <TextField
                        label="Product Name"
                        variant="outlined"
                        value={newProduct.ProductName}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newProduct.CategoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, CategoryId: e.target.value })}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.CategoryId} value={category.CategoryId}>
                                    {category.CategoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
                </div>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.ProductId}>
                                <TableCell>{product.ProductId}</TableCell>
                                <TableCell>{product.ProductName}</TableCell>
                                <TableCell>
                                    {categories.find(cat => cat.CategoryId === product.CategoryId)?.CategoryName || "N/A"}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEditClick(product)}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product.ProductId)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Button variant="contained" color="primary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </Button>
                <span> Page {page} </span>
                <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>
                    Next
                </Button>
            </div>

            
            {editProduct && (
                <Dialog open={Boolean(editProduct)} onClose={() => setEditProduct(null)}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            value={editProduct.ProductName}
                            onChange={(e) => setEditProduct({ ...editProduct, ProductName: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={editProduct.CategoryId}
                                onChange={(e) => setEditProduct({ ...editProduct, CategoryId: Number(e.target.value) })}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.CategoryId} value={category.CategoryId}>
                                        {category.CategoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                  
                    <DialogActions>
          <Button 
        onClick={() => handleUpdateProduct(editProduct.ProductId, { 
            ProductName: editProduct.ProductName, 
            CategoryId: editProduct.CategoryId 
        })} 
        variant="contained" 
        color="primary"
    >
        Update
    </Button>
    <Button onClick={() => setEditProduct(null)} variant="contained" color="secondary">
        Cancel
    </Button>
     </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default ProductList;