var url = "http://localhost:3000/users";

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
        <td>${products.username}</td>
        <td>${products.fullname}</td>
        <td>${products.email}</td>
        <td>${products.password}</td>
        <td><button onclick="deleteProduct(${products.id})">Xóa</button></td>
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
fetchProducts();




