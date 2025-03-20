// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function updateCart(count) {
    cartCount += count;
    cartCountElement.textContent = cartCount;
}

// Sample products data
const products = [
    {
        id: 1,
        name: "Smartphone XYZ",
        price: 299.99,
        image: "placeholder-phone.jpg",
        category: "Electrónica"
    },
    {
        id: 2,
        name: "Zapatillas Deportivas",
        price: 89.99,
        image: "placeholder-shoes.jpg",
        category: "Deportes"
    },
    // Add more products as needed
];

// Load products
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="updateCart(1)">Añadir al Carrito</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});