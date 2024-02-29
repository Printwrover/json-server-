
// đơn hàng 

var url = "http://localhost:3000/orders";

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
}// Hiển thị một sản phẩm trong bảng 
function displayProduct(orders) {
    var tableBody = document.getElementById('showProduct');

    var newRow = document.createElement("tr");
    newRow.setAttribute('data-id', orders.id);
    newRow.innerHTML = `
        <td>${orders.id}</td>
        <td>${orders.customer_name}</td>
        <td>${orders.customer_address}</td>
        <td>${orders.customer_email}</td>
        <td>${orders.customer_phone_number}</td>
        <td>${orders.created_date}</td>
        <td>${orders.status}</td>
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