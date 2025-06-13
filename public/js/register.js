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
        console.log(result);

        if (response.ok) {
            alert(result.mensaje || 'Registro exitoso');
            document.getElementById('registerForm').style.display = 'none';
            mostrarFormularioPerfilProfesional(true);

            document.getElementById('perfil-profesional-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                const perfilData = {
                    id_usuario: result.user.id_usuario,
                    num_telefono: e.target.num_telefono.value,
                    descripcion: e.target.descripcion.value,
                    ubicacion: e.target.ubicacion.value
                };
                console.log(perfilData);

                try {
                    const perfilResponse = await fetch('/api/perfil-profesional/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(perfilData)
                    });

                    const perfilResult = await perfilResponse.json();

                    if (perfilResponse.ok) {
                        alert('Perfil profesional creado exitosamente');
                        mostrarFormularioPerfilProfesional(true);
                        window.location.href = '/login';
                    } else {
                        alert(perfilResult.error || 'Error al crear el perfil profesional');
                    }
                } catch (err) {
                    alert('Error de conexión con el servidor');
                }
            });
        } else {
            alert(result.error || 'Error en el registro');
        }
    } catch (err) {
        alert('Error de conexión con el servidor');
    }
});


function mostrarFormularioPerfilProfesional(mostrar) {
    const form = document.getElementById('perfil-profesional-form');
    const requiredFields = form.querySelectorAll('[required]');
    if (mostrar) {
        form.style.display = 'block';
        requiredFields.forEach(field => field.setAttribute('required', 'required'));
    } else {
        form.style.display = 'none';
        requiredFields.forEach(field => field.removeAttribute('required'));
    }
}

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

    
    mostrarFormularioPerfilProfesional(false);
});

