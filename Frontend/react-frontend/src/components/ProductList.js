
// import React, { useEffect, useState } from "react";
// import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "../api";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [newProduct, setNewProduct] = useState({ ProductName: '', CategoryName: '' });

//     const [editProduct, setEditProduct] = useState(null); // Store the product being edited
//     const [page, setPage] = useState(1);
//     const [pageSize] = useState(10);

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, [page]);

//     const fetchProducts = async () => {
//         try {
//             const data = await getProducts(page, pageSize);
//             setProducts(data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const fetchCategories = async () => {
//         const data = await getCategories();
//         setCategories(data);
//     };

//     const handleAddProduct = async () => {
//         if (newProduct.ProductName && newProduct.CategoryName) {
//             const category = categories.find(cat => cat.CategoryName === newProduct.CategoryName);
//             if (category) {
//                 await addProduct(newProduct.ProductName, category.CategoryId);
//                 setNewProduct({ ProductName: '', CategoryName: '' });
//                 fetchProducts();
//             } else {
//                 console.error('Category not found');
//             }
//         } else {
//             console.error('ProductName and CategoryName are required');
//         }
//     };

//     const handleEditClick = (product) => {
//         setEditProduct(product); // Open edit modal with product details
//     };

//     const handleUpdateProduct = async () => {
//         if (editProduct) {
//             await updateProduct(editProduct.ProductId, {
//                 ProductName: editProduct.ProductName,
//                 CategoryId: editProduct.CategoryId
//             });
//             setEditProduct(null); // Close modal after update
//             fetchProducts();
//         }
//     };

//     const handleDeleteProduct = async (productId) => {
//         await deleteProduct(productId);
//         fetchProducts();
//     };

//     return (
//         <div>
//             <h2>Products</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Product ID</th>
//                         <th>Product Name</th>
//                         <th>Category Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => (
//                         <tr key={product.ProductId}>
//                             <td>{product.ProductId}</td>
//                             <td>{product.ProductName}</td>
//                             <td>{product.CategoryName || "N/A"}</td>
//                             <td>
//                                 <button onClick={() => handleEditClick(product)}>Edit</button>
//                                 <button onClick={() => handleDeleteProduct(product.ProductId)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div>
//                 <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
//                 <span>Page {page} </span>
//                 <button onClick={() => setPage(page + 1)}>Next</button>
//             </div>

//             <div>
//                 <h3>Add New Product</h3>
//                 <input
//                     type='text'
//                     placeholder="Product Name"
//                     value={newProduct.ProductName}
//                     onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
//                 />
//                 <select
//                     value={newProduct.CategoryName}
//                     onChange={(e) => setNewProduct({ ...newProduct, CategoryName: e.target.value })}
//                 >
//                     <option value="">Select a category</option>
//                     {categories.map(category => (
//                         <option key={category.CategoryId} value={category.CategoryName}>
//                             {category.CategoryName}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleAddProduct}>Add Product</button>
//             </div>

//             {/* Edit Product Modal */}
//             {editProduct && (
//                 <div className="modal">
//                     <h3>Edit Product</h3>
//                     <input
//                         type='text'
//                         value={editProduct.ProductName}
//                         onChange={(e) => setEditProduct({ ...editProduct, ProductName: e.target.value })}
//                     />
//                     <select
//                         value={editProduct.CategoryId}
//                         onChange={(e) => setEditProduct({ ...editProduct, CategoryId: Number(e.target.value) })}
//                     >
//                         {categories.map(category => (
//                             <option key={category.CategoryId} value={category.CategoryId}>
//                                 {category.CategoryName}
//                             </option>
//                         ))}
//                     </select>
//                     <button onClick={handleUpdateProduct}>Update</button>
//                     <button onClick={() => setEditProduct(null)}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductList;



// import React, { useEffect, useState } from "react";
// import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "../api";
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, InputLabel, FormControl, Paper } from "@mui/material";
// import { styled } from "@mui/system";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [newProduct, setNewProduct] = useState({ ProductName: '', CategoryName: '' });
//     const [editProduct, setEditProduct] = useState(null);
//     const [page, setPage] = useState(1);
//     const [pageSize] = useState(10);
//     const [loading, setLoading] = useState(false); // For loading state

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, [page]);

//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const data = await getProducts(page, pageSize);
//             setProducts(data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const data = await getCategories();
//             setCategories(data);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     const handleAddProduct = async () => {
//         if (newProduct.ProductName && newProduct.CategoryName) {
//             const category = categories.find(cat => cat.CategoryName === newProduct.CategoryName);
//             if (category) {
//                 try {
//                     await addProduct(newProduct.ProductName, category.CategoryId);
//                     setNewProduct({ ProductName: '', CategoryName: '' });
//                     fetchProducts(); // Fetch products again after adding
//                 } catch (error) {
//                     console.error("Error adding product:", error);
//                 }
//             } else {
//                 console.error('Category not found');
//             }
//         } else {
//             console.error('ProductName and CategoryName are required');
//         }
//     };

//     const handleEditClick = (product) => {
//         setEditProduct(product);
//     };

//     const handleUpdateProduct = async () => {
//         if (editProduct) {
//             try {
//                 await updateProduct(editProduct.ProductId, {
//                     ProductName: editProduct.ProductName,
//                     CategoryId: editProduct.CategoryId
//                 });
//                 setEditProduct(null); // Close modal after update
//                 fetchProducts();
//             } catch (error) {
//                 console.error("Error updating product:", error);
//             }
//         }
//     };

//     const handleDeleteProduct = async (productId) => {
//         try {
//             await deleteProduct(productId);
//             fetchProducts();
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     // Styled Components using MUI's styled system
//     const PageContainer = styled('div')({
//         padding: '20px',
//         backgroundColor: '#f4f4f9',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     });

//     const FormContainer = styled('div')({
//         marginBottom: '20px',
//         padding: '20px',
//         backgroundColor: '#ffffff',
//         borderRadius: '8px',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//     });

//     const Title = styled('h3')({
//         fontSize: '24px',
//         marginBottom: '10px',
//         color: '#333',
//     });

//     const TableWrapper = styled(Paper)({
//         marginTop: '20px',
//         padding: '20px',
//         backgroundColor: '#fff',
//         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//         borderRadius: '8px',
//     });

//     const ActionIcon = styled('span')({
//         marginLeft: '10px',
//         cursor: 'pointer',
//     });

//     return (
//         <PageContainer>
//             {/* Add New Product Form */}
//             <FormContainer>
//                 <Title>Add New Product</Title>
//                 <TextField
//                     label="Product Name"
//                     variant="outlined"
//                     fullWidth
//                     value={newProduct.ProductName}
//                     onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
             
//                     sx={{
//                         "& .MuiInputBase-input": {
//                           caretColor: "#FF6347", // Red cursor
//                           fontSize: "16px", // Adjust font size
//                         },
//                       }}
//              />
//                 <FormControl fullWidth variant="outlined" margin="normal">
//                     <InputLabel>Select Category</InputLabel>
//                     <Select
//                         value={newProduct.CategoryName}
//                         onChange={(e) => setNewProduct({ ...newProduct, CategoryName: e.target.value })}
//                         label="Select Category"
//                     >
//                         <MenuItem value="">Select a category</MenuItem>
//                         {categories.map((category) => (
//                             <MenuItem key={category.CategoryId} value={category.CategoryName}>
//                                 {category.CategoryName}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
//             </FormContainer>

//             {/* Product List Table */}
//             <TableWrapper>
//                 <Title>Product List</Title>
//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Product ID</TableCell>
//                                 <TableCell>Product Name</TableCell>
//                                 <TableCell>Category Name</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={4}>Loading...</TableCell>
//                                 </TableRow>
//                             ) : (
//                                 products.map((product) => (
//                                     <TableRow key={product.ProductId}>
//                                         <TableCell>{product.ProductId}</TableCell>
//                                         <TableCell>{product.ProductName}</TableCell>
//                                         <TableCell>{product.CategoryName || "N/A"}</TableCell>
//                                         <TableCell>
//                                             <ActionIcon onClick={() => handleEditClick(product)}>
//                                                 <EditIcon />
//                                             </ActionIcon>
//                                             <ActionIcon onClick={() => handleDeleteProduct(product.ProductId)}>
//                                                 <DeleteIcon />
//                                             </ActionIcon>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 <Pagination
//                     count={Math.ceil(products.length / pageSize)}
//                     page={page}
//                     onChange={(e, value) => setPage(value)}
//                     variant="outlined"
//                     shape="rounded"
//                 />
//             </TableWrapper>

//             {/* Edit Product Modal */}
//             <Dialog open={editProduct !== null} onClose={() => setEditProduct(null)}>
//                 <DialogTitle>Edit Product</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Product Name"
//                         variant="outlined"
//                         fullWidth
//                         value={editProduct?.ProductName || ''}
//                         onChange={(e) => setEditProduct({ ...editProduct, ProductName: e.target.value })}
//                     />
//                     <FormControl fullWidth variant="outlined" margin="normal">
//                         <InputLabel>Select Category</InputLabel>
//                         <Select
//                             value={editProduct?.CategoryId || ''}
//                             onChange={(e) => setEditProduct({ ...editProduct, CategoryId: Number(e.target.value) })}
//                             label="Select Category"
//                         >
//                             {categories.map((category) => (
//                                 <MenuItem key={category.CategoryId} value={category.CategoryId}>
//                                     {category.CategoryName}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleUpdateProduct} color="primary">Update</Button>
//                     <Button onClick={() => setEditProduct(null)} color="secondary">Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </PageContainer>
//     );
// };

// export default ProductList;




import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories } from "../api";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ ProductName: '', CategoryName: '' });
    const [editProduct, setEditProduct] = useState(null); // Store the product being edited
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [isAdding, setIsAdding] = useState(false); // To toggle the add product form

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
        const data = await getCategories();
        setCategories(data);
    };

    const handleAddProduct = async () => {
        if (newProduct.ProductName && newProduct.CategoryName) {
            const category = categories.find(cat => cat.CategoryName === newProduct.CategoryName);
            if (category) {
                await addProduct(newProduct.ProductName, category.CategoryId);
                setNewProduct({ ProductName: '', CategoryName: '' });
                setIsAdding(false); // Hide the form after adding
                fetchProducts(); // Re-fetch products after adding
            } else {
                console.error('Category not found');
            }
        } else {
            console.error('ProductName and CategoryName are required');
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product); // Set the product to be edited
    };

    const handleUpdateProduct = async () => {
        if (editProduct) {
            const updatedProduct = {
                ProductName: editProduct.ProductName,
                ProductId: editProduct.ProductId
            };
            try {
                await updateProduct(editProduct.ProductId, updatedProduct); // Pass the updated product data
                setEditProduct(null); // Close modal after update
                fetchProducts(); // Re-fetch products after update
            } catch (error) {
                console.error("Error updating product:", error);
            }
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId); // Delete the product by ID
            fetchProducts(); // Re-fetch products after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            
            {/* Toggle Add Product Form */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsAdding(!isAdding)}
            >
                {isAdding ? "Cancel" : "Add Product"}
            </Button>

            {/* Add Product Form */}
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
                            value={newProduct.CategoryName}
                            onChange={(e) => setNewProduct({ ...newProduct, CategoryName: e.target.value })}
                        >
                            <MenuItem value="">Select a category</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.CategoryId} value={category.CategoryName}>
                                    {category.CategoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
                </div>
            )}

            {/* Product List Table */}
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
                                <TableCell>{product.CategoryName || "N/A"}</TableCell>
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
                <Button variant="contained" color="primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                <span>Page {page}</span>
                <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>Next</Button>
            </div>

            {/* Edit Product Modal */}
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
                        <Button onClick={handleUpdateProduct} variant="contained" color="primary">Update</Button>
                        <Button onClick={() => setEditProduct(null)} variant="contained" color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default ProductList;
