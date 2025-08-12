// BLACK STREET - E-commerce Website JavaScript
class BlackStreetStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.wishlist = [];
        this.currentView = 'grid';
        this.currentFilters = {
            category: 'all',
            price: 'all',
            size: 'all',
            sort: 'featured'
        };
        this.currentStep = 1;
        this.shippingCost = 0;
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.updateWishlistCount();
        this.renderProducts();
        this.loadCartFromStorage();
        this.loadWishlistFromStorage();
    }

    // Load sample products
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Hoodie Urban Classic",
                category: "hoodies",
                price: 89.99,
                oldPrice: 119.99,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Preto', 'Cinza', 'Azul'],
                rating: 4.8,
                reviews: 124,
                description: "Hoodie premium de algodão com design urbano moderno. Perfeito para uso diário e estilo street.",
                features: ['100% Algodão', 'Bolso canguru', 'Mangas com elástico', 'Capuz com cordão']
            },
            {
                id: 2,
                name: "Camiseta Street Essential",
                category: "tshirts",
                price: 29.99,
                oldPrice: 39.99,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                colors: ['Branco', 'Preto', 'Vermelho'],
                rating: 4.6,
                reviews: 89,
                description: "Camiseta streetwear clássica com caimento premium e gráficos urbanos. Feita para conforto e estilo.",
                features: ['Algodão premium', 'Caimento relaxado', 'Gráficos urbanos', 'Sem etiqueta']
            },
            {
                id: 3,
                name: "Calça Cargo Urban",
                category: "pants",
                price: 79.99,
                oldPrice: 99.99,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
                sizes: ['30', '32', '34', '36', '38'],
                colors: ['Verde', 'Preto', 'Caqui'],
                rating: 4.7,
                reviews: 67,
                description: "Calça cargo funcional com estilo urbano. Múltiplos bolsos e caimento confortável para uso diário.",
                features: ['Bolsos cargo', 'Cintura elástica', 'Tecido durável', 'Caimento moderno']
            },
            {
                id: 4,
                name: "Tênis Retro Pro",
                category: "shoes",
                price: 129.99,
                oldPrice: 159.99,
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
                sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
                colors: ['Branco', 'Preto', 'Vermelho'],
                rating: 4.9,
                reviews: 203,
                description: "Tênis inspirado no retro com tecnologia de conforto moderna. Perfeita combinação de estilo e funcionalidade.",
                features: ['Sola acolchoada', 'Mesh respirável', 'Sola de borracha', 'Design retro']
            },
            {
                id: 5,
                name: "Boné Street Baseball",
                category: "accessories",
                price: 24.99,
                oldPrice: 34.99,
                image: "https://images.unsplash.com/photo-1521369909029-2afc88201f8e?w=400&h=400&fit=crop",
                sizes: ['Único'],
                colors: ['Preto', 'Azul', 'Cinza'],
                rating: 4.5,
                reviews: 45,
                description: "Boné baseball clássico com estética streetwear. Ajuste personalizável e materiais premium.",
                features: ['Tira ajustável', 'Algodão premium', 'Bordado', 'Aba curva']
            },
            {
                id: 6,
                name: "Jaqueta Denim Urban",
                category: "hoodies",
                price: 149.99,
                oldPrice: 199.99,
                image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Azul', 'Preto'],
                rating: 4.8,
                reviews: 156,
                description: "Jaqueta denim inspirada no vintage com detalhes urbanos modernos. Perfeita para layering e street style.",
                features: ['100% Denim', 'Lavagem vintage', 'Múltiplos bolsos', 'Caimento clássico']
            },
            {
                id: 7,
                name: "Camiseta Gráfica Limited",
                category: "tshirts",
                price: 34.99,
                oldPrice: 44.99,
                image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Branco', 'Preto'],
                rating: 4.7,
                reviews: 78,
                description: "Camiseta gráfica de edição limitada com arte urbana exclusiva. Quantidades limitadas disponíveis.",
                features: ['Edição limitada', 'Arte exclusiva', 'Algodão premium', 'Colaboração com artista']
            },
            {
                id: 8,
                name: "Calça Jogger Street",
                category: "pants",
                price: 69.99,
                oldPrice: 89.99,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Cinza', 'Preto', 'Azul'],
                rating: 4.6,
                reviews: 92,
                description: "Calça jogger confortável com estilo streetwear. Punhos elásticos e caimento moderno para lifestyle urbano.",
                features: ['Punhos elásticos', 'Cintura com cordão', 'Bolsos laterais', 'Caimento moderno']
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch(searchInput.value));
        }

        // Filter changes
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sizeFilter = document.getElementById('size-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilters.price = e.target.value;
                this.applyFilters();
            });
        }

        if (sizeFilter) {
            sizeFilter.addEventListener('change', (e) => {
                this.currentFilters.size = e.target.value;
                this.applyFilters();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeView(e.target.dataset.view);
            });
        });

        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(e.target.dataset.category);
            });
        });

        // Cart functionality
        const cartBtn = document.getElementById('cart-btn');
        const closeCartBtn = document.getElementById('close-cart');
        const checkoutBtn = document.getElementById('checkout-btn');
        const continueShoppingBtn = document.getElementById('continue-shopping');

        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => this.toggleCart());
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.openCheckout());
        }

        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => this.toggleCart());
        }

        // Hero buttons
        const shopNowBtn = document.getElementById('shop-now-btn');
        const viewLookbookBtn = document.getElementById('view-lookbook-btn');

        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', () => this.scrollToProducts());
        }

        if (viewLookbookBtn) {
            viewLookbookBtn.addEventListener('click', () => this.showLookbook());
        }

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        // Close modals
        const closeModalBtn = document.getElementById('close-modal');
        const closeCheckoutBtn = document.getElementById('close-checkout');

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        if (closeCheckoutBtn) {
            closeCheckoutBtn.addEventListener('click', () => this.closeCheckout());
        }

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
                this.closeCheckout();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeCheckout();
            }
        });

        // Payment method change
        const paymentOptions = document.querySelectorAll('input[name="payment"]');
        paymentOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                this.togglePaymentForm(e.target.value);
            });
        });
    }

    // Handle search
    handleSearch(query) {
        if (query.length < 2) {
            this.renderProducts();
            return;
        }

        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        this.renderProducts(filteredProducts);
        this.updateResultsCount(filteredProducts.length);
    }

    // Apply filters
    applyFilters() {
        let filteredProducts = [...this.products];

        // Category filter
        if (this.currentFilters.category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.currentFilters.category
            );
        }

        // Price filter
        if (this.currentFilters.price !== 'all') {
            const [min, max] = this.currentFilters.price.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => {
                if (this.currentFilters.price === '200+') {
                    return product.price >= 200;
                }
                return product.price >= min && product.price <= max;
            });
        }

        // Size filter
        if (this.currentFilters.size !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.sizes.includes(this.currentFilters.size.toUpperCase())
            );
        }

        // Sort products
        this.sortProducts(filteredProducts);

        this.renderProducts(filteredProducts);
        this.updateResultsCount(filteredProducts.length);
    }

    // Sort products
    sortProducts(products) {
        switch (this.currentFilters.sort) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                products.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Featured - keep original order
                break;
        }
    }

    // Filter by category
    filterByCategory(category) {
        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        // Update category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }

        this.currentFilters.category = category;
        this.applyFilters();
    }

    // Change view
    changeView(view) {
        this.currentView = view;
        
        // Update view buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update products grid
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.className = `products-grid ${view}-view`;
        }

        this.renderProducts();
    }

    // Render products
    renderProducts(productsToRender = null) {
        const products = productsToRender || this.products;
        const container = document.getElementById('products-container');
        
        if (!container) return;

        container.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
    }

    // Create product card
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.oldPrice ? `<div class="product-badge">PROMOÇÃO</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-category">${product.category.toUpperCase()}</div>
                <div class="product-price">
                    <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="store.addToCart(${product.id})">
                        Adicionar ao Carrinho
                    </button>
                    <button class="add-to-wishlist" onclick="store.toggleWishlist(${product.id})">
                        <i class="fas fa-heart ${this.isInWishlist(product.id) ? 'text-danger' : ''}"></i>
                    </button>
                </div>
            </div>
        `;

        // Add click event to show product details
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart') && !e.target.classList.contains('add-to-wishlist')) {
                this.showProductDetails(product);
            }
        });

        return card;
    }

    // Show product details modal
    showProductDetails(product) {
        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="product-details">
                <div class="product-details-grid">
                    <div class="product-details-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-details-info">
                        <h2>${product.name}</h2>
                        <div class="product-details-category">${product.category.toUpperCase()}</div>
                        <div class="product-details-price">
                            <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                        </div>
                        <div class="product-details-rating">
                            <div class="stars">
                                ${this.generateStars(product.rating)}
                            </div>
                            <span>${product.rating} (${product.reviews} avaliações)</span>
                        </div>
                        <div class="product-details-description">
                            <p>${product.description}</p>
                        </div>
                        <div class="product-details-features">
                            <h4>Características:</h4>
                            <ul>
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="product-details-options">
                            <div class="size-selector">
                                <label>Tamanho:</label>
                                <select id="modal-size-select">
                                    <option value="">Selecionar Tamanho</option>
                                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                                </select>
                            </div>
                            <div class="quantity-selector">
                                <label>Quantidade:</label>
                                <select id="modal-quantity-select">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="product-details-actions">
                            <button class="btn-primary" onclick="store.addToCartFromModal(${product.id})">
                                Adicionar ao Carrinho
                            </button>
                            <button class="btn-secondary" onclick="store.toggleWishlist(${product.id})">
                                ${this.isInWishlist(product.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('open');
    }

    // Generate stars for rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Add to cart
    addToCart(productId, size = 'M', quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => 
            item.productId === productId && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                productId,
                size,
                quantity,
                price: product.price
            });
        }

        this.updateCartCount();
        this.updateCartDisplay();
        this.saveCartToStorage();
        this.showNotification('Produto adicionado ao carrinho!', 'success');
    }

    // Add to cart from modal
    addToCartFromModal(productId) {
        const sizeSelect = document.getElementById('modal-size-select');
        const quantitySelect = document.getElementById('modal-quantity-select');
        
        if (!sizeSelect || !quantitySelect) return;
        
        const size = sizeSelect.value;
        const quantity = parseInt(quantitySelect.value);
        
        if (!size) {
            this.showNotification('Por favor, selecione um tamanho!', 'error');
            return;
        }
        
        this.addToCart(productId, size, quantity);
        this.closeModal();
    }

    // Toggle wishlist
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Removido dos favoritos!', 'info');
        } else {
            this.wishlist.push(productId);
            this.showNotification('Adicionado aos favoritos!', 'success');
        }
        
        this.updateWishlistCount();
        this.saveWishlistToStorage();
        this.renderProducts(); // Refresh to update heart icons
    }

    // Check if product is in wishlist
    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    // Toggle cart sidebar
    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartSubtotal || !cartShipping || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            cartSubtotal.textContent = 'R$ 0,00';
            cartShipping.textContent = 'R$ 0,00';
            cartTotal.textContent = 'R$ 0,00';
            return;
        }

        let subtotal = 0;
        cartItems.innerHTML = '';

        this.cart.forEach(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (!product) return;

            subtotal += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${product.name}</div>
                    <div class="cart-item-size">Tamanho: ${item.size}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="store.removeFromCart(${item.productId}, '${item.size}')">
                    Remover
                </button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Calculate shipping
        this.calculateShipping(subtotal);

        cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        cartShipping.textContent = `R$ ${this.shippingCost.toFixed(2).replace('.', ',')}`;
        cartTotal.textContent = `R$ ${(subtotal + this.shippingCost).toFixed(2).replace('.', ',')}`;
    }

    // Calculate shipping cost
    calculateShipping(subtotal) {
        if (subtotal >= 150) {
            this.shippingCost = 0; // Free shipping
        } else {
            this.shippingCost = 15.90; // Standard shipping
        }
    }

    // Remove from cart
    removeFromCart(productId, size) {
        const index = this.cart.findIndex(item => 
            item.productId === productId && item.size === size
        );
        
        if (index > -1) {
            this.cart.splice(index, 1);
            this.updateCartCount();
            this.updateCartDisplay();
            this.saveCartToStorage();
            this.showNotification('Item removido do carrinho!', 'info');
        }
    }

    // Update cart count
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Update wishlist count
    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
        }
    }

    // Update results count
    updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${count} produtos`;
        }
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('open');
        }
    }

    // Open checkout
    openCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Seu carrinho está vazio!', 'error');
            return;
        }
        
        this.toggleCart();
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal) {
            checkoutModal.classList.add('open');
        }
    }

    // Close checkout
    closeCheckout() {
        const checkoutModal = document.getElementById('checkout-modal');
        if (checkoutModal) {
            checkoutModal.classList.remove('open');
        }
    }

    // Next step in checkout
    nextStep() {
        if (this.currentStep === 1) {
            if (!this.validateShippingForm()) {
                this.showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }
        }

        if (this.currentStep < 3) {
            this.currentStep++;
            this.updateCheckoutSteps();
        }
    }

    // Previous step in checkout
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateCheckoutSteps();
        }
    }

    // Update checkout steps display
    updateCheckoutSteps() {
        const steps = document.querySelectorAll('.checkout-step');
        steps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Validate shipping form
    validateShippingForm() {
        const requiredFields = ['full-name', 'cpf', 'email', 'phone', 'cep', 'address', 'number', 'neighborhood', 'city', 'state'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4757';
            } else if (field) {
                field.style.borderColor = '#333';
            }
        });

        return isValid;
    }

    // Toggle payment form based on selection
    togglePaymentForm(paymentMethod) {
        const cardForm = document.getElementById('card-form');
        if (cardForm) {
            if (paymentMethod === 'card') {
                cardForm.style.display = 'block';
            } else {
                cardForm.style.display = 'none';
            }
        }
    }

    // Finalize order
    finalizeOrder() {
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === 'card') {
            if (!this.validateCardForm()) {
                this.showNotification('Por favor, preencha todos os campos do cartão!', 'error');
                return;
            }
        }

        // Generate order number
        const orderNumber = 'BS' + Date.now().toString().slice(-6);
        
        // Calculate total
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + this.shippingCost;

        // Show success modal
        this.showSuccessModal(orderNumber, total, paymentMethod);
        
        // Clear cart
        this.cart = [];
        this.updateCartCount();
        this.updateCartDisplay();
        this.saveCartToStorage();
        
        // Close checkout
        this.closeCheckout();
    }

    // Validate card form
    validateCardForm() {
        const requiredFields = ['card-number', 'card-name', 'card-expiry', 'card-cvv'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4757';
            } else if (field) {
                field.style.borderColor = '#333';
            }
        });

        return isValid;
    }

    // Show success modal
    showSuccessModal(orderNumber, total, paymentMethod) {
        const successModal = document.getElementById('success-modal');
        const orderNumberSpan = document.getElementById('order-number');
        const orderTotalSpan = document.getElementById('order-total');
        const orderPaymentSpan = document.getElementById('order-payment');

        if (successModal && orderNumberSpan && orderTotalSpan && orderPaymentSpan) {
            orderNumberSpan.textContent = orderNumber;
            orderTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
            
            const paymentMethods = {
                'card': 'Cartão de Crédito',
                'pix': 'PIX',
                'boleto': 'Boleto Bancário'
            };
            
            orderPaymentSpan.textContent = paymentMethods[paymentMethod] || paymentMethod;
            
            successModal.classList.add('open');
        }
    }

    // Close success modal
    closeSuccessModal() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('open');
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll to products
    scrollToProducts() {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Show lookbook
    showLookbook() {
        this.showNotification('Lookbook em breve!', 'info');
    }

    // Load more products
    loadMoreProducts() {
        this.showNotification('Carregando mais produtos...', 'info');
        // In a real app, this would load more products from an API
        setTimeout(() => {
            this.showNotification('Não há mais produtos para carregar!', 'info');
        }, 2000);
    }

    // Save cart to localStorage
    saveCartToStorage() {
        localStorage.setItem('blackStreetCart', JSON.stringify(this.cart));
    }

    // Load cart from localStorage
    loadCartFromStorage() {
        const savedCart = localStorage.getItem('blackStreetCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartCount();
            this.updateCartDisplay();
        }
    }

    // Save wishlist to localStorage
    saveWishlistToStorage() {
        localStorage.setItem('blackStreetWishlist', JSON.stringify(this.wishlist));
    }

    // Load wishlist from localStorage
    loadWishlistFromStorage() {
        const savedWishlist = localStorage.getItem('blackStreetWishlist');
        if (savedWishlist) {
            this.wishlist = JSON.parse(savedWishlist);
            this.updateWishlistCount();
        }
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new BlackStreetStore();
});

// Add CSS for text-danger class
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .text-danger {
        color: #ff4757 !important;
    }
    
    .product-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    
    .product-details-image img {
        width: 100%;
        border-radius: 10px;
    }
    
    .product-details-info h2 {
        font-size: 28px;
        margin-bottom: 10px;
        color: #ffffff;
    }
    
    .product-details-category {
        color: #00ff88;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 15px;
    }
    
    .product-details-price {
        margin-bottom: 20px;
    }
    
    .product-details-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .stars {
        color: #ffc107;
    }
    
    .product-details-description {
        margin-bottom: 25px;
        line-height: 1.6;
        color: #ccc;
    }
    
    .product-details-features {
        margin-bottom: 25px;
    }
    
    .product-details-features h4 {
        color: #ffffff;
        margin-bottom: 15px;
    }
    
    .product-details-features ul {
        list-style: none;
        padding: 0;
    }
    
    .product-details-features li {
        padding: 5px 0;
        position: relative;
        padding-left: 20px;
        color: #ccc;
    }
    
    .product-details-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #00ff88;
        font-weight: bold;
    }
    
    .product-details-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 25px;
    }
    
    .size-selector,
    .quantity-selector {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .size-selector label,
    .quantity-selector label {
        color: #888;
        font-weight: 500;
        font-size: 14px;
    }
    
    .size-selector select,
    .quantity-selector select {
        padding: 10px;
        border: 1px solid #333;
        border-radius: 6px;
        font-size: 14px;
        background: #0a0a0a;
        color: #ffffff;
    }
    
    .product-details-actions {
        display: flex;
        gap: 15px;
    }
    
    .product-details-actions button {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    @media (max-width: 768px) {
        .product-details-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .product-details-options {
            grid-template-columns: 1fr;
        }
        
        .product-details-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(additionalStyles);



