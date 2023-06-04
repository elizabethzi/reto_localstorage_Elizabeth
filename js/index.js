//Funcion validaciones

function Validacion() {
    // Obtener el valor del input con el id tareas
    let tareas = document.getElementById('tareas').value;

    // Expresión que representa cualquier carácter que no sea una letra o espacio
    var regex = /[^a-zA-Z\s]/;

    // Si el input esta vacio, muestra un mensaje de alerta y arroja false
    if (tareas == "") {
        Swal.fire({
            title: "Agrega una tarea",
            icon: 'warning',
            confirmButtonColor: '#c3f0ca',
            type: "success"
        });
        return false;
    } else if (regex.test(tareas)) {
        // Si el input ingresa caracteres que no son letras o espacios, arroja false y muestra alerta
        Swal.fire({
            title: "No puedes agregar números o caracteres especiales",
            icon: 'error'
        });
        return false;
    } else if (tareas.length < 3) {
        // Si el campo de entrada tiene menos de 3 caracteres, muestra una alerta y arroja false
        Swal.fire({
            title: "La tarea es muy corta",
            text: "¡Agrega más detalles!",
            icon: 'info'
        });
        return false;
    }

    // Si ninguna de las condiciones anteriores se cumple, se devuelve true, lo que indica que la validacion es exitosa
    return true;
}

// Funcion para leer las tareas almacenadas en localStorage y mostrarlas en el html
function leerTarea() {
    let listaTarea;

    // Verificar si hay datos almacenados en localStorage con la clave listaTarea
    if (localStorage.getItem('listaTarea') == null) {
        // Si no hay datos, inicializar la variable listaTarea como un array vacio
        listaTarea = [];
    }
    // Obtener los datos almacenados en localStorage y asignarlos a la variable listaTarea
    listaTarea = JSON.parse(localStorage.getItem('listaTarea'));

    //inicializar variable html
    var html = "";

    // Recorrer cada elemento del array listaTarea utilizando forEach
    listaTarea.forEach(function(element, index) {
        // html concatenando el <li>, boton de eliminar 
        html += '<li>' + element.tareas + '<button onclick="eliminarTarea(' + index + ')" class="botonEliminar" id="botonEliminar"><i class="bi bi-trash3-fill"></i></button></li>';
    });

    // Insertar el html generado en el elemento con el id lista
    document.querySelector('#lista').innerHTML = html;
}

// Ejecutar la funcion leerTarea cuando el documento se haya cargado completamente
document.onload = leerTarea();



// Funcion para enviar una tarea
function Enviar() {
    // Verificar si la validacion es exitosa llamando a la función Validacion()
    if (Validacion() == true) {
        // Obtener el valor del inputcon el id tarea
        let tareas = document.getElementById('tareas').value;

        var listaTarea;

        // Verificar si hay datos almacenados en localStorage con la clave listaTarea
        if (localStorage.getItem('listaTarea') == null) {
            // Si no hay datos, inicializar la variable listaTarea como un array vacio
            listaTarea = [];
        } else {
            // Obtener los datos almacenados en localStorage y asignarlos a la variable listaTarea
            listaTarea = JSON.parse(localStorage.getItem('listaTarea'));
        }

        // Agregar la nueva tarea al array listaTarea
        listaTarea.push({
            tareas: tareas
        });

        // Guardar el array actualizado en localStorage, convirtiendo a formato JSON
        localStorage.setItem('listaTarea', JSON.stringify(listaTarea));

        // Actualizar la lista de tareas en el html llamando a la funcion leerTarea()
        leerTarea();

        // Limpiar el input estableciendo su valor a vacio
        document.getElementById('tareas').value = "";
    }
}




// Funcion para eliminar una tarea
function eliminarTarea(index) {
    let listaTarea;

    // Verificar si hay datos almacenados en localStorage con la clave listaTarea
    if (localStorage.getItem('listaTarea') == null) {
        // Si no hay datos, inicializar la variable listaTarea como un array vacio
        listaTarea = [];
    } else {
        // Obtener los datos almacenados en localStorage y asignarlos a la variable listaTarea
        listaTarea = JSON.parse(localStorage.getItem('listaTarea'));
    }

    // Mostrar una confirmacion al usuario utilizando la libreria sweet alert
    Swal.fire({
        text: "¿Quieres eliminar esta tarea?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    })
    .then(resultado => {
        if (resultado.value) {
            // Si el usuario confirma la eliminacion, se elimina la tarea del array listaTarea
            listaTarea.splice(index, 1);
            // Guardar el array actualizado en localStorage, convirtiendo a formato JSON
            localStorage.setItem('listaTarea', JSON.stringify(listaTarea));
            // Actualizar la lista de tareas en el html llamando a la funcion leerTarea()
            leerTarea();
            // Mostrar un mensaje de exito utilizando sweet alert
            Swal.fire({
                title: "Tarea eliminada",
                confirmButtonText: "Ok",
                icon: 'success',
            });
            // Devolver true para indicar que la eliminacion se hizo correctamente
            return true;
        } else {
            // Si el usuario cancela la eliminacióon, se devuelve false
            return false;
        }
    });
}


// Evento 
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("tareas");
  
    // Evento que se ejecuta cuando se presiona una tecla en el input
    input.addEventListener("keydown", function(event) {
      // Verificar si la tecla presionada es Enter (codigo 13)
      if (event.keyCode === 13) {
        const inputValue = event.target.value.trim();
        event.preventDefault();
  
        // Verificar si el numero de caracteres del input es mayor a 0, de ser asi, activa la funcion Enviar()
        if (inputValue.length > 0) {
          introEventHandler(inputValue);
          Enviar();
        } else {
          // De lo contrario mostrara una alerta indicando que se debe agregar una tarea
          Swal.fire({
            title: "Agrega una tarea",
            icon: 'warning',
            confirmButtonColor: '#c3f0ca',
            type: "success"
          });
          return false;
        }
      }
    });
  });
  
  // Funcion vacia llamada introEventHandler
  function introEventHandler() {};
  
    
  
