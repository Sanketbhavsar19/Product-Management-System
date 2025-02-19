// import React, { useEffect, useState } from 'react';
// import { getCategories, addCategory } from '../api';

// const CategoryList = () => {
//     const [categories, setCategories] = useState([]);
//     const [newCategory, setNewCategory] = useState('');

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         const data = await getCategories();
//         setCategories(data);
//     };

//     const handleAddCategory = async () => {
//         if (newCategory) {
//             await addCategory(newCategory);
//             setNewCategory('');
//             fetchCategories();
//         }
//     };

//     return (
//         <div>
//             <h2>Categories</h2>
//             <ul>
//                 {categories.map(category => (
//                     <li key={category.CategoryId}>{category.CategoryName}</li>
//                 ))}
//             </ul>
//             <input
//                 type="text"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//             />
//             <button onClick={handleAddCategory}>Add Category</button>
//         </div>
//     );
// };

// export default CategoryList;


import React, { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../api";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await addCategory(newCategory);
      setNewCategory("");
      fetchCategories();
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setEditedCategoryName(category.CategoryName);
  };

  const handleUpdateCategory = async () => {
    if (editedCategoryName.trim()) {
      await updateCategory(editingCategory.CategoryId, editedCategoryName);
      setEditingCategory(null);
      setEditedCategoryName("");
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try{
    await deleteCategory(categoryId);
    fetchCategories();
    }catch (error) {
      console.log("Failed to delete category:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Category Management
      </Typography>

      {/* Add Category */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="New Category"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add
        </Button>
      </Box>

      {/* Category List */}
      <List>
        {categories.map((category) => (
          <React.Fragment key={category.CategoryId}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" color="primary" onClick={() => handleEditCategory(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleDeleteCategory(category.CategoryId)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              {editingCategory?.CategoryId === category.CategoryId ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
              ) : (
                <ListItemText primary={category.CategoryName} />
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Update Category Button */}
      {editingCategory && (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={() => setEditingCategory(null)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
            Update
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CategoryList;
