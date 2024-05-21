/* 
Crear un algoritmo con un condicional
Crear un algoritmo utilizando un ciclo
Armar un simulador interactivo, la estructura final de tu proyecto integrador

SIMULADOR INTERACTIVO
Empezar a armar la estructura inicial de tu proyecto integrador
Pensar el alcance de tu proyecto
Armar la estructura HTML del proyecto
Incorporar algoritmo condicional y algoritmo con ciclo
Utilizar funciones para realizar esas operaciones
*/

/*
SIMULADOR LIQUIDACIÓN DE SUELDOS DE UN EMPLEADO DE SEGURIDAD PRIVADA
*/
//ESCALA DE SUELDOS VIGENTE
//CONCEPTOS REMUNERATIVOS
const SUELDO_BASICO = 356000;
const PRESENTISMO = 112000;
const REMUNERATIVO = 123000;
const FERIADO = 0;
const NOCTURNIDAD = 0;
const ANTIGUEDAD = 0;
const HORAS_EXTRA = 0;
const VIATICOS = 219000;

//CONCEPTOS NO REMUNERATIVOS
const NO_REMUNERATIVO = 30000;

//DESCUENTOS DE LEY - aplican solo sobre conceptos REMUNERATIVOS
const PORCE_JUBILACION = 0.11;
const PORCE_LEY_19032 = 0.03;
const PORCE_OBRA_SOCIAL = 0.03;
const PORCE_SUVICO = 0.03;

//FUNCIONES A UTILIZAR ---------------------------------------------------
//Años bisiestos son aquellos en los que el numero de año es multiplo exacto de 4 excepto para los años divisibles por 100 que no son años bisiestos, a menos que sean divisibles por 400
//Función esBisiesto devuelve verdadero o falso según el año recibido por parámetro sea bisiesto o no respectivamente
//Parámetros: ano (es el número de año sobre el cual se desea saber si es bisiesto)
const esBisiesto = (ano) => {
	if ((ano % 4 === 0 && ano % 100 != 0) || ano % 400 === 0) {
		return true;
	}
	return false;
};

//Función esMes31 devuelve verdadero o falso segun se trate de un mes de 31 dias o no
//Parámetros: mes (es el número de mes sobre el cual se desea saber si tiene 31 días)
const esMes31 = (mes) => {
	if (
		mes === 1 ||
		mes === 3 ||
		mes === 5 ||
		mes === 7 ||
		mes === 8 ||
		mes === 10 ||
		mes === 12
	) {
		return true;
	}
	return false;
};

//Función esFebrero devuelve verdadero o falso segun se trate del mes de febrero
//Parámetros: mes (es el número de mes sobre el cual se desea saber si es febrero)
const esFebrero = (mes) => {
	if (mes === 2) {
		return true;
	}
	return false;
};

//Función calcularHorasBase devuelve las horas base del mes
//Parámetros mes (es el número de mes) ano (es el numero de año)
/* 
    SOBRE LAS HORAS DE TRABAJO
    En los meses de 30 días las horas base son 208. 
    En los meses de 31 días las horas base son 216. 
    En los meses de 28 días las horas base son 192. 
    En los meses de 29 días las horas base son 200. 
    Cuando el empleado trabaja las horas base del mes, le corresponde cobrar todos los conceptos integramente.
    Cuando el empleado NO trabaja las horas base del mes, le corresponde cobrar un PROPORCIONAL a las horas trabajadas
    Cuando el empleado supera las horas base del mes, el excedente se considera HORAS EXTRA
*/
const calculaHorasBase = (mes, ano) => {
	let horasBase;
	switch (true) {
		case esMes31(mes):
			horasBase = 216;
			break;

		case esFebrero(mes):
			if (esBisiesto(ano)) {
				horasBase = 200;
			} else {
				2;
				horasBase = 192;
			}
			break;

		default:
			horasBase = 208;
			break;
	}
	return horasBase;
};

//Función calcularExtras devuelve las horas extras trabajadas en caso de corresponder
//las horas extras son aquellas que exceden las horas base del mes
//ej: si las horas base del mes son 208 y el empleado trabajo 216, le corresponden 8 horas extra
//si el empleado trabajó menos de las horas base, la función devuelve cero
//parametros: hTrabajadas (número de horas trabajadas) hBase (número de horas base del mes)
const calcularExtras = (hTrabajadas, hBase) => {
	const HORAS_EXTRA = hTrabajadas - hBase;
	if (HORAS_EXTRA >= 0) {
		return HORAS_EXTRA;
	}
	return 0;
};

// Función calcularFeriados devuelve el numero de feriados correspondiente al mes y año que se pasa por parámetro
// Parámetros: mes (es el número de mes) Hay que mejorar luego esta función agregando el numero de año
const calcularFeriados = (mes) => {
	let cantidadFeriados;
	switch (mes) {
		case 1:
		case 7:
		case 8:
		case 11:
			cantidadFeriados = 1;
			break;

		case 2:
		case 4:
		case 5:
		case 10:
		case 12:
			cantidadFeriados = 2;
			break;

		case 3:
		case 6:
			cantidadFeriados = 3;
			break;

		default:
			cantidadFeriados = 0;
			break;
	}
	return cantidadFeriados;
};
//FIN FUNCIONES A UTILIZAR ---------------------------------------------------

//DATOS DE MES Y AÑO -----------------------------------------------------
let continuar;
let mes;
let ano;

//PIDO MES VALIDO
do {
	mes = parseInt(prompt('Ingrese MES o CERO para cancelar:'));
	if (isNaN(mes) || mes < 0 || mes > 12) {
		alert('ingrese un MES válido');
		continuar = 'si';
	} else {
		continuar = 'no';
	}
	if (mes === 0) continuar = 'no';
} while (continuar === 'si');

//PIDO AÑO VALIDO
do {
	ano = parseInt(prompt('Ingrese AÑO o CERO para cancelar:'));
	if (isNaN(ano) || ano < 0) {
		alert('Ingrese un AÑO válido');
		continuar = 'si';
	} else {
		continuar = 'no';
	}
	if (ano === 0) continuar = 'no';
} while (continuar === 'si');
//FIN DATOS DE MES Y AÑO ----------------------------------------------------

//ESTABLEZCO HORAS BASE DEL MES ---------------------------------------------
let horasBase = calculaHorasBase(mes, ano);

//PIDO LAS HORAS TRABAJADAS -------------------------------------------------
let horasTrabajadas;
do {
	horasTrabajadas = parseInt(
		prompt('Ingrese el total de HORAS TRABAJADAS o CERO para cancelar:')
	);
	if (isNaN(horasTrabajadas) || horasTrabajadas < 0) {
		alert('Ingrese un un numero de HORAS TRABAJADAS válido');
		continuar = 'si';
	} else {
		continuar = 'no';
	}
	if (horasTrabajadas === 0) continuar = 'no';
} while (continuar === 'si');
//FIN PIDO LAS HORAS TRABAJADAS ----------------------------------------------

//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base)
let horasExtra = calcularExtras(horasTrabajadas, horasBase);

//ESTABLEZCO LA CANTIDAD MÁXIMA DE FERIADOS DEL MES
const FERIADOS_MES = calcularFeriados(mes);

//PIDO CANTIDAD DE FERIADOS TRABAJADOS ---------------------------------------
let feriadosTrabajados;
do {
	feriadosTrabajados = parseInt(
		prompt('Ingrese la cantidad de FERIADOS TRABAJADOS o CERO para cancelar:')
	);
	if (
		isNaN(feriadosTrabajados) ||
		feriadosTrabajados < 0 ||
		feriadosTrabajados > FERIADOS_MES
	) {
		alert('Ingrese un un numero de FERIADOS TRABAJADOS válido');
		continuar = 'si';
	} else {
		continuar = 'no';
	}
	if (feriadosTrabajados === 0) continuar = 'no';
} while (continuar === 'si');
//FIN PIDO LAS HORAS TRABAJADAS ----------------------------------------------

console.log(
	`Mes: ${mes} Año: ${ano} \nHoras base: ${horasBase} \nHoras Trabajadas: ${horasTrabajadas}\nHoras Extra: ${horasExtra} \nFeriados Trabajados: ${feriadosTrabajados} `
);
