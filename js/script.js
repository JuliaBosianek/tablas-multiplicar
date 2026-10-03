const btnsTablas = document.querySelectorAll(".btn-tabla");
const multiplicacion = document.querySelector("#multiplicacion");
let resultadoCorrecto;  //creado fuera para poder usarlo con btn Validar q necesita variables del forEach


//recorrer todos los botones de las tablas + evento
btnsTablas.forEach(btn=>{
    btn.addEventListener("click",()=>{
        
        const tabla=btn.value;
        //creando numero aleatorio 1-10; Math.random() genera numeros 0-9.99..., floor redondea hacia abajo
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
btnValidar=document.querySelector("#validar");

btnValidar.addEventListener("click", ()=>{

    const respuestaUsuario = Number(respuesta.value);

    if(respuestaUsuario===resultadoCorrecto){
        console.log("Correcto!");
    }else{
        console.log("Incorrecto");
    }

    respuesta.value="";
});



