
function Validacion(){
    let tareas = document.getElementById('tareas').value;

    var regex = /[^a-zA-Z\s]/;

    if(tareas == ""){
        Swal.fire({ title: "Agrega una tarea",
        icon: 'warning',
        confirmButtonColor: '#c3f0ca', type: "success"});
        return false;
    }else if(regex.test(tareas)){
        Swal.fire({ title: "No puedes agregar números o caracteres especiales",
        icon: 'error'}); 
        return false;
    }else if(tareas.length <3){
        Swal.fire({title:"La tarea es muy corta", text:"¡Agrega mas detalles!", icon:'info'});
        return false;
    }
    return true;
}

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


