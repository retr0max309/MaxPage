// Datos de los productos
const products = [
    {
        id: 1,
        name: "Set Lamborghini",
        price: 50.00,
        image: "Images/auto1.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 2,
        name: "Set Porsche",
        price: 150.00,
        image: "Images/auto2.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 3,
        name: "Set Delorean",
        price: 200.00,
        image: "images/auto3.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 4,
        name: "Set Batmobile The Batman",
        price: 80.00,
        image: "Images/auto4.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 5,
        name: "Set Batmobile 1989",
        price: 250.00,
        image: "Images/auto5.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 6,
        name: "Set Coliseo Romano",
        price: 120.00,
        image: "images/coliseo.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 7,
        name: "Set Jack Daniels",
        price: 70.00,
        image: "images/jack.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 8,
        name: "Set El Titanic",
        price: 300.00,
        image: "images/titanic.jpg",
        description: "Descripción breve del producto."
    },
    {
        id: 9,
        name: "Set Alcon Milenario",
        price: 40.00,
        image: "images/falcon.jpg",
        description: "Descripción breve del producto."
    }
];

// Estado del carrito de compras con persistencia en localStorage
let cart = [];

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartDisplay();
});

// Función para agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('Producto no encontrado');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showToast(`${product.name} agregado al carrito`);
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 40px; object-fit: cover;">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price.toFixed(2)}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="me-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateTotals();
}

// Función para actualizar la cantidad de productos
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Función para actualizar los totales del carrito
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.16;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Función para mostrar una notificación de tipo toast
function showToast(message) {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1050';

    toastContainer.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Notificación</strong>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

    document.body.appendChild(toastContainer);
    setTimeout(() => toastContainer.remove(), 3000);
}

// Función para realizar el pago
function checkout() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío');
        return;
    }

    alert('¡Gracias por tu compra! En breve recibirás la confirmación.');
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}
