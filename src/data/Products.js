let products = [
  {
    id: 1,
    name: "Sourdough Bread",
    price: 5.99,
    image: "https://via.placeholder.com/150?text=Sourdough+Bread"
  },
  {
    id: 2,
    name: "Croissant",
    price: 2.99,
    image: "https://via.placeholder.com/150?text=Croissant"
  },
  {
    id: 3,
    name: "Chocolate Cake",
    price: 15.99,
    image: "https://via.placeholder.com/150?text=Chocolate+Cake"
  },
  {
    id: 4,
    name: "Cinnamon Roll",
    price: 3.99,
    image: "https://via.placeholder.com/150?text=Cinnamon+Roll"
  },
  {
    id: 5,
    name: "Blueberry Muffin",
    price: 1.99,
    image: "https://via.placeholder.com/150?text=Blueberry+Muffin"
  }
];

// Simulate API calls
export const getProducts = () => {
  return products;
};

export const addProduct = (newProduct) => {
  products.push(newProduct);
};

export const editProduct = (updatedProduct) => {
  products = products.map(product =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

export const deleteProduct = (id) => {
  products = products.filter(product => product.id !== id);
};
