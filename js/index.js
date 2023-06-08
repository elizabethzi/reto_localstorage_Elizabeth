var listaTarea;

funcion1 = () => {

    if (localStorage.getItem('listaTarea') == null) {
        listaTarea = [];
    } else {
        listaTarea = JSON.parse(localStorage.getItem('listaTarea'));
    }
}

funcion2 = () => {
    localStorage.setItem('listaTarea', JSON.stringify(listaTarea));
}

function leerTarea() {
    let html = "";

    funcion1();

    listaTarea.map(function (tarea, i) {
        html += '<li>' + tarea.tareas + '<button onclick="eliminarTarea(' + i + ')" class="botonEliminar" id="botonEliminar"><i class="bi bi-trash3-fill"></i></button></li>';
    });

    document.querySelector('#lista').innerHTML = html;
}

document.onload = leerTarea();

function Enviar() {

    if (Validacion() == true) {

        let tareas = document.getElementById('tareas').value;

        funcion1();

        listaTarea.push({
            tareas: tareas
        });

        funcion2();
        leerTarea();

        document.getElementById('tareas').value = "";
    }
}

function eliminarTarea(i) {

    funcion1();

    Swal.fire({
        text: "¿Quieres eliminar esta tarea?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    })
        .then(resultado => {
            if (resultado.value) {

                listaTarea.splice(i, 1);
                funcion2();
                leerTarea();

                Swal.fire({
                    title: "Tarea eliminada",
                    confirmButtonText: "Ok",
                    icon: 'success',
                });
                return true;
            } else {
                return false;
            }
        });
}

//Funcion validaciones

function Validacion() {

    let tareas = document.getElementById('tareas').value;
    let regex = /[^a-zA-Z\s]/;

    if (tareas == "") {
        Swal.fire({
            title: "Agrega una tarea",
            icon: 'warning',
            confirmButtonColor: '#c3f0ca',
            type: "success"
        });
        return false;
    } else if (regex.test(tareas)) {

        Swal.fire({
            title: "No puedes agregar números o caracteres especiales",
            icon: 'error'
        });
        return false;
    } else if (tareas.length < 3) {

        Swal.fire({
            title: "La tarea es muy corta",
            text: "¡Agrega más detalles!",
            icon: 'info'
        });
        return false;
    }
    return true;
}

// document.addEventListener("DOMContentLoaded", function () {
//     const input = document.getElementById("tareas");

//     input.addEventListener("keydown", function (event) {

//         if (event.key == "Enter") {
//             const inputValue = event.target.value.trim();
//             event.preventDefault();


//             if (inputValue.length > 0) {
//                 introEventHandler(inputValue);
//                 Enviar();
//             } else {

//                 Swal.fire({
//                     title: "Agrega una tarea",
//                     icon: 'warning',
//                     confirmButtonColor: '#c3f0ca',
//                     type: "success"
//                 });
//                 return false;
//             }
//         }
//     });
// });

// function introEventHandler() { };


