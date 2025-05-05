document.addEventListener("DOMContentLoaded", () => {
  let productsData = [];

  // Fetch product data
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      productsData = products;
      filterProducts(); // Initial render includes both
    });

  // Input elements
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  // Get products from localStorage
  function getManualProducts() {
    return JSON.parse(localStorage.getItem("manualProducts")) || [];
  }

  // Filter and Display products (from JSON + manual)
  function filterProducts() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const allProducts = [...productsData, ...getManualProducts()];

    const filteredProducts = allProducts.filter(product => {
      const title = product.title || product.name;
      const category = product.category || "";
      const matchesSearch = title.toLowerCase().includes(searchQuery);
      const matchesCategory = selectedCategory ? category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
  }

  // Display products
  function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
      const isNew = !product.source; // Assuming newly added don't have 'source'
    
      const productCard = document.createElement("div");
      productCard.className = "bg-white shadow rounded overflow-hidden";

      const title = product.title || product.name;
      const image = product.image;
      const price = product.price;
      const category = product.category || "";
      const source = product.source || "Manual";

      productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold">${product.title}</h3>
          ${isNew ? '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>' : ''}
        </div>
        <p class="text-gray-700 font-bold mb-2">Rs ${product.price}</p>
        <p class="text-sm text-gray-500">Category: ${product.category}</p>
        ${product.source ? `<p class="text-sm text-gray-500">Source: ${product.source}</p>` : ''}
      </div>
    `;
    

      productList.appendChild(productCard);
    });
  }
});

// Handle manual product form submission
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const category = document.getElementById("productCategory").value;
  const image = document.getElementById("productImage").value;
  const topSelling = document.getElementById("topSelling").checked;

  const newProduct = {
    name,
    price,
    category,
    image,
    topSelling
  };

  const existing = JSON.parse(localStorage.getItem("manualProducts")) || [];
  existing.push(newProduct);
  localStorage.setItem("manualProducts", JSON.stringify(existing));

  this.reset();

  // Re-filter after adding a new product
  document.dispatchEvent(new Event("DOMContentLoaded"));
});
