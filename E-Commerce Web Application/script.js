const products = [
  {
    id:1,
    name:"Gaming Headphone",
    category:"electronics",
    price:2999,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },

  {
    id:2,
    name:"Smart Watch",
    category:"electronics",
    price:4999,
    image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },

  {
    id:3,
    name:"Modern Shoes",
    category:"shoes",
    price:3499,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },

  {
    id:4,
    name:"Fashion Jacket",
    category:"fashion",
    price:3999,
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },

  {
    id:5,
    name:"Wireless Mouse",
    category:"electronics",
    price:1499,
    image:"https://images.unsplash.com/photo-1527814050087-3793815479db"
  },

  {
    id:6,
    name:"Sneakers",
    category:"shoes",
    price:2799,
    image:"https://images.unsplash.com/photo-1549298916-b41d501d3772"
  }
];

const productContainer = document.getElementById("productContainer");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");

let cart = 0;

function displayProducts(items){

  productContainer.innerHTML = "";

  items.forEach(product => {

    productContainer.innerHTML += `
    
      <div class="product-card">
      
        <img src="${product.image}?auto=format&fit=crop&w=800&q=80">

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>Premium quality futuristic product.</p>

          <div class="price">₹${product.price}</div>

          <button class="add-cart" onclick="addToCart()">
            Add To Cart
          </button>
        </div>

      </div>

    `;
  });
}

displayProducts(products);

function addToCart(){
    cart++;
    cartCount.innerText = cart;
}

/* Search */

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);

});

/* Filter Buttons */

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelector(".filter-btn.active")
        .classList.remove("active");

        btn.classList.add("active");

        const category = btn.dataset.category;

        if(category === "all"){
            displayProducts(products);
        }
        else{

            const filtered = products.filter(product =>
                product.category === category
            );

            displayProducts(filtered);
        }

    });

});
