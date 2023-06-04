//Funcion validaciones
function Validacion(){
    let tareas = document.getElementById('tareas').value;

    //Variable que abarca solo letras
    var regex = /[^a-zA-Z\s]/;

    //Si el input esta vacio, pide agregar caracteres
    if(tareas == ""){
        Swal.fire({ title: "Agrega una tarea",
        icon: 'warning',
        confirmButtonColor: '#c3f0ca', type: "success"});
        return false;

    }else if(regex.test(tareas)){ //Se realiza la comparacion de datos ingresados en el input con la variable regex gracias al metodo test para verificar si los caracteres son letras o no
        Swal.fire({ title: "No puedes agregar números o caracteres especiales",
        icon: 'error'}); 
        return false;
    }else if(tareas.length <3){ //Se verifica el número de caracteres, de ser menor a tres, arroja false
        Swal.fire({title:"La tarea es muy corta", text:"¡Agrega mas detalles!", icon:'info'});
        return false;
    }
    return true;
}

//Funcion
function leerTarea(){
    let listaTarea;
    if(localStorage.getItem('listaTarea') == null){
        listaTarea=[];
    }listaTarea=JSON.parse(localStorage.getItem('listaTarea'));

    var html= ""; 

    listaTarea.forEach(function(element, index){
       
        html +='<li>' + element.tareas + '<button onclick="eliminarTarea('+ index +')" class="botonEliminar" id="botonEliminar"><i class="bi bi-trash3-fill"></i></button></li>';
       
        
    });
document.querySelector('#lista').innerHTML = html;
}

document.onload = leerTarea();

//Funcion boton
function Enviar(){
    if(Validacion() == true){
        let tareas = document.getElementById('tareas').value;

        var listaTarea;
        if(localStorage.getItem('listaTarea') == null){
listaTarea= []
        }else{
            listaTarea=JSON.parse(localStorage.getItem('listaTarea'));
        }

        listaTarea.push({
            tareas: tareas
        });
        localStorage.setItem('listaTarea', JSON.stringify(listaTarea));
    

        leerTarea();

        document.getElementById('tareas').value= "";
    }
}


function eliminarTarea(index){
    let listaTarea;
    

    if(localStorage.getItem('listaTarea') == null){
listaTarea = []
    }else{
        listaTarea=JSON.parse(localStorage.getItem('listaTarea'));
    }

  

        Swal.fire({
            
            text: "¿Quieres eliminar esta tarea?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
           
        })
        .then(resultado => {
            if (resultado.value) {
                listaTarea.splice(index, 1);
                localStorage.setItem('listaTarea', JSON.stringify(listaTarea));
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

//Función evento para guardar datos del input con el Enter
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("tareas");
  
    input.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        const inputValue = event.target.value.trim();
        event.preventDefault();
        if (inputValue.length > 0) {
          introEventHandler(inputValue);
          Enviar();
        
        } else{
            Swal.fire({ title: "Agrega una tarea",
            icon: 'warning',
            confirmButtonColor: '#c3f0ca', type: "success"});
            return false;
        }
      }
    });
  });

  function introEventHandler(){};
    
  
