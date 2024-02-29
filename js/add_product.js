document.addEventListener('DOMContentLoaded', function () {
    var addProductForm = document.getElementById("addProductForm");
    var url = "http://localhost:3000/products";
    var productImagePreview = document.getElementById("productImagePreview");

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addProduct();
    });

    document.getElementById("addProductImage").addEventListener("change", function () {
        previewProductImage();
    });

    function addProduct() {
        var input = document.getElementById("addProductImage");
        var fileName = input.files && input.files[0] ? input.files[0].name : "";

        var newProduct = {
          
            name: addProductForm.querySelector("#addProductName").value,
            cate_id: parseInt(addProductForm.querySelector("#addProductCategoryId").value),
            detail: addProductForm.querySelector("#addProductDetail").value,
            image: "../img/" + fileName,
            price: parseFloat(addProductForm.querySelector("#addProductPrice").value),
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding new product');
            }
            return response.json();
        })
        .then(data => {
            console.log('New product added:', data);
        })
        .catch(error => console.error('Error adding new product:', error));
    }

    function previewProductImage() {
        var input = document.getElementById("addProductImage");

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                productImagePreview.src = e.target.result;
                productImagePreview.style.display = "block";
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            productImagePreview.style.display = "none";
        }
    }
});
