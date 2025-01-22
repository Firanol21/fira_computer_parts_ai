let products = [];
const cart = [];

// Fetch product data from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        populateProducts();
    })
    .catch(error => console.error('Error fetching product data:', error));

// Populate products in the product list
function populateProducts(filteredProducts = products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
    });
    document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
    updateRecommendations();
}

// Generate recommendations based on cart
function updateRecommendations() {
    const recommendationList = document.getElementById("recommendation-list");
    recommendationList.innerHTML = "";

    const categoriesInCart = cart.map(item => item.category);
    const recommendations = products.filter(product => 
        !cart.includes(product) && categoriesInCart.includes(product.category)
    );

    recommendations.forEach(product => {
        const recommendationDiv = document.createElement("div");
        recommendationDiv.className = "recommendation";
        recommendationDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;
        recommendationList.appendChild(recommendationDiv);
    });
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );
    populateProducts(filteredProducts);
});
