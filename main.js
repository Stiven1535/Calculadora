const pantalla = document.getElementById('display');
let entradaActual = '';
let entradaAnterior = '';
let operador = '';

const botones = document.querySelectorAll('.btn');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (valor === 'C') {
            limpiarPantalla();
        } else if (valor === '←') {
            retroceder();
        } else if (valor === '=') {
            calcular();
        } else if (['+', '-', '*', '/'].includes(valor)) {
            seleccionarOperador(valor);
        } else {
            agregarNumero(valor);
        }
    });
});

function limpiarPantalla() {
    entradaActual = '';
    entradaAnterior = '';
    operador = '';
    pantalla.textContent = '0';
}

function retroceder() {
    entradaActual = entradaActual.slice(0, -1);
    if (entradaActual === '') {
        pantalla.textContent = '0';
    } else {
        actualizarPantalla();
    }
}

function agregarNumero(valor) {
    if (valor === '.' && entradaActual.includes('.')) return; 
    if (entradaActual === '0' && valor === '0') return;
    entradaActual += valor;
    actualizarPantalla();
}

function seleccionarOperador(op) {
    if (entradaActual === '') return;
    if (entradaAnterior !== '') {
        calcular(); 
    }
    operador = op;
    entradaAnterior = entradaActual;
    entradaActual = '';
    actualizarPantalla();
}

function actualizarPantalla() {
    if (entradaActual === '') {
        pantalla.textContent = `${entradaAnterior} ${operador}`.trim() || '0';
    } else {
        pantalla.textContent = `${entradaAnterior} ${operador} ${entradaActual}`.trim();
    }
}

function calcular() {
    if (entradaActual === '' || entradaAnterior === '') return;
    let resultado;
    const anterior = parseFloat(entradaAnterior);
    const actual = parseFloat(entradaActual);

    switch (operador) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case '*':
            resultado = anterior * actual;
            break;
        case '/':
            resultado = anterior / actual;
            break;
        default:
            return;
    }

    pantalla.textContent = resultado; 
    entradaActual = resultado.toString();
    entradaAnterior = '';
    operador = '';
}
