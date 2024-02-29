document.addEventListener('DOMContentLoaded', function () {
    checkUserStatus();
});

function checkUserStatus() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    var userInfoContainer = document.getElementById('user-info-container');
    var loginButton = document.getElementById('loginButton');
    var registerButton = document.getElementById('registerButton');

    if (loggedInUser) {
        userInfoContainer.innerHTML = `Chào mừng ${loggedInUser.username}!`;
        // Ẩn nút Đăng Nhập và Đăng Ký
        hideLoginAndRegisterButtons();
    } else {
        // Hiển thị nút Đăng Nhập và Đăng Ký
        if (loginButton && registerButton) {
            loginButton.style.display = 'inline-block';
            registerButton.style.display = 'inline-block';
        }
        // Ẩn container thông tin người dùng
        if (userInfoContainer) {
            userInfoContainer.style.display = 'none';
        }
    }
}

// Rest of your code...

function hideLoginAndRegisterButtons() {
    var loginButton = document.getElementById("loginButton");
    var registerButton = document.getElementById("registerButton");

    if (loginButton && registerButton) {
        loginButton.style.display = "none";
        registerButton.style.display = "none";
    }
}

// Rest of your code...
