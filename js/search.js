var products = [];  // Dữ liệu sản phẩm từ db1.json

document.addEventListener('DOMContentLoaded', function () {
    // Hàm cập nhật container sản phẩm với dữ liệu sản phẩm
    function updateProductContainer(products) {
        var productContainer = document.getElementById('load-products');
        productContainer.innerHTML = '';

        products.forEach(product => {
        var productHTML = `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${product.image}" alt="${product.name}">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" href="cart.html" onclick="themvaogio(${product.id},'${product.name}','${product.image}',${product.price})"><i class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href="detail.html" onclick="arr_Detail(${product.id})"><i class="fa fa-search"></i></a>
                    </div>
                </div>
                <div class="text-center py-4">
                    <a class="h6 text-decoration-none text-truncate" href="">${product.name}</a>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                        <h5>${product.price} vnd</h5><h6 class="text-muted ml-2"><del>${product.price * 0.9} vnd</del></h6>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mb-1">
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                    </div>
                </div>
            </div>
        </div>`;
        productContainer.innerHTML += productHTML;
    });
}

 // Hàm tìm kiếm sản phẩm
 function searchProducts() {
    var searchQuery = document.getElementById('searchInput').value.toLowerCase();
    var matchingProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
    updateProductContainer(matchingProducts);
}

// Lấy dữ liệu từ db1.json
fetch('db1.json')
    .then(response => response.json())
    .then(data => {
        products = data.products; // Lưu dữ liệu sản phẩm từ db1.json
        updateProductContainer(products);
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));

// Thêm lắng nghe sự kiện cho form tìm kiếm
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn form gửi yêu cầu trang (refresh)
    searchProducts();
});

// Thêm lắng nghe sự kiện cho ô nhập để thực hiện tìm kiếm thời gian thực
document.getElementById('searchInput').addEventListener('input', function () {
    searchProducts();
});

// Số sản phẩm trên mỗi trang
var itemsPerPage = 4;

// Tổng số trang
var totalPages = Math.ceil(products.length / itemsPerPage);

// Hàm hiển thị sản phẩm trên trang cụ thể
function showPage(page) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    var visibleProducts = products.slice(startIndex, endIndex);
    updateProductContainer(visibleProducts);
}

// Hàm tạo nút phân trang
function createPaginationButtons() {
    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement('li');
        li.classList.add('page-item');
        var a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i;
        a.href = '#';
        a.addEventListener('click', function () {
            var pageNumber = parseInt(this.textContent);
            showPage(pageNumber);
        });
        li.appendChild(a);
        document.getElementById('pagination').appendChild(li);
    }
}

// Gọi hàm tạo nút phân trang và hiển thị trang đầu tiên khi trang web được tải
createPaginationButtons();
showPage(1);

});