//funcion mela
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
        icon: 'error', confirmButtonColor: '#c3f0ca'}); 
        return false;
    }else if(tareas.length <3){
        Swal.fire({title:"La tarea es muy corta", text:"¡Agrega mas detalles!", icon:'info',  confirmButtonColor: '#c3f0ca', type: "success"});
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
       
        html +='<li>' + element.tareas + '<button onclick="eliminarTarea('+ index +')" class="botonEliminar" id="botonEliminar">x</button></li>';
       
       
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
listaTarea.splice(index, 1);

localStorage.setItem('listaTarea', JSON.stringify(listaTarea));

leerTarea();

}


