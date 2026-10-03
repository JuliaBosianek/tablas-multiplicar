const btnsTablas = document.querySelectorAll(".btn-tabla");
const multiplicacion = document.querySelector("#multiplicacion");
const respuesta = document.querySelector("#respuesta");
const resultado = document.querySelector("#resultado");    //texto si el resultado esta o no esta correcto
let resultadoCorrecto;  //creado fuera para poder usarlo con btn Validar q necesita variables del forEach


//recorrer todos los botones de las tablas + evento
btnsTablas.forEach(btn=>{
    btn.addEventListener("click",()=>{

        resultado.textContent = "";
        
        const tabla=btn.value;
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
        console.log(resultadoCorrecto);
    });
});

//comprobación con el botón Validar la respuesta insertada
const btnValidar=document.querySelector("#validar");

btnValidar.addEventListener("click", ()=>{

    const respuestaUsuario = Number(respuesta.value);

    if(respuestaUsuario===resultadoCorrecto){
        resultado.textContent="Correcto!";
    }else{
        resultado.textContent="Incorrecto";
    }

    respuesta.value="";
});





