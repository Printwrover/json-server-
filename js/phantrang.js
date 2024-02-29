const itemsPerPage = 8;
let currentPage = 1;
let allProducts = [];

function fetchData() {
    const urls = [
        "http://localhost:3000/products",
        "http://localhost:3000/products2"
    ];

    const requests = urls.map(url => fetch(url).then(response => response.json()));

    Promise.all(requests)
        .then(data => {
            allProducts = data.flat();
            displayData(currentPage);
            displayPagination();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderProduct(product) {
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${product.image}" alt="${product.name}">
                    <div class="product-action">
                        <a class="btn btn-outline-dark btn-square" href="cart.html" onclick = "themvaogio(${product.id},'${product.name}','${product.image}',${product.price})"><i class="fa fa-shopping-cart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                        <a class="btn btn-outline-dark btn-square" href="detail.html" onclick="arr_Detail(${product.id})"><i class="fa fa-search"></i></a>
                        </a>
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
}

function renderPaginationLink(text, pageNumber) {
    const pageLink = document.createElement("li");
    pageLink.classList.add("page-item");
    const linkElement = document.createElement("a");
    linkElement.classList.add("page-link");
    linkElement.href = "#";
    linkElement.textContent = text;

    if (text === "Previous" && currentPage <= 1) {
        pageLink.classList.add("disabled");
    } else if (text === "Next" && currentPage >= Math.ceil(allProducts.length / itemsPerPage)) {
        pageLink.classList.add("disabled");
    }

    linkElement.addEventListener("click", function (event) {
        event.preventDefault();
        if (!pageLink.classList.contains("disabled")) {
            currentPage = pageNumber;
            fetchData(currentPage);
            highlightCurrentPage();
        }
    });

    pageLink.appendChild(linkElement);
    return pageLink;
}

function displayData(currentPage) {
    const productsContainer = document.getElementById("load-products");
    const products2Container = document.getElementById("load-products2");

    productsContainer.innerHTML = "";
    products2Container.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = allProducts.slice(startIndex, endIndex);

    currentPageData.forEach(product => {
        const productElement = renderProduct(product);
        if (product.id <= allProducts.length / 2) {
            productsContainer.innerHTML += productElement;
        } else {
            products2Container.innerHTML += productElement;
        }
    });
}

function displayPagination() {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const previousLink = renderPaginationLink("Previous", currentPage - 1);
    paginationContainer.appendChild(previousLink);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = renderPaginationLink(i, i);
        paginationContainer.appendChild(pageLink);
    }

    const nextPage = renderPaginationLink("Next", currentPage + 1);
    paginationContainer.appendChild(nextPage);

    highlightCurrentPage();
}

function highlightCurrentPage() {
    const pageLinks = document.querySelectorAll(".page-link");
    pageLinks.forEach((link, index) => {
        // chọn thứ tự nút
        if (index + 0 === currentPage) {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
