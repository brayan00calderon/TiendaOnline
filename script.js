// Datos de ejemplo para productos
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
    {
        id: 3,
        name: "Laptop Pro",
        price: 999.99,
        image: "placeholder-laptop.jpg",
        category: "Electrónica"
    },
    {
        id: 4,
        name: "Camiseta Deportiva",
        price: 29.99,
        image: "placeholder-tshirt.jpg",
        category: "Deportes"
    }
];
// Variables del carrito
let cart = [];
let cartTotal = 0;

// Funciones del carrito
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    
    // Actualizar contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `).join('');
    
    // Actualizar total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = `$${cartTotal.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    // Aquí implementarías la integración con un sistema de pago
    alert('Procediendo al pago...');
}

// Cargar productos en la página
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart({
                id: ${product.id},
                name: '${product.name}',
                price: ${product.price},
                image: '${product.image}',
                category: '${product.category}'
            })">Añadir al Carrito</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});