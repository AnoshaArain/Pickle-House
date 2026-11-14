/* =====================================================
   PICKLE HOUSE - script.js
   Edit the SETTINGS and DATA sections below to change
   numbers, prices, products and reviews.
===================================================== */

/* ================= SETTINGS ================= */
const SITE = {
    whatsapp: "923372068698",        // country code + number, no + or spaces
    phoneDisplay: "+92 337 2068698",
    facebook: "",                    // paste your Facebook page link (leave "" to hide)
    instagram: "",                   // paste your Instagram link (leave "" to hide)
    currency: "Rs."
};

// Product prices below are for the 500g jar.
// "mult" decides the price of the other sizes (rounded to the nearest 10).
const SIZES = [
    { id: "250g", label: "250g", mult: 0.55 },
    { id: "500g", label: "500g", mult: 1 },
    { id: "1kg",  label: "1kg",  mult: 1.9 }
];
const DEFAULT_SIZE = "500g";

/* ================= DATA ================= */
const CATEGORIES = [
    { key: "mango",  title: "Mango Pickle",  short: "Mango",  image: "images/mango.svg",
      description: "Sweet, tangy and traditionally spiced homemade mango pickle." },
    { key: "lemon",  title: "Lemon Pickle",  short: "Lemon",  image: "images/lemon.svg",
      description: "Fresh lemon pickle with a perfect balance of sour and spicy flavors." },
    { key: "garlic", title: "Garlic Pickle", short: "Garlic", image: "images/garlic.svg",
      description: "Rich garlic pickle prepared with authentic homemade spices." },
    { key: "mixed",  title: "Mixed Pickle",  short: "Mixed",  image: "images/mixed.svg",
      description: "A delicious mix of seasonal vegetables and aromatic spices." },
    { key: "chilli", title: "Chilli Pickle", short: "Chilli", image: "images/chilli.svg",
      description: "Hot and spicy chilli pickle for those who love bold flavors." }
];

// price = price of the 500g jar. category must match a key above, or "other".
const PRODUCTS = [
    { id: "mango",     name: "Classic Mango Pickle",    price: 650, image: "images/mango.svg",     category: "mango",  popular: true },
    { id: "lemon",     name: "Lemon Pickle",            price: 600, image: "images/lemon.svg",     category: "lemon",  popular: true },
    { id: "mixed",     name: "Mixed Pickle",            price: 700, image: "images/mixed.svg",     category: "mixed",  popular: true },
    { id: "garlic",    name: "Garlic Pickle",           price: 750, image: "images/garlic.svg",    category: "garlic", popular: true },
    { id: "chilli",    name: "Green Chilli Pickle",     price: 650, image: "images/chilli.svg",    category: "chilli" },
    { id: "carrot",    name: "Carrot Pickle",           price: 680, image: "images/carrot.svg",    category: "other" },
    { id: "amla",      name: "Amla Pickle",             price: 700, image: "images/amla.svg",      category: "other" },
    { id: "ginger",    name: "Ginger Pickle",           price: 720, image: "images/ginger.svg",    category: "other" },
    { id: "olive",     name: "Olive Pickle",            price: 850, image: "images/olive.svg",     category: "other" },
    { id: "redchilli", name: "Red Chilli Pickle",       price: 750, image: "images/redchilli.svg", category: "chilli" },
    { id: "vegetable", name: "Mixed Vegetable Pickle",  price: 780, image: "images/vegetable.svg", category: "mixed" },
    { id: "special",   name: "Special Homemade Pickle", price: 900, image: "images/special.svg",   category: "other", popular: true }
];

// SAMPLE REVIEWS - replace these with real feedback from your customers
// before you publish the site.
const REVIEWS = [
    { name: "Ayesha K.", product: "Mango Pickle",  stars: 5, text: "Tastes just like my grandmother's recipe. The spices are perfectly balanced." },
    { name: "Hamza R.",  product: "Garlic Pickle", stars: 5, text: "Packed well and delivered fresh. The garlic pickle went well with everything." },
    { name: "Sana M.",   product: "Lemon Pickle",  stars: 4, text: "Nice sour and spicy taste. I'll order the 1kg jar next time." },
    { name: "Bilal A.",  product: "Mixed Pickle",  stars: 5, text: "Great with biryani and paratha. The whole family finished the jar in a week." }
];

/* ================= HELPERS ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function money(n) {
    return SITE.currency + " " + n.toLocaleString("en-US");
}
function getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
}
function getSize(id) {
    return SIZES.find(s => s.id === id);
}
function unitPrice(product, sizeId) {
    return Math.round((product.price * getSize(sizeId).mult) / 10) * 10;
}
function waLink(text) {
    const base = "https://wa.me/" + SITE.whatsapp;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
}

/* ================= SITE LINKS (phone, WhatsApp, social) ================= */
$$(".js-wa").forEach(a => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });
$$(".js-phone").forEach(el => { el.textContent = SITE.phoneDisplay; });
$$(".js-facebook").forEach(a => {
    if (SITE.facebook) { a.href = SITE.facebook; a.target = "_blank"; a.rel = "noopener"; }
    else a.hidden = true;
});
$$(".js-instagram").forEach(a => {
    if (SITE.instagram) { a.href = SITE.instagram; a.target = "_blank"; a.rel = "noopener"; }
    else a.hidden = true;
});
$$(".js-review-wa").forEach(a => {
    a.href = waLink("Hello Pickle House! I would like to share my review:\n\n");
    a.target = "_blank"; a.rel = "noopener";
});

/* ================= MENU + POPUPS ================= */
const menuBtn = $("#menu-btn");
const mobileMenu = $("#mobile-menu");

function closeMenu() {
    mobileMenu.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
}
menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(open));
});

function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) { popup.classList.add("active"); document.body.classList.add("no-scroll"); }
}
function closePopups() {
    $$(".popup.active").forEach(p => p.classList.remove("active"));
    if (!cartIsOpen()) document.body.classList.remove("no-scroll");
}

document.addEventListener("click", function (e) {
    const opener = e.target.closest("[data-open]");
    if (opener) {
        e.preventDefault();
        closeMenu();
        openPopup(opener.dataset.open);
        return;
    }
    if (e.target.closest(".close") || e.target.classList.contains("popup")) {
        closePopups();
    }
    if (!e.target.closest("#mobile-menu")) closeMenu();
});

/* ================= TOAST ================= */
let toastTimer;
function showToast(message) {
    let toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

/* ================= PRODUCT CARDS ================= */
function productCard(p) {
    const card = document.createElement("article");
    card.className = "card product-card";
    card.dataset.id = p.id;
    card.dataset.size = DEFAULT_SIZE;
    card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h4>${p.name}</h4>
        <div class="sizes" role="group" aria-label="Choose jar size">
            ${SIZES.map(s => `<button type="button" class="size-btn${s.id === DEFAULT_SIZE ? " active" : ""}"
                data-size="${s.id}" aria-pressed="${s.id === DEFAULT_SIZE}">${s.label}</button>`).join("")}
        </div>
        <p class="price">${money(unitPrice(p, DEFAULT_SIZE))}</p>
        <button type="button" class="add-btn">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>`;
    return card;
}

document.addEventListener("click", function (e) {
    const sizeBtn = e.target.closest(".size-btn");
    if (sizeBtn) {
        const card = sizeBtn.closest(".product-card");
        card.dataset.size = sizeBtn.dataset.size;
        $$(".size-btn", card).forEach(b => {
            const on = b === sizeBtn;
            b.classList.toggle("active", on);
            b.setAttribute("aria-pressed", String(on));
        });
        $(".price", card).textContent = money(unitPrice(getProduct(card.dataset.id), card.dataset.size));
        return;
    }
    const addBtn = e.target.closest(".add-btn");
    if (addBtn) {
        const card = addBtn.closest(".product-card");
        addToCart(card.dataset.id, card.dataset.size);
    }
});

/* ================= CART ================= */
function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem("pickleCart"));
        if (!Array.isArray(saved)) return [];
        return saved.filter(i => getProduct(i.id) && getSize(i.size) && Number.isInteger(i.qty) && i.qty > 0);
    } catch (err) {
        return [];
    }
}
let cart = loadCart();

function saveCart() {
    try { localStorage.setItem("pickleCart", JSON.stringify(cart)); } catch (err) { /* storage unavailable */ }
}
function loadCustomer() {
    try { return JSON.parse(localStorage.getItem("pickleCustomer")) || {}; } catch (err) { return {}; }
}
function saveCustomer(data) {
    try { localStorage.setItem("pickleCustomer", JSON.stringify(data)); } catch (err) { /* ignore */ }
}

// Build the cart drawer once
document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" id="cartOverlay"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Your cart" aria-hidden="true">
        <div class="cart-head">
            <h3><i class="fa-solid fa-cart-shopping"></i> Your Cart</h3>
            <button type="button" class="cart-close" id="cartClose" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-foot" id="cartFoot">
            <div class="cart-total"><span>Total</span><strong id="cartTotal"></strong></div>
            <label for="custName">Your name</label>
            <input type="text" id="custName" placeholder="Full name" autocomplete="name">
            <label for="custAddress">Delivery address</label>
            <textarea id="custAddress" rows="2" placeholder="House, street, area, city" autocomplete="street-address"></textarea>
            <a class="order-btn" id="cartOrder" target="_blank" rel="noopener">
                <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
            </a>
            <button type="button" class="clear-btn" id="cartClear">Clear cart</button>
        </div>
    </aside>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`);

const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");
const custName = $("#custName");
const custAddress = $("#custAddress");

function cartIsOpen() { return cartDrawer.classList.contains("open"); }
function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeMenu();
}
function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    if (!$(".popup.active")) document.body.classList.remove("no-scroll");
}

function cartTotal() {
    return cart.reduce((sum, i) => sum + unitPrice(getProduct(i.id), i.size) * i.qty, 0);
}

function buildMessage() {
    const lines = ["Hello Pickle House! 👋", "", "I would like to order:", ""];
    cart.forEach((item, n) => {
        const p = getProduct(item.id);
        const line = unitPrice(p, item.size) * item.qty;
        lines.push(`${n + 1}. ${p.name} (${getSize(item.size).label}) x ${item.qty} = ${money(line)}`);
    });
    lines.push("", "Total: " + money(cartTotal()));
    const name = custName.value.trim();
    const address = custAddress.value.trim();
    if (name || address) lines.push("");
    if (name) lines.push("Name: " + name);
    if (address) lines.push("Address: " + address);
    lines.push("", "Please confirm availability and delivery charges. Thank you!");
    return lines.join("\n");
}

function renderCart() {
    const items = $("#cartItems");
    const count = cart.reduce((n, i) => n + i.qty, 0);

    $$(".cart-count").forEach(b => { b.textContent = count; b.hidden = count === 0; });

    if (cart.length === 0) {
        items.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-jar"></i>
                <p>Your cart is empty.</p>
                <a href="product.html" class="view-btn">Browse pickles</a>
            </div>`;
        $("#cartFoot").hidden = true;
        return;
    }

    $("#cartFoot").hidden = false;
    items.innerHTML = cart.map((item, idx) => {
        const p = getProduct(item.id);
        const price = unitPrice(p, item.size);
        return `
            <div class="cart-row">
                <img src="${p.image}" alt="">
                <div class="cart-info">
                    <h4>${p.name}</h4>
                    <p>${getSize(item.size).label} &middot; ${money(price)}</p>
                    <div class="qty">
                        <button type="button" data-act="dec" data-idx="${idx}" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                        <span aria-label="Quantity">${item.qty}</span>
                        <button type="button" data-act="inc" data-idx="${idx}" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="cart-line">
                    <strong>${money(price * item.qty)}</strong>
                    <button type="button" class="remove" data-act="remove" data-idx="${idx}" aria-label="Remove ${p.name}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`;
    }).join("");

    $("#cartTotal").textContent = money(cartTotal());
    $("#cartOrder").href = waLink(buildMessage());
}

function addToCart(id, size) {
    const found = cart.find(i => i.id === id && i.size === size);
    if (found) found.qty += 1;
    else cart.push({ id, size, qty: 1 });
    saveCart();
    renderCart();
    showToast(`${getProduct(id).name} (${getSize(size).label}) added to cart`);
    $$(".cart-btn").forEach(b => {
        b.classList.remove("bump");
        void b.offsetWidth;
        b.classList.add("bump");
    });
}

$("#cartItems").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    if (btn.dataset.act === "inc") cart[idx].qty += 1;
    if (btn.dataset.act === "dec") cart[idx].qty -= 1;
    if (btn.dataset.act === "remove" || cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    renderCart();
});

$("#cartClear").addEventListener("click", function () {
    cart = [];
    saveCart();
    renderCart();
});

[custName, custAddress].forEach(field => {
    field.addEventListener("input", function () {
        saveCustomer({ name: custName.value, address: custAddress.value });
        if (cart.length) $("#cartOrder").href = waLink(buildMessage());
    });
});

const savedCustomer = loadCustomer();
custName.value = savedCustomer.name || "";
custAddress.value = savedCustomer.address || "";

$$(".cart-btn").forEach(b => b.addEventListener("click", openCart));
$("#cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeCart(); closePopups(); closeMenu(); }
});

// Keep the cart in sync if it changes in another tab
window.addEventListener("storage", function (e) {
    if (e.key === "pickleCart") { cart = loadCart(); renderCart(); }
});

renderCart();

/* ================= HOME PAGE ================= */
const categoryList = $("#categoryList");
if (categoryList) {
    const smallest = SIZES[0];
    CATEGORIES.forEach(c => {
        const prices = PRODUCTS.filter(p => p.category === c.key).map(p => p.price);
        const from = Math.round((Math.min(...prices) * smallest.mult) / 10) * 10;
        const link = document.createElement("a");
        link.className = "card category-card";
        link.href = "product.html?category=" + c.key;
        link.innerHTML = `
            <img src="${c.image}" alt="${c.title}" loading="lazy">
            <h4>${c.short}</h4>
            <p class="price">From ${money(from)}</p>
            <span class="browse-btn">View ${c.short}</span>`;
        categoryList.appendChild(link);
    });
}

const popularList = $("#popularList");
if (popularList) {
    PRODUCTS.filter(p => p.popular).forEach(p => popularList.appendChild(productCard(p)));
}

const reviewList = $("#reviewList");
if (reviewList) {
    REVIEWS.forEach(r => {
        const stars = Array.from({ length: 5 }, (_, i) =>
            `<i class="fa-${i < r.stars ? "solid" : "regular"} fa-star"></i>`).join("");
        const card = document.createElement("figure");
        card.className = "review-card";
        card.innerHTML = `
            <div class="stars" role="img" aria-label="${r.stars} out of 5 stars">${stars}</div>
            <blockquote>${r.text}</blockquote>
            <figcaption><strong>${r.name}</strong><span>${r.product}</span></figcaption>`;
        reviewList.appendChild(card);
    });
}

/* ================= HERO WHEEL ================= */
const wheel = $("#wheel");
if (wheel) {
    const heroTitle = $("#changing-text");
    const heroText = $("#changing-description");
    const step = 360 / CATEGORIES.length;
    let index = 0;
    let turn = 0;
    let timer;

    const jars = CATEGORIES.map((c, i) => {
        const jar = document.createElement("button");
        jar.type = "button";
        jar.className = "wheel-jar";
        jar.style.setProperty("--a", (180 + i * step) + "deg");
        jar.setAttribute("aria-label", "Show " + c.title);
        jar.innerHTML = `<img src="${c.image}" alt="">`;
        jar.addEventListener("click", () => { goTo(i); restart(); });
        wheel.appendChild(jar);
        return jar;
    });

    function show() {
        heroTitle.textContent = CATEGORIES[index].title;
        heroText.textContent = CATEGORIES[index].description;
        wheel.style.setProperty("--w", turn + "deg");
        jars.forEach((j, i) => j.classList.toggle("is-active", i === index));
    }
    function goTo(i) {
        const steps = (i - index + CATEGORIES.length) % CATEGORIES.length;
        turn -= steps * step;
        index = i;
        show();
    }
    function restart() {
        clearInterval(timer);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            timer = setInterval(() => goTo((index + 1) % CATEGORIES.length), 3500);
        }
    }
    show();
    restart();
}

/* ================= PRODUCTS PAGE ================= */
const productsGrid = $("#productsGrid");
if (productsGrid) {
    const searchInput = $("#searchInput");
    const chipBox = $("#chips");
    const resultCount = $("#resultCount");
    const emptyBox = $("#noResults");
    const params = new URLSearchParams(location.search);
    let activeCategory = params.get("category") || "all";
    searchInput.value = params.get("q") || "";

    const chips = [{ key: "all", label: "All" }]
        .concat(CATEGORIES.map(c => ({ key: c.key, label: c.short })))
        .concat([{ key: "other", label: "More" }]);
    if (!chips.some(c => c.key === activeCategory)) activeCategory = "all";

    chipBox.innerHTML = chips.map(c =>
        `<button type="button" class="chip${c.key === activeCategory ? " active" : ""}" data-key="${c.key}">${c.label}</button>`
    ).join("");

    PRODUCTS.forEach(p => productsGrid.appendChild(productCard(p)));
    const cards = $$(".product-card", productsGrid);

    function applyFilter() {
        const q = searchInput.value.trim().toLowerCase();
        let shown = 0;
        cards.forEach(card => {
            const p = getProduct(card.dataset.id);
            const matchesText = !q || p.name.toLowerCase().includes(q);
            const matchesCat = activeCategory === "all" || p.category === activeCategory;
            const visible = matchesText && matchesCat;
            card.hidden = !visible;
            if (visible) shown++;
        });
        resultCount.textContent = shown + (shown === 1 ? " pickle" : " pickles");
        emptyBox.hidden = shown !== 0;
    }

    chipBox.addEventListener("click", function (e) {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        activeCategory = chip.dataset.key;
        $$(".chip", chipBox).forEach(c => c.classList.toggle("active", c === chip));
        applyFilter();
    });
    searchInput.addEventListener("input", applyFilter);
    $("#clearSearch").addEventListener("click", function () {
        searchInput.value = "";
        activeCategory = "all";
        $$(".chip", chipBox).forEach(c => c.classList.toggle("active", c.dataset.key === "all"));
        applyFilter();
        searchInput.focus();
    });
    applyFilter();
}
