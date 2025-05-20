document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        nombre_usuario: form.nombre_usuario.value,
        contraseña: form.contraseña.value,
        confirmar_contraseña: form.confirmar_contraseña.value,
        rol: form.rol.value
    };

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.mensaje); 
            window.location.href = '/login'; 
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert('Error de conexión con el servidor');
    }
});


