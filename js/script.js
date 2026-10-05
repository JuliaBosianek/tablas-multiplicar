//*** ELEMENTOS HTML

const btnsTablas = document.querySelectorAll(".btn-tabla");
const multiplicacion = document.querySelector("#multiplicacion");
const respuesta = document.querySelector("#respuesta");
const resultado = document.querySelector("#resultado");    //texto si el resultado esta o no esta correcto
const puntos = document.querySelector("#puntos");
//comprobación con el botón Validar la respuesta insertada
const btnValidar=document.querySelector("#validar");
const zonaProfesor = document.querySelector("#zona-profesor");

//*** VARIABLES JUEGO
let resultadoCorrecto;  //creado fuera para poder usarlo con btn Validar q necesita variables del forEach
let puntuacion = 0;
let fallosPregunta = 0;     //contador de cuantas veces ha fallado la pregunta
let tablaSeleccionada;

function generarPregunta(tabla){

    // Genera un número aleatorio entero entre 1 y 10
    const aleatorio = Math.floor(Math.random()*10)+1;

    if(tabla==="todas"){

        const aleatorio2 = Math.floor(Math.random()*10)+1;
        multiplicacion.textContent=`${aleatorio} x ${aleatorio2}`;
        resultadoCorrecto= aleatorio * aleatorio2;
    }else{
        multiplicacion.textContent=`${tabla} x ${aleatorio}`;
        resultadoCorrecto= tabla * aleatorio;
    };
};

function lanzarConfetti(){
    confetti();
}


//*** */ ELEGIR TABLA
btnsTablas.forEach(btn=>{
    btn.addEventListener("click",()=>{

        resultado.textContent = "";
        
        tablaSeleccionada=btn.value;
        
        generarPregunta(tablaSeleccionada);
    });
});


//*** VALIDAR RESPUESTA
btnValidar.addEventListener("click", ()=>{

    const respuestaUsuario = Number(respuesta.value);

    if(respuestaUsuario===resultadoCorrecto){

        resultado.textContent="Correcto!";
        puntuacion++;
        puntos.textContent=puntuacion;
        fallosPregunta = 0;

        if(puntuacion % 10 === 0){
            
            lanzarConfetti();
        }

        generarPregunta(tablaSeleccionada);

    }else{
        resultado.textContent="Incorrecto";

        if (puntuacion > 0) {
            puntuacion--;
        }

        puntos.textContent = puntuacion;

        fallosPregunta++;
        
        if(fallosPregunta === 1){   //1er fallo

            
        }else if(fallosPregunta === 2){     //2º fallo

            const profesor = document.createElement("img");
            profesor.src = "img/profesor-enfadado.png";
            profesor.alt = "Profesor enfadado";
            profesor.classList.add("profesor-enfadado");

            zonaProfesor.append(profesor);

            setTimeout(()=>{
                zonaProfesor.innerHTML="";
                fallosPregunta=0;
                generarPregunta(tablaSeleccionada);
            }, 2000);
        }
    }

    respuesta.value="";
});








