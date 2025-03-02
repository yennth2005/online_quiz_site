document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            if (data.type === 'admin') {
                window.location.href = '/public/admin/quiz.html';
            } else {
                window.location.href = '/public/quiz.html';
            }
        } else {
            alert(data.message || 'Đăng nhập thất bại');
        }
    })
    .catch(error => console.error('Lỗi:', error));
});
