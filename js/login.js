async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    try {
        // Lấy dữ liệu từ server hoặc file JSON
        var response = await fetch('/db1.json');
        var data = await response.json();

        // Kiểm tra xem data có tồn tại không
        if (data && data.users) {
            // Sử dụng find để tìm người dùng với tên đăng nhập và mật khẩu phù hợp
            var user = data.users.find(u => u.username === username && u.password === password);

            if (user) {
                // Lưu thông tin người dùng vào localStorage khi đăng nhập thành công
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                // Đăng nhập thành công, chuyển hướng đến trang chủ
                window.location.href = "index.html";
            } else {
                alert("Tên người dùng hoặc mật khẩu không đúng.");
            }
        } else {
            alert("Lỗi khi xử lý dữ liệu người dùng.");
        }
    } catch (error) {
        console.error("Lỗi khi đọc dữ liệu:", error);
        alert("Lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
}
       // đăng ký 
  // Lấy dữ liệu từ Local Storage khi trang được tải
  var userData = JSON.parse(localStorage.getItem('userData')) || { users: [] };

  // Hàm đăng ký người dùng
  async function registerUser() {
      var fullname = document.getElementById("fullname").value;
      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirm-password").value;

      try {
          // Kiểm tra xác nhận mật khẩu
          if (password !== confirmPassword) {
              alert("Mật khẩu và xác nhận mật khẩu không khớp. Vui lòng thử lại.");
              return false;
          }

          // Kiểm tra xem tên người dùng đã tồn tại chưa
          var userExists = userData.users.some(u => u.username === username);

          if (userExists) {
              alert("Tên người dùng đã tồn tại. Vui lòng chọn tên khác.");
          } else {
              // Thêm người dùng mới vào danh sách
              var newUser = {
                  fullname: fullname,
                  username: username,
                  email: email,
                  password: password
              };
              userData.users.push(newUser);

              // Gửi yêu cầu đăng ký đến server
              await fetch('http://localhost:3000/users', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newUser),
              });

              // Lưu dữ liệu vào Local Storage
              localStorage.setItem('userData', JSON.stringify(userData));

              // Hiển thị thông báo đăng ký thành công
              console.log("Đăng ký thành công:", newUser);
              alert("Đăng ký thành công!");

              window.location.href = "/dangnhap.html";
          }
      } catch (error) {
          console.error("Lỗi khi xử lý dữ liệu:", error);
          alert("Lỗi khi đăng ký. Vui lòng thử lại sau.");
      }

      return false; // Ngăn chặn form từ việc submit
  }