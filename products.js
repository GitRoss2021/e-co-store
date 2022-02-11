let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))

  // Array of Objects 

  : [
      {
        title: "Chicago Winds CC-TR2100L Pocket Trumpet",
        category: "Trumpet",
        price: 350000,
        img: "https://sc1.musik-produktiv.com/pic-010120829xl/chicago-winds-cc-tr2100l-pocket-trumpet.jpg",
      },
      {
        title: "Alto Saxophone",
        category: "Saxophone",
        price: 309000,
        img: "https://hellomusictheory.com/wp-content/uploads/2021/01/alto-saxophone.jpg",
      },
      {
        title: "Spinet harpsichord",
        category: "Harpsichord",
        price: 400000,
        img: "https://www.jc-neupert.de/images/virtuemart/product/Z1%20Original.jpg",
      },
      {
        title: "Cherrystone Headless Electric guitar DIY Kit",
        category: "Guitar",
        price: 120000,
        img: "https://m.media-amazon.com/images/I/61ZWfwDOy0L._AC_SX425_.jpg",
      },
      {
        title: "SR370E-NNB",
        category: "Guitar",
        price: 1589000,
        img: "https://images.musicstore.de/images/1280/human-base-jonas-4-fretless-nat-4-string-e-bass-guitar-natural_1_BAS0000551-002.jpg",
      },
      {
        title: "Regal RC-56 Copper",
        category: "Guitar",
        price: 1000000,
        img: "https://cdn3.volusion.com/4n9y2.qupg5/v/vspfiles/photos/RC-56-2.jpg?v-cache=1394115481",
      },
    ];

// CRUD System

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
// READ
function readProducts(products) {
  document.querySelector("#badge").innerHTML = cart.length;
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
<div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <input type="number" min=1 value=1 id="addToCart${position}" style="width:45px">
          <button type="button" data-toggle="tooltip" title="Add to cart" class="btn btn-secondary"  onclick="addToCartProduct(${position})" >
          <i class="material-icons">add_shopping_cart</i>
          </button>
          <button type="button" data-toggle="tooltip" title="Edit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            <i class="material-icons">edit</i>
          </button>
          <button type="button" data-toggle="tooltip" title="Delet" class="btn btn-danger" onclick="deleteProduct(${position})" >
          <i class="material-icons">delete_sweep</i>
          </button>


              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Haval">Haval</option>
                          <option value="BMW">BMW</option>
                          <option value="Mercedes">Mercedes</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}

readProducts(products);

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCartProduct(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  // alert(`Added ${qty} to cart`);

  cart.push({ ...products[position], qty });
  document.querySelector("#badge").innerHTML = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// SORT BY CATEGORY
function sortCategory() {
  let category = document.getElementById("sortCategory").value;

  if (category == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter(product => {
    return product.category == category
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}


// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
console.log(products)