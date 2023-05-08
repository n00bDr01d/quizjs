//seleccionando todos los elementos requeridos
const btn_inicio = document.querySelector(".btn_inicio button");
const info_caja = document.querySelector(".caja_informacion");
const btn_salida = info_caja.querySelector(".botones .salir");
const btn_continuar = info_caja.querySelector(".botones .volver-a-empezar");
const caja_de_preguntas = document.querySelector(".caja_cuestionario");
const caja_de_resultados = document.querySelector(".caja_de_resultados");
const lista_de_opciones = document.querySelector(".lista_de_opciones");
const linea_de_tiempo = document.querySelector("header .linea_de_tiempo");
const textoTiempo = document.querySelector(".cronometro .tiempo_restante_sec");
const contadorTiempo = document.querySelector(".cronometro .cronometro_sec");

// Si el botón Empezar hace clic
btn_inicio.onclick = ()=>{
    info_caja.classList.add("infoActiva"); //muestra la caja de información
}

// Si salir se ha cliqueado
btn_salida.onclick = ()=>{
    info_caja.classList.remove("infoActiva"); //oculta la caja de información
}

// si el boton continuar ha sido cliqueado
btn_continuar.onclick = ()=>{
    info_caja.classList.remove("infoActiva"); //Ocultar cuadro de información
    caja_de_preguntas.classList.add("preguntaActiva"); //Mostrar caja de cuestionario
    mostrarPreguntas(0); //Llamar a la función mostrarPreguntas
    pregContador(1); //Pasando 1 parámetro a pregcontador
    iniciarCronometro(15); //Llamar a la función iniciarcronometro
    iniciarCronometroLinea(0); //llamar a la función iniciarcronometrolinea
}

let tiempoValor =  15;
let preg_contador = 0;
let nro_pregunta = 1;
let puntaje = 0;
let contador;
let contadorLinea;
let conValor = 0;

const reiniciar_cuestionario = caja_de_resultados.querySelector(".botones .volver-a-empezar");
const salir_cuestionario = caja_de_resultados.querySelector(".botones .salir");

// Si la función reiniciarCuestionario hace clic
reiniciar_cuestionario.onclick = ()=>{
    caja_de_preguntas.classList.add("preguntaActiva"); //Mostrar caja de cuestionario
    caja_de_resultados.classList.remove("resultadoActivo"); //ocultar caja de cuestionario
    tiempoValor = 15; 
    preg_contador = 0;
    nro_pregunta = 1;
    puntaje = 0;
    conValor = 0;
    mostrarPreguntas(preg_contador); //llamar a la función mostrar preguntas
    pregContador(nro_pregunta); //Pasando el valor NRO_PREGUNTA a PREGCONTADOR
    clearInterval(contador); //limpiar contador
    clearInterval(contadorLinea); //limpiar la linea contadorLinea
    iniciarCronometro(tiempoValor); //llama a la función que inicia el cronometro
    iniciarCronometroLinea(conValor); //iniciar el conometro de la linea
    textoTiempo.textContent = "Tiempo Restante"; //Cambiar el texto de Textotiempo a TIempo a la izquierda
    siguiente_btn.classList.remove("Mostrar"); //oculta el boton siguiente
}

// Si se quiere salir
salir_cuestionario.onclick = ()=>{
    window.location.reload(); //Recargar la ventana actual
}

const siguiente_btn = document.querySelector("footer .siguiente_btn");
const contador_preguntas_inferiores = document.querySelector("footer .total_pregunta");

// Si el botón Siguiente que hizo clic en
siguiente_btn.onclick = ()=>{
    if(preg_contador < preguntas.length - 1){ //Si el recuento de preguntas es menor que la longitud total de la pregunta
        preg_contador++; //incremento el valor del contador
        nro_pregunta++; //incremento el valor del contador
        mostrarPreguntas(preg_contador); //muestro las preguntas
        pregContador(nro_pregunta); //Pasando el valor NRO_PREGUNTA a PREGCONTADOR
        clearInterval(contador); //limpio el contador
        clearInterval(contadorLinea); //limpio el contador
        iniciarCronometro(tiempoValor); //Inicio de nuevo el cronometro
        iniciarCronometroLinea(conValor); //inicio el cronometro de la linea
        textoTiempo.textContent = "Tiempo restante"; //Cambiar el textotiempo a tiempo a la izquierda
        siguiente_btn.classList.remove("mostrar"); //Ocultar el botón siguiente
    }else{
        clearInterval(contador); //limpio el contador
        clearInterval(contadorLinea); //limpio el contador
        mostrarResultado(); //Llamar a la función Mostrarresultado
    }
}

// Obtener preguntas y opciones del array de preguntas
function mostrarPreguntas(index){
    const preg_texto = document.querySelector(".texto_pregunta");

    //Creación de un nuevo span y etiqueta div para preguntas y opciones y aprobar el valor usando el índice de matriz
    let preg_tag = '<span>'+ preguntas[index].num + ". " + preguntas[index].pregunta +'</span>';
    let opcion_tag = '<div class="opcion"><span>'+ preguntas[index].opciones[0] +'</span></div>'
    + '<div class="opcion"><span>'+ preguntas[index].opciones[1] +'</span></div>'
    + '<div class="opcion"><span>'+ preguntas[index].opciones[2] +'</span></div>'
    + '<div class="opcion"><span>'+ preguntas[index].opciones[3] +'</span></div>';
    preg_texto.innerHTML = preg_tag; //Agregar nueva etiqueta span dentro de preg_tag
    lista_de_opciones.innerHTML = opcion_tag; //Agregar nueva etiqueta divs interior opción_tag
    
    const opcion = lista_de_opciones.querySelectorAll(".opcion");

    // Establecer el atributo OnClick a todas las opciones disponibles
    for(i=0; i < opcion.length; i++){
        opcion[i].setAttribute("onclick", "opcionSeleccionada(this)");
    }
}
// creating the new div tags which for icons
let okIconoTag = '<div class="icono marcar"><i class="fas fa-check"></i></div>';
let cruzIconoTag = '<div class="icono cruz"><i class="fas fa-times"></i></div>';

//if user clicked on option
function opcionSeleccionada(respuesta){
    clearInterval(contador); //limpiar contador
    clearInterval(contadorLinea); //limpiar contadorLinea
    let respuestaUsuario = respuesta.textContent; //Obtener la opción seleccionada por el usuario
    let respuestaOK = preguntas[preg_contador].respuesta; //Obtener una respuesta correcta del array
    const allOptions = lista_de_opciones.children.length; //Obtener todos los elementos de opción
    
    if(respuestaUsuario == respuestaOK){ //Si la opción seleccionada del usuario es igual a la respuesta correcta del Array
        puntaje += 1; //incrementamos en 1
        respuesta.classList.add("correcto"); //Agregar color verde para corregir la opción seleccionada
        respuesta.insertAdjacentHTML("beforeend", okIconoTag); //añadiendo el icono ok
        console.log("Respuesta correcta");
        console.log("Tus respuestas correctas = " + puntaje);
    }else{
        respuesta.classList.add("incorrecto"); //Agregar color rojo para corregir la opción seleccionada
        respuesta.insertAdjacentHTML("beforeend", cruzIconoTag); //Agregar icono cruzado para corregir la opción seleccionada
        console.log("Respuesta incorrecta");

        for(i=0; i < allOptions; i++){
            if(lista_de_opciones.children[i].textContent == respuestaOK){ //Si hay una opción que coincide con una respuesta en las preguntas
                lista_de_opciones.children[i].setAttribute("class", "opcion correcto"); //Agregar color verde a la opción combinada
                lista_de_opciones.children[i].insertAdjacentHTML("beforeend", okIconoTag); //aañadiendo el icono ok
                console.log("Respuesta correcta seleccionada automáticamente.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        lista_de_opciones.children[i].classList.add("deshabilitado"); //Una vez que el usuario seleccione una opción, entonces deshabilitado todas las opciones
    }
    siguiente_btn.classList.add("mostrar"); //Muestre el botón siguiente si el usuario seleccionó cualquier opción
}

function mostrarResultado(){
    info_caja.classList.remove("infoActiva"); //ocultar la caja de info
    caja_de_preguntas.classList.remove("preguntaActiva"); //oculta la caja de preguntas
    caja_de_resultados.classList.add("resultadoActivo"); //muestra la caja de resultados
    const puntajeTxto = caja_de_resultados.querySelector(".puntaje_texto");
    if (puntaje > 3){ // Si el usuario obtuvo más de  3
        //Crear una nueva etiqueta de tramo y pasar el número de puntaje del usuario y el número de pregunta total
        let puntajeTag = '<span>y felicidades! 🎉, tu tienes <p>'+ puntaje +'</p> de <p>'+ preguntas.length +'</p></span>';
        puntajeTxto.innerHTML = puntajeTag;  //adding new span tag inside score_Text
    }
    else if(puntaje > 1){ // Si el usuario obtuvo más de  1
        let puntajeTag = '<span>y buenisimo 😎, tu tienes <p>'+ puntaje +'</p> de <p>'+ preguntas.length +'</p></span>';
        puntajeTxto.innerHTML = puntajeTag;
    }
    else{ // Si el usuario obtuvo menos de  1
        let puntajeTag = '<span>and ni modo 😐, tu solo tienes <p>'+ puntaje +'</p> de <p>'+ preguntas.length +'</p></span>';
        puntajeTxto.innerHTML = puntajeTag;
    }
}

function iniciarCronometro(tiempo){
    contador = setInterval(temporizador, 1000);
    function temporizador(){
        contadorTiempo.textContent = tiempo; //Cambiar el valor de Contadortiempo con el valor de Tiempo
        tiempo--; //decrementa el valor del tiempo
        if(tiempo < 9){ //if temporizador is less than 9
            let addZero = contadorTiempo.textContent; 
            contadorTiempo.textContent = "0" + addZero; //Si el temporizador es inferior a 9
        }
        if(tiempo < 0){ //Si el temporizador es inferior a 0
            clearInterval(contador); //limpiar contador
            textoTiempo.textContent = "tiempo fuera"; //Cambie el texto de Tiempo a Tiempo Off
            const allOptions = lista_de_opciones.children.length; //Obtener todos los elementos de opción
            let respuestaOK = preguntas[preg_contador].respuesta; //Obtener una respuesta correcta del array
            for(i=0; i < allOptions; i++){
                if(lista_de_opciones.children[i].textContent == respuestaOK){ //Si hay una opción que coincide con una respuesta de matriz
                    lista_de_opciones.children[i].setAttribute("class", "opcion correcto"); //Agregar color verde a la opción combinada
                    lista_de_opciones.children[i].insertAdjacentHTML("beforeend", okIconoTag); //Agregar icono de tick a la opción combinada
                    console.log("Tiempo agotado: respuesta correcta automática seleccionada.");
                }
            }
            for(i=0; i < allOptions; i++){
                lista_de_opciones.children[i].classList.add("deshabilitado"); //Una vez que el usuario seleccione una opción, entonces Deshabilitado todas las opciones
            }
            siguiente_btn.classList.add("mostrar"); //Muestre el botón siguiente si el usuario seleccionó cualquier opción
        }
    }
}

function iniciarCronometroLinea(tiempo){
    contadorLinea = setInterval(temporizador, 29);
    function temporizador(){
        tiempo += 1; //Actualización de valor TIempo con 1
        linea_de_tiempo.style.width = tiempo + "px"; //Aumento del ancho de Linea_De_Tiempo con PX por valor Tiempo
        if(tiempo > 549){ //Si el valor de Tiempo es mayor que 549
            clearInterval(contadorLinea); //limpiar contadorLinea
        }
    }
}

function pregContador(index){
    //Crear una nueva etiqueta span y pasar el número de pregunta y la pregunta total
    let totalPregTag = '<span><p>'+ index +'</p> de <p>'+ preguntas.length +'</p> preguntas</span>';
    contador_preguntas_inferiores.innerHTML = totalPregTag;  //Agregar nueva etiqueta de span dentro de contador_preguntas_inferiores
}