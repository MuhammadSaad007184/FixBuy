// product.js

// Sample product data (you can replace this with real data or fetch it from an API)
const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 2499,
    image: 'https://via.placeholder.com/300x200',
    category: 'Electronics',
    description: 'High-quality wireless earbuds with crystal-clear sound.',
    topSelling: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 3999,
    image: 'https://via.placeholder.com/300x200',
    category: 'Electronics',
    description: 'A stylish smart watch with fitness tracking features.',
    topSelling: false
  },
  {
    id: 3,
    name: 'Mini Portable Fan',
    price: 1200,
    image: 'https://via.placeholder.com/300x200',
    category: 'Home & Living',
    description: 'Compact and portable fan for all your cooling needs.',
    topSelling: false
  }
];

// Function to display products
function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';  // Clear the container before adding new products
  
  products.forEach(product => {
    const productCard = `
      <div class="border p-4 rounded shadow hover:shadow-lg">
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-2">
        <h4 class="font-bold">${product.name}</h4>
        <p class="mb-2">Rs. ${product.price}</p>
        <p class="text-sm text-gray-600">${product.description}</p>
        <a href="product-single.html?id=${product.id}" class="bg-blue-900 text-white px-4 py-2 rounded">Order Now</a>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

// Call this function on the pages to display products
// On product list page
document.addEventListener('DOMContentLoaded', () => {
  // Display products on the product listing page
  if (document.getElementById('productList')) {
    displayProducts(products, 'productList');
  }
  
  // Optionally, handle search/filter logic
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  searchInput.addEventListener('input', () => filterProducts());
  categoryFilter.addEventListener('change', () => filterProducts());

  function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    
    const filteredProducts = products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchValue) &&
        (categoryValue === '' || product.category === categoryValue)
      );
    });
    
    displayProducts(filteredProducts, 'productList');
  }
});

// On single product page
function displayProductDetails(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  document.getElementById('productImage').src = product.image;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = `Rs. ${product.price}`;
  document.getElementById('productDescription').textContent = product.description;
  // You can also add a section to handle adding to cart or quantity selection
}

// On product single page
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
  displayProductDetails(productId);
}
