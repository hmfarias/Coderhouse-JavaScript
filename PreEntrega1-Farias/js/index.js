/* CONSIGNAS:
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

//FUNCIONES A UTILIZAR ----------------------------------------------------------------------------------------------

//Función pedirValor solicita mediante prompt un determinado valor.
//Parámetros: nombreValor (es el nombre del valor a solicitar que se mostrará en el prompt)
//Devuelve el valor para el nombreValor ingresado, luego de validarlo
const pedirValor = (nombreValor) => {
	let continuar;
	let valor;
	do {
		valor = parseInt(prompt(`Ingrese ${nombreValor} o CERO para cancelar:`));
		switch (nombreValor.toUpperCase()) {
			case 'MES':
				if (isNaN(valor) || valor < 0 || valor > 12) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'AÑO':
				if (isNaN(valor) || valor < 0) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'HORAS TRABAJADAS':
				if (isNaN(valor) || valor < 0) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'FERIADOS TRABAJADOS':
				if (isNaN(valor) || valor < 0 || valor > calcularFeriados(mes)) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;

			default:
				break;
		}

		if (valor === 0) continuar = 'no';
	} while (continuar === 'si');
	return valor;
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
	const diasMes = new Date(ano, mes, 0).getDate(); //devuelve la cantidad de dias del mes
	switch (diasMes) {
		case 31:
			horasBase = 216;
			break;

		case 29:
			horasBase = 200;
			break;

		case 28:
			horasBase = 192;
			break;

		default:
			horasBase = 208;
	}
	return horasBase;
};

//Funcion calcularDiasTrabajados devuelve la equivalencia en días de trabajo en base a las horas base del mes
//Parámetros: 	horasTrabajadas (número dehoras trabajadas por el empleado)
//				horasBase (número de horas base del mes seleccionado)
//				mes (número del mes con el que se está trabajando)
//				ano (número del año con el que se está trabajando)
const calcularDiasTrabajados = (horasTrabajadas, horasBase, mes, ano) => {
	const diasMes = new Date(ano, mes, 0).getDate(); //devuelve la cantidad de dias del mes
	const diasTrabajados = Math.ceil((horasTrabajadas / horasBase) * diasMes); //redondeo hacia arriba en favor del empleado
	if (diasTrabajados > diasMes) {
		return diasMes;
	}
	return diasTrabajados;
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
//FIN FUNCIONES A UTILIZAR ------------------------------------------------------------------------------------------

// ALGORITMO *******************************************************************************************************

//PIDO MES A LIQUIDAR VALIDO -------------------------------------------------
const mes = pedirValor('MES');
console.log(mes);

//PIDO AÑO A LIQUIDAR VALIDO -------------------------------------------------
const ano = pedirValor('AÑO');

//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
const horasBase = calculaHorasBase(mes, ano);

//PIDO LAS HORAS TRABAJADAS POR EL EMPLEADO DURANTE EL MES Y AÑO SELECCIONADO-
const horasTrabajadas = pedirValor('HORAS TRABAJADAS');

//CALCULO EQUIVALENCIA EN DIAS PARA ESAS HORAS TRABAJADAS EN BASE A LAS HORAS BASE
const diasTrabajados = calcularDiasTrabajados(horasTrabajadas, horasBase, mes, ano);

//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base) --------
const horasExtra = calcularExtras(horasTrabajadas, horasBase);

//PIDO CANTIDAD DE FERIADOS TRABAJADOS POR EL EMPLEADO PARA EL MES Y AÑO SELECCIONADOS
const feriadosTrabajados = pedirValor('FERIADOS TRABAJADOS');

//MUESTRO LA LIQUIDACIÓN POR CONSOLA ----------------------------------------
console.log(
	`Datos ingresados:
	Mes: ${mes} Año: ${ano}
	Días del mes: ${new Date(ano, mes, 0).getDate()}
	Horas base: ${horasBase}
	Horas Trabajadas: ${horasTrabajadas}
	Dias a liquidar: ${diasTrabajados}
	Horas Extra: ${horasExtra} 
	Feriados Trabajados: ${feriadosTrabajados} \n
	Liquidación:
	Sueldo Básico:`
);

// FIN ALGORITMO ***************************************************************************************************
