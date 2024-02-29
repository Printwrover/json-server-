var proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");

if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", function () {
        createOrder();
    });
} else {
    console.error("Button with id 'proceedToCheckoutBtn' not found.");
}

function createOrder() {
    var firstNameInput = document.querySelector("#firstName");
    var lastNameInput = document.querySelector("#lastName");
    var emailInput = document.querySelector("#email");
    var phoneInput = document.querySelector("#phone");
    var addressInput = document.querySelector("#add");

    if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !addressInput) {
        console.error("One or more input elements not found.");
        return;
    }

    var firstName = firstNameInput.value.trim();
    var lastName = lastNameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    var add = addressInput.value.trim();

    if (firstName === "" && lastName === "") {
        alert("Chưa nhập họ tên");
        return;
    }
    if (email === "") {
        alert("Chưa nhập email");
        return;
    }
    if (phone === "") {
        alert("Chưa nhập số điện thoại");
        return;
    }
    if (add === "") {
        alert("Chưa nhập địa chỉ giao hàng");
        return;
    }

    var order = {
        "customer_name": lastName + " " + firstName,
        "customer_address": add,
        "customer_email": email,
        "customer_phone_number": phone,
        "created_date": new Date().toISOString().slice(0, 10),
        "status": "Chờ xử lý"
    };

    var url = "http://localhost:3000/orders";
    var option = {
        method: "post",
        body: JSON.stringify(order),
        headers: { "Content-Type": 'application/json' }
    };

    fetch(url, option)
        .then(res => res.json())
        .then(data => {
            var orderId = data.id;
            saveOrderDetails(orderId);
            alert("Đơn hàng của bạn đã được tạo thành công!");
            clearCartAndRefresh();
        })
        .catch(error => {
            console.error("Error creating order:", error);
            alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.");
        });
}

function saveOrderDetails(orderId) {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart && Array.isArray(cart)) {
        cart.forEach(product => {
            var orderDetail = {
                "order_id": orderId,
                "product_id": product.id,
                "quantity": product.quantity,
                "unit_price": product.price
            };

            var url = "http://localhost:3000/order_details";
            var option = {
                method: "post",
                body: JSON.stringify(orderDetail),
                headers: { "Content-Type": 'application/json' }
            };

            fetch(url, option)
                .then(res => res.json())
                .then(data => {
                    console.log("Order detail saved successfully:", data);
                })
                .catch(error => {
                    console.error("Error saving order detail:", error);
                });
        });
    }
}

function clearCartAndRefresh() {
    localStorage.removeItem("cart");
    window.location.href = "checkout.html";
}



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
function hiengiohang1() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
        products = cart;
        products.forEach((pro, index) => {
            var tc = pro.price * pro.quantity;

            var tableBody = document.querySelector("#tb_cart1");
            var newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td class="align-middle"><img src="${pro.image}" alt="" style="width: 50px;"> ${pro.name}</td>
                <td class="gia align-middle">${pro.price}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                        <div class="input-group-btn">
                          
                        
                        </div>
                        <input type="text" id="quantity_${index}" class="form-control form-control-sm bg-secondary border-0 text-center" value="${pro.quantity}">
                        <div class="input-group-btn">
                       
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
hiengiohang1();
