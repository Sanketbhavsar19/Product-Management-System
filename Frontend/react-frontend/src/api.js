// const API_BASE = 'http://localhost:5000/api';

// export const getCategories = async () => {
//     const response = await fetch(`${API_BASE}/categories`);
//     return response.json();
// };

// export const addCategory = async (categoryName) => {
//     const response = await fetch(`${API_BASE}/categories`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ CategoryName: categoryName })
//     });
//     return response.json();
// };

// export const getProducts = async (page, pageSize) => {
//     const response = await fetch(`${API_BASE}/products?page=${page}&pageSize=${pageSize}`);
//     return response.json();
// };

// export const addProduct = async (productName, categoryId) => {
//     const response = await fetch(`${API_BASE}/products`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ProductName: productName, CategoryId: categoryId })
//     });
//     return response.json();
// };

const API_BASE = "http://localhost:5000/api";

// ✅ Fetch all categories (Read)
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ✅ Add a new category (Create)
export const addCategory = async (categoryName) => {
  try {
    const response = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CategoryName: categoryName }),
    });

    if (!response.ok) throw new Error("Failed to add category");
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

// 🔄 Update a category (Update)
export const updateCategory = async (categoryId, categoryName) => {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CategoryName: categoryName }),
    });

    if (!response.ok) throw new Error("Failed to update category");
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
};

// ❌ Delete a category (Delete)
export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete category");
    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
};

// ✅ Fetch paginated products (Read) with default values
export const getProducts = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(`${API_BASE}/products?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// ✅ Add a new product (Create)
export const addProduct = async (productName, categoryId) => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ProductName: productName, CategoryId: categoryId }),
    });

    if (!response.ok) throw new Error("Failed to add product");
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// 🔄 Update a product (Update)
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok){
       throw new Error("Failed to update product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// ❌ Delete a product (Delete)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete product");
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};
