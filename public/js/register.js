document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/index.html';
        } else {
            alert(data.message || 'Đăng ký thất bại');
        }
    })
    .catch(error => console.error('Error:', error));
});
