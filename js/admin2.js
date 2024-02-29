var url = "http://localhost:3000/products";

// Lấy dữ liệu sản phẩm từ máy chủ
function fetchProducts() {
    fetch(url)
        .then(response => response.json())
        .then(products => {
            products.forEach(products => {
                displayProduct(products);
            });
        })
        .catch(error => console.error('Lỗi khi lấy dữ liệu sản phẩm:', error));
}

// Hiển thị một sản phẩm trong bảng 
function displayProduct(products) {
    var tableBody = document.getElementById('showProduct');

    var newRow = document.createElement("tr");
    newRow.setAttribute('data-id', products.id);
    newRow.innerHTML = `
        <td>${products.id}</td>
        <td class="cat-image"><img src="${products.image}" alt="${products.name}" style="max-width: 100px;"></td>
        <td>${products.name}</td>
        <td>${products.price}</td>
        <td>${products.quantity}</td>
        <td><button onclick="deleteProduct(${products.id})">Xóa</button></td>
        <td><button onclick="editProduct(${products.id})">Chỉnh sửa</button></td>
    `;

    tableBody.appendChild(newRow);
}

// Xóa một sản phẩm từ máy chủ và từ bảng
function deleteProduct(productId) {
    fetch(`${url}/${productId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            var rowToDelete = document.querySelector(`tr[data-id="${productId}"]`);
            if (rowToDelete) {
                rowToDelete.remove();
            }
        })
        .catch(error => console.error('Lỗi khi xóa sản phẩm:', error));
}

// Mở form chỉnh sửa sản phẩm
function openEditProductForm(products) {
    document.getElementById('editProductId').value = products.id;
    document.getElementById('editProductName').value = products.name;
    document.getElementById('editProductImage').value = products.image;
    document.getElementById('editProductPrice').value = products.price;
    document.getElementById('editProductQuantity').value = products.quantity;

    var editProductForm = document.getElementById('editProductForm');
    var overlay = document.getElementById('overlay');

    editProductForm.style.display = 'block';
    overlay.style.display = 'block';
}

function openAddProductForm() {
    document.getElementById('editProductForm').style.display = 'block';
    document.getElementById('updateButton').addEventListener('click', updateProduct);
    document.getElementById('exitButton').addEventListener('click', exitProductForm);
}

function exitProductForm() {
    document.getElementById('editProductForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Cập nhật thông tin một sản phẩm trên máy chủ
function updateProductOnServer(updatedProduct) {
    return fetch(`${url}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sản phẩm được cập nhật thành công', data);
        return data;
    })
    .catch(error => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    });
}

// Chức năng chỉnh sửa sản phẩm
function editProduct(productId) {
    fetch(`${url}/${productId}`)
        .then(response => response.json())
        .then(product => {
            var productName = prompt('Cập nhật tên:', product.name);
            var productPrice = prompt('Cập nhật giá:', product.price);
            var productQuantity = prompt('Cập nhật số lượng:', product.quantity);

            if (productName === null || productPrice === null || productQuantity === null) {
                return;
            }

            var updatedProduct = {
                id: productId,
                name: productName,
                image: product.image,
                price: parseFloat(productPrice),
                quantity: parseInt(productQuantity),
            };

            updateProductOnServer(updatedProduct)
                .then(updatedData => {
                    var rowToUpdate = document.querySelector(`tr[data-id="${productId}"]`);
                    if (rowToUpdate) {
                        rowToUpdate.querySelector('td:nth-child(3)').textContent = updatedData.name;
                        rowToUpdate.querySelector('td:nth-child(4)').textContent = updatedData.price;
                        rowToUpdate.querySelector('td:nth-child(5)').textContent = updatedData.image;
                        rowToUpdate.querySelector('td:nth-child(6)').textContent = updatedData.quantity;
                    }

                    alert('Sản phẩm được cập nhật thành công');

                    document.getElementById('editProductForm').style.display = 'none';
                    document.getElementById('overlay').style.display = 'none';
                })
        })
        .catch(error => {
            alert('Vui lòng thử lại.');
        });
}

// Gửi một sản phẩm mới đến máy chủ (yêu cầu POST)
function updateProduct() {
    var productId = document.getElementById('ProductId').value;
    var productName = document.getElementById('ProductName').value;
    var productPrice = document.getElementById('ProductPrice').value;
    var productImage = document.getElementById('ProductImage').value;
    var productQuantity = document.getElementById('ProductQuantity').value;

    if (!productId || !productName || !productPrice || !productImage || !productQuantity) {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm.');
        return;
    }

    var productImageFile = document.getElementById('ProductImage').files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        var newProduct = {
            name: productName,
            image: e.target.result,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
        };

        console.log('Sản phẩm mới:', newProduct);

        displayProduct(newProduct);

        sendProductToServer(newProduct)
            .then(data => {
                if (!data.id) {
                    document.getElementById('productId').value = data.id;
                }
                alert('Sản phẩm được cập nhật thành công');
            })
            .catch(error => {
                alert('Hãy thử lại.');
            });
    };

    reader.readAsDataURL(productImageFile);
}

// Gửi một sản phẩm đến máy chủ (yêu cầu POST)
function sendProductToServer(products) {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
    })
    .then(response => {
        console.log('Request:', response);
        return response.json();
    })
    .then(data => {
        console.log('Sản phẩm được thêm thành công', data);
        return data;
    })
    .catch(error => {
        console.error('Lỗi khi thêm sản phẩm:', error);
        throw error;
    });
}

// Fetch dữ liệu sản phẩm khi trang được tải
fetchProducts();
