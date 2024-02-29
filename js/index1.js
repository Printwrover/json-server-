var url= "http://localhost:3000/categories";
fetch(url).then(data => data.json())
// console.log(data)
.then (categories =>{
    cat_arr = categories.map(cat => {
        return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1" onclick="filterPr(${cat.id})">
                    <a class="text-decoration-none" href="#">
                        <div class="cat-item d-flex align-items-center mb-4">
                            <div class="overflow-hidden" style="width: 100px; height: 100px;">
                                <img class="img-fluid" src="${cat.image}" alt="${cat.name}">
                            </div>
                            <div class="flex-fill pl-3">
                                <h6>${cat.name}</h6>
                                <small class="text-body">${cat.quantity} Sản phẩm</small>
                            </div>
                        </div>
                    </a>
                </div>`;
    })
    document.querySelector("#load-categories").innerHTML+=cat_arr.join('');
})

//Load danh mục
function filterPr(categoryId) {
    fetch('http://localhost:3000/categories')
    .then(response => response.json())
    .then(data => {
        fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data1 => {
            const categories = data;
            const products = data1;
            // Lọc danh mục cụ thể
            const selectedCategory = categories.find(category => category.id == categoryId);
            console.log(selectedCategory)
                if (selectedCategory) {
                // Lọc sản phẩm theo mã danh mục
                const filteredProducts = products.filter(product => product.idpro == selectedCategory.id);
                console.log(filteredProducts)
                // Hiển thị sản phẩm (thay thế bằng cách nào đó)
                displayProducts(filteredProducts);
                }
            })

        })
        .catch(error => console.error('Fetch error:', error));
    }

          function displayProducts(products) {
            document.getElementById('load-products').innerHTML = '';
            // Hiển thị sản phẩm (thay thế bằng cách nào đó)
        pro_arr = products.map(pro => {
            return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${pro.image}" alt="${pro.name}">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href="cart.html" onclick = "themvaogio(${pro.id},'${pro.name}','${pro.image}',${pro.price})"><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href="detail.html" onclick="arr_Detail(${pro.id})"><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">${pro.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>${pro.price} vnd</h5><h6 class="text-muted ml-2"><del>${pro.price * 0.9} vnd</del></h6>
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
        })
        document.querySelector("#load-products").innerHTML+=pro_arr.join('');
    }
    
    var urlproducts2= "http://localhost:3000/products2";
    fetch(urlproducts2).then(data => data.json())
    .then (products2 =>{
        pro2_arr = products2.map(pro2 => {
            return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${pro2.image}" alt="${pro2.name}">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href="cart.html" onclick = "themvaogio(${pro2.id},'${pro2.name}','${pro2.image}',${pro2.price})"><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href="detail.html" onclick="arr_Detail(${pro2.id})"><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">${pro2.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>${pro2.price} vnd</h5><h6 class="text-muted ml-2"><del>${pro2.price * 0.9} vnd</del></h6>
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
        })
        document.querySelector("#load-products2").innerHTML+=pro2_arr.join('');
    })


function themvaogio(id, ten, hinh, gia){
    var cart = JSON.parse(localStorage.getItem("cart"));
    if (cart==null){
        cart = [];
        cart.push({id:id,name:ten,image:hinh,price:gia,quantity:1});
    }else{
        let item = cart.find(item => item.id === id);
        if(item) item.quantity ++;
        else cart.push({id:id,name:ten,image:hinh,price:gia,quantity:1});
    }
    localStorage.setItem("cart",JSON.stringify(cart));
}