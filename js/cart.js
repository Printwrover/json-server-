// cart.js

var tt = 0; // Thêm biến tt ở đầu file để tránh lỗi

// Hàm tính tiền
function tinhTien(price, quantity, index) {
    var tc = price * quantity;
    tt += tc;

    // Update the total column for the specific item
    document.querySelector("#tb_cart").rows[index + 0].cells[3].textContent = tc;

    tinhTongTien();
}

// Mảng chứa sản phẩm trong giỏ hàng
var products = [];
var ship = 10; // Phí ship cố định

// Hàm hiển thị giỏ hàng
function hiengiohang() {
    var cart = JSON.parse(localStorage.getItem("cart"));
    document.getElementById('carts').textContent = cart.length
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
        products = cart;
        products.forEach((pro, index) => {
            var tc = pro.price * pro.quantity;

            var tableBody = document.querySelector("#tb_cart");
            var newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td class="align-middle"><img src="${pro.image}" alt="" style="width: 50px;"> ${pro.name}</td>
                <td class="gia align-middle">${pro.price}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-minus" onclick="decreaseQuantity(${index})">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" id="quantity_${index}" class="form-control form-control-sm bg-secondary border-0 text-center" value="${pro.quantity}">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-plus" onclick="increaseQuantity(${index})">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="tien align-middle">${tc}</td>
                <td class="align-middle">
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(newRow);
        });

        tinhTongTien();
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    var tableBody = document.querySelector("#tb_cart");
    tableBody.innerHTML = "";
    hiengiohang();
}

// Hàm tăng số lượng sản phẩm
function increaseQuantity(index) {
    if (index >= 0) {
        products[index].quantity++;
        updateQuantityDisplay(index);
        tinhTien(products[index].price, products[index].quantity, index);
    }
}

// Hàm giảm số lượng sản phẩm
function decreaseQuantity(index) {
    if (index >= 0 && products[index].quantity > 1) {
        products[index].quantity--;
        updateQuantityDisplay(index);
        tinhTien(products[index].price, products[index].quantity, index);
    }
}

// Hàm cập nhật hiển thị số lượng sản phẩm
function updateQuantityDisplay(index) {
    const inputElement = document.getElementById(`quantity_${index}`);
    if (inputElement) {
        inputElement.value = products[index].quantity;
    }

    saveCartToLocalStorage();
}

// Hàm lưu giỏ hàng vào Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(products));
}

// Hàm tính tổng tiền
function tinhTongTien() {
    tt = 0; // Reset giá trị của tt
    products.forEach((pro) => {
        tt += pro.price * pro.quantity;
    });
    var tc = tt + ship;
    document.getElementById("tt").textContent = tt + " VND";
    document.getElementById("ship").textContent = ship + " VND";
    document.getElementById("tc").textContent = tc + " VND";
}

// Hiển thị giỏ hàng khi trang được load
hiengiohang();
