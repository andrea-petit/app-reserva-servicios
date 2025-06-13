let id_usuario = null;

async function inicializarUsuario() {
    const res = await fetch('/api/usuario-actual');
    if (res.ok) {
        const user = await res.json();
        id_usuario = user.id;
        mostrarPerfilOFormulario();
    } else {
        alert('No autenticado');
    }
}

async function mostrarPerfilOFormulario() {
    try {
        const res = await fetch(`/api/perfil-profesional/${id_usuario}`);
        if (res.ok) {
            const perfil = await res.json();
            document.getElementById("perfil-container").style.display = "block";
            document.getElementById("perfil-form-container").style.display = "none";
            document.getElementById("perfil-id_usuario").textContent = perfil.id_usuario;
            document.getElementById("perfil-descripcion").textContent = perfil.descripcion;
            document.getElementById("perfil-num_telefono").textContent = perfil.num_telefono;
            document.getElementById("perfil-ubicacion").textContent = perfil.ubicacion;
        } else {
            document.getElementById("perfil-container").style.display = "none";
            document.getElementById("perfil-form-container").style.display = "block";
            document.getElementById("id_usuario").value = id_usuario;
            document.getElementById("descripcion").value = "";
            document.getElementById("ubicacion").value = "";
            document.getElementById("num_telefono").value = "";
        }
    } catch (err) {
        alert('Error al cargar el perfil');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarUsuario();

    const btnCancel = document.getElementById("cancel-edit-form");
    btnCancel.addEventListener("click", function() {
        document.getElementById("perfil-form-container").style.display = "none";
    });

    const btnSave = document.getElementById("submit-edit-form");
    btnSave.addEventListener("click", async function(e) {
        e.preventDefault();

        
        if (document.getElementById("perfil-form-container").style.display !== "block") return;

        const descripcion = document.getElementById("descripcion").value;
        const ubicacion = document.getElementById("ubicacion").value;
        const num_telefono = document.getElementById("num_telefono").value;

        try {
            const createRes = await fetch('/api/perfil-profesional/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario,
                    num_telefono,
                    descripcion,
                    ubicacion
                })
            });
            if (createRes.ok) {
                alert('Perfil creado correctamente');
                
                mostrarPerfilOFormulario();
            } else {
                alert('Error al crear el perfil');
            }
        } catch (err) {
            alert('Error al guardar el perfil');
        }
    });
});


