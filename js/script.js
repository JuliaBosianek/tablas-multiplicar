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
let multiplicacionActual;
let profesorMostrado = false;
let multiplicacionesPendientes = [];
let multiplicadorActual;
let multiplicacionSeleccionada;
let mostrandoSolucion = false;
let rondaTerminada = false;

function generarPregunta(tabla){

    if(tabla === "todas"){

        const indiceAleatorio = Math.floor(Math.random()*multiplicacionesPendientes.length);

        multiplicacionSeleccionada = multiplicacionesPendientes.splice(indiceAleatorio, 1)[0];

        multiplicacionActual = `${multiplicacionSeleccionada[0]} x ${multiplicacionSeleccionada[1]}`;

        multiplicacion.textContent=multiplicacionActual;

        resultadoCorrecto = multiplicacionSeleccionada[0] * multiplicacionSeleccionada[1];
        
    }else{

        const indiceAleatorio = Math.floor(Math.random()*multiplicacionesPendientes.length);

        multiplicadorActual = multiplicacionesPendientes.splice(indiceAleatorio, 1)[0];

        multiplicacionActual=`${tabla} x ${multiplicadorActual}`;
        multiplicacion.textContent=multiplicacionActual;

        resultadoCorrecto= tabla * multiplicadorActual;
    };
};

//multiplicaciones sin repetir de las tablas "TODAS" 
function crearMultiplicacionesTodas(){

    multiplicacionesPendientes = [];

    for(let tabla = 1; tabla <= 10; tabla++){

        for(let multiplicador = 1; multiplicador <=10; multiplicador++){

            multiplicacionesPendientes.push([tabla, multiplicador])
        }
    }
}

function comprobarFinRonda(){

    if(multiplicacionesPendientes.length===0){

        if(tablaSeleccionada === "todas"){
            resultado.textContent = "¡Has completado todas las tablas! 🎉 Elige otra para seguir ganando puntos :)";
        }else{
        resultado.textContent="¡Has completado la tabla! 🎉 Elige otra para seguir ganando puntos :)";
        };

        multiplicacion.textContent = "";

        rondaTerminada = true;
        btnValidar.disabled = true;

        respuesta.value = "";

        return true;
    };

    return false;
};

function lanzarConfetti(){
    confetti();
}


//*** */ ELEGIR TABLA
btnsTablas.forEach(btn=>{
    btn.addEventListener("click",()=>{

        resultado.textContent = "";

        rondaTerminada = false;
        btnValidar.disabled = false;
        
        tablaSeleccionada=btn.value;

        fallosPregunta = 0;

        respuesta.value = "";

        if(tablaSeleccionada === "todas"){

            crearMultiplicacionesTodas();

        }else{

            multiplicacionesPendientes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        };
        
        generarPregunta(tablaSeleccionada);
    });
});


//*** VALIDAR RESPUESTA
btnValidar.addEventListener("click", ()=>{

    if(mostrandoSolucion || rondaTerminada){      //no funciona btn validar ni genera otra pregunta mientras muestra la solucion
        return;
    }

    const respuestaUsuario = Number(respuesta.value);

    if(respuestaUsuario===resultadoCorrecto){

        resultado.textContent="Correcto!";
        puntuacion++;
        puntos.textContent=puntuacion;
        fallosPregunta = 0;

        if(puntuacion % 10 === 0){
            
            lanzarConfetti();
        };

        if(!comprobarFinRonda()){
        
            generarPregunta(tablaSeleccionada);
        };

    }else{
        resultado.textContent="Incorrecto";

        if (puntuacion > 0) {
            puntuacion--;
        }

        puntos.textContent = puntuacion;

        fallosPregunta++;
        
        if(fallosPregunta === 1){   //1er fallo

            
        }else if(fallosPregunta === 2 && !profesorMostrado){  //2º fallo

            const profesor = document.createElement("img");
            profesor.src = "img/profesor-enfadado.png";
            profesor.alt = "Profesor enfadado";
            profesor.classList.add("profesor-enfadado");

            zonaProfesor.innerHTML="";
            zonaProfesor.append(profesor);

            profesorMostrado = true;

            setTimeout(()=>{
                zonaProfesor.innerHTML="";
            }, 2000);

        }else if(fallosPregunta === 3){

           multiplicacion.textContent=`${multiplicacionActual} = ${resultadoCorrecto}`;

           if(tablaSeleccionada === "todas"){

              multiplicacionesPendientes.push(multiplicacionSeleccionada);
           }else{

              multiplicacionesPendientes.push(multiplicadorActual);    //multiplicacion fallada vuelve al final
           };

           fallosPregunta = 0;
           mostrandoSolucion = true;

           setTimeout(()=>{
              mostrandoSolucion = false;

              if(!comprobarFinRonda()){
                generarPregunta(tablaSeleccionada);
              }
           }, 2000);
        }
    }

    respuesta.value="";
});




