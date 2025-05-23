document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        nombre_usuario: form.nombre_usuario.value,
        contraseña: form.contraseña.value
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/home'; 
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert('Error de conexión con el servidor');
    }
});

document.getElementById('mostrarContrasena').addEventListener('change', function() {
    const passInput = document.querySelector('input[name="contraseña"]');
    passInput.type = this.checked ? 'text' : 'password';
});