document.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let timerInterval;
            Swal.fire({
                title: "Đăng nhập thành công!",
                icon: "success",
                html: "Tự động chuyển về trang chủ sau <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                window.location.href = "/index.html";
            });
        })
        .catch((error) => {
            // Handle login error
            Swal.fire({
                icon: "error",
                title: "Tên tài khoản hoặc mật khẩu sai",
            });
        });
});

let btnGoogle = document.querySelector(".btn-google");
let btnFacebook = document.querySelector(".btn-facebook");

btnGoogle.addEventListener("click", function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // Redirect to home page or perform any other actions
            window.location.href = "/index.html";
        })
        .catch((error) => {
            // Handle login error
            Swal.fire({
                icon: "error",
                title: "Google login failed",
            });
        });
});

btnFacebook.addEventListener("click", function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // Redirect to home page or perform any other actions
            window.location.href = "/index.html";
        })
        .catch((error) => {
            // Handle login error
            Swal.fire({
                icon: "error",
                title: "Facebook login failed",
            });
        });
});
