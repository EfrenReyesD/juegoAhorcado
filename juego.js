/*********************************************VARIABLES*******************************************/
const btn_iniciar_juego = id('btn-iniciar-juego');
const btn_agregar_palabra = id('btn-agregar-palabra');

const btn_guargar_palabra = id('btn-guardar-palabra');
const btn_cancelar = id('cancelar-guardar-palabra');

const btn_nuevo_juego = id('btn-nuevo-juego');
const btn_desistir = id('btn-desistir');

const contenedor_inicio = id('contenedor-inicio');
const contenedor_agregar_palabra = id('contenedor-agregar-palabra');
const contenedor_jugar = id('contenedor-jugar');

const mensaje_ganaste_perdiste = id('mensaje-ganaste-perdiste');
const contenido_letras_tecladas = id('letras-tecleadas');         
const contendor_span=id('contenedor_span');            
const imagen_ahorcado = id('imagen-ahorcado');
const palabra_a_agregar = id('new-palabra');

const palabras = [
    'java',
    'php',
    'python',
    'javascript',
    'html',
    'css',
    'ruby',
    'sql',
    'kotlin',
    'android',
    'windows',
    'linux',
    'mac',
    'software',
    'hardware',
    'computadora',
    'memoria',
    'procesador',
    'chrome',
    'mozilla',
    'codigo',
    'libreria',
    'bug',
    'dominio',
    'hosting',
    'frontend',
    'backend',
    'desarrollador',
    'diseñador',
    'ingeniero',
    'responsive',
    'cookies',
]; 

var letras_tecladas=['']; //letras tecladas a mostrar
let palabra; //palabra ramdom
let cant_errores=0; //letras erradas
let cant_aciertos=0; //letras acertadas

/********************************************EVENTOS DE BOTONES********************************************/
btn_iniciar_juego.addEventListener('click',(event)=>{
    //reset de variables
    mensaje_ganaste_perdiste.innerHTML="";
    cant_errores=0; //letras erradas
    cant_aciertos=0; //letras acertadas
    letras_tecladas=[''];
    contenido_letras_tecladas.innerHTML='';

    //configuraciones vista
    contenedor_inicio.style.display='none';
    contenedor_jugar.style.display='block';
    contenedor_agregar_palabra.style='none';
    iniciar_Juego();
    
})

btn_agregar_palabra.addEventListener('click',(event)=>{
    contenedor_inicio.style.display='none';
    contenedor_jugar.style.display='none';
    contenedor_agregar_palabra.style.display='block';

})

btn_guargar_palabra.addEventListener('click',(event)=>{

    const pattern = new RegExp('^[A-ZñÑ]+$', 'i'); //limitar letras permitidas
    const new_palabra = palabra_a_agregar.value;

    //validación de campo textArea y agregar nueva palabra
    if(!new_palabra){
        alert("campo vacio")
    }else{
        if(new_palabra.length<=8 && pattern.test(new_palabra)){
            //Agregar nueva palabra al array "palabras"
            palabras.push(new_palabra);
            iniciar_Juego();
            contenedor_inicio.style.display='none';
            contenedor_jugar.style.display='block';
            contenedor_agregar_palabra.style.display='none'; 
        }else{
            alert("Solo letras y máximo 8")
        }  
    }

})

btn_cancelar.addEventListener('click',(event)=>{
    contenedor_inicio.style.display='block';
    contenedor_jugar.style.display='none';
    contenedor_agregar_palabra.style.display='none';
    
})

btn_desistir.addEventListener('click',(event)=>{
    contenedor_inicio.style.display='block';
    contenedor_jugar.style.display='none';
    contenedor_agregar_palabra.style.display='none';

    //eliminar EventListener 'keypress'
    document.removeEventListener('keypress',test);
})

btn_nuevo_juego.addEventListener('click',iniciar_Juego);


/********************************************FUNCIONES****************************************************/
function id(str){
    return document.getElementById(str);
}

function valor_al_azar(palabras){
    //Retorna un numero al azar de acuerdo a la cantidad de palabras en el array
    const cantidad_palabras = palabras.length;
    const valor_mas_bajo = 0;
    const amplitud_valores = cantidad_palabras-valor_mas_bajo;
    const valor_al_azar= Math.floor(Math.random()*amplitud_valores)+valor_mas_bajo;
    return valor_al_azar;
}

function iniciar_Juego(){
    /*****************RESET VARIABLES**********************/
    palabra_a_agregar.value='';
    mensaje_ganaste_perdiste.innerHTML="";
    imagen_ahorcado.src = `images/imagen0.png`;
    cant_errores=0; //letras erradas
    cant_aciertos=0; //letras acertadas
    letras_tecladas=[''];
    contenido_letras_tecladas.innerHTML='';
    contendor_span.innerHTML='';

    const valor_ramdom=valor_al_azar(palabras);
    palabra = palabras[valor_ramdom];
    const can_letras = palabra.length;

    //crear spans de acuerdo a la cantidad de letras de palabra ramdom
    for(let i=0; i<can_letras;i++){
        const span = document.createElement('span');
        contendor_span.appendChild(span);
    }
    document.addEventListener('keypress',test); 
}

//funcion leer teclado y limitar letras
function test(event){
    
    if(contendor_span.length!=0){
        
        if(event.keyCode>=97 && event.keyCode<=122){
            
            bandera=0;
            for(var i=0;i<letras_tecladas.length;i++){
                if(letras_tecladas.includes(event.key)){
                    break;   
                }else{
                    letras_tecladas.push(event.key);
                    contenido_letras_tecladas.innerHTML=letras_tecladas;
                    //Incluiremos la funcion de comprobar
                    existe_letraClick(event.key);
                }
            }
            
            
        }
        
    }
    
}

function existe_letraClick(letrasClick){
    const spans = document.querySelectorAll('#contenedor_span span');
    palabra=palabra.toLowerCase();
    let acerto=false;
    for(let i=0;i<palabra.length;i++){
        if(letrasClick==palabra[i]){
            //variable i es la posicion de la letra en la palabra
            //Este coincide con el Span en que mostraremos las letras
            
            spans[i].innerHTML=letrasClick; //asignación de letra en spans
            cant_aciertos++;
            acerto=true; 
        }
    }

    if(acerto==false){
        cant_errores++;
        const source = `images/imagen${cant_errores}.png`; //ruta de imagenes
        imagen_ahorcado.src = source; //cambio de imagenes de acuerdo a los errores
    }
    if(cant_errores==8){
        //Configuraciones cuando se pierde el juego
        mensaje_ganaste_perdiste.innerHTML="Fin de Juego!!";
        mensaje_ganaste_perdiste.style.color='rgb(255,0,0)';
        contenido_letras_tecladas.innerHTML=`La palabra era ${palabra}`;
        //eliminar EventListener 'keypress'
        document.removeEventListener('keypress',test);
    }else if(cant_aciertos==palabra.length){
        //Configuraciones Cuando se gana el juego
        imagen_ahorcado.src = `images/imagen0.png`;
        mensaje_ganaste_perdiste.innerHTML="Felicidades Ganaste!!";
        mensaje_ganaste_perdiste.style.color='rgb(0,0,255)';

        //eliminar EventListener 'keypress'
        document.removeEventListener('keypress',test);
    }
}
