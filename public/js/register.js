document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        nombre_usuario: form.nombre_usuario.value,
        contraseña: form.contraseña.value,
        confirmar_contraseña: form.confirmar_contraseña.value,
        rol: form.rol.value,
        categoria: form.rol.value === 'profesional' ? form.categoria.value : null
    };

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.mensaje || 'Registro exitoso');
            window.location.href = '/login';
        } else {
            alert(result.error || 'Error en el registro');
        }
    } catch (err) {
        alert('Error de conexión con el servidor');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const rolSelect = document.getElementById('rol');
    const categoriasDiv = document.getElementById('CategoriasDiv');
    const categoriaSelect = document.getElementById('categoria');

    rolSelect.addEventListener('change', function() {
        if (rolSelect.value === 'profesional') {
            categoriasDiv.style.display = 'block';
            categoriaSelect.setAttribute('required', 'required');
        } else {
            categoriasDiv.style.display = 'none';
            categoriaSelect.removeAttribute('required');
            categoriaSelect.selectedIndex = 0;
        }
    });
});

