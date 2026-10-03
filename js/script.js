const btnsTablas = document.querySelectorAll(".btn-tabla");
const multiplicacion = document.querySelector("#multiplicacion");
console.log(btnsTablas);

//recorrer todos los botones de las tablas + evento
btnsTablas.forEach(btn=>{
    btn.addEventListener("click",()=>{
        
        const tabla=btn.value;
        //creando numero aleatorio 1-10; Math.random() genera numeros 0-9.99..., floor redondea hacia abajo
        const aleatorio = Math.floor(Math.random()*10)+1;

        if(tabla==="todas"){

            const aleatorio2 = Math.floor(Math.random()*10)+1;
            multiplicacion.textContent=`${aleatorio} x ${aleatorio2}`;
        }else{
            multiplicacion.textContent=`${tabla} x ${aleatorio}`;
        };
    });
});

