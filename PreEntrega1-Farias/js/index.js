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
				if (isNaN(valor) || valor < 0 || valor > calcularFeriados(MES)) {
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
const calculaHorasBase = (diasMes) => {
	let horasBase;
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
const calcularDiasTrabajados = (horasTrabajadas, horasBase, diasMes) => {
	const DIAS_TRABAJADOS = Math.ceil((horasTrabajadas / horasBase) * diasMes); //redondeo hacia arriba en favor del empleado
	if (DIAS_TRABAJADOS > diasMes) {
		return diasMes;
	}
	return DIAS_TRABAJADOS;
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

//Función calcularSueldoBásico, devuelve el importe correspondiente al concepto Sueldo Basico;
//Si el empleado trabajó todos los dias se cobra el 100% del concepto; en caso contrario cobrará un proporcional
const calcularSueldoBásico = (diasMes, diasTrabajados) => {
	const SB_LIQUIDACION = ((SUELDO_BASICO / diasMes) * diasTrabajados).toFixed(2);
	return SB_LIQUIDACION;
};
//FIN FUNCIONES A UTILIZAR ------------------------------------------------------------------------------------------

// ALGORITMO *******************************************************************************************************

//PIDO MES A LIQUIDAR VALIDO -------------------------------------------------
const MES = pedirValor('MES');

//PIDO AÑO A LIQUIDAR VALIDO -------------------------------------------------
const ANO = pedirValor('AÑO');

//establezco la cantidad de dias que tiene el mes seleccionado---------------
const DIAS_MES = new Date(ANO, MES, 0).getDate();

//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
const HORAS_BASE = calculaHorasBase(DIAS_MES);

//PIDO LAS HORAS TRABAJADAS POR EL EMPLEADO DURANTE EL MES Y AÑO SELECCIONADO-
const HORAS_TRABAJADAS = pedirValor('HORAS TRABAJADAS');

//CALCULO EQUIVALENCIA EN DIAS PARA ESAS HORAS TRABAJADAS EN BASE A LAS HORAS BASE
const DIAS_TRABAJADOS = calcularDiasTrabajados(HORAS_TRABAJADAS, HORAS_BASE, DIAS_MES);

//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base) --------
const HORAS_EXTRA = calcularExtras(HORAS_TRABAJADAS, HORAS_BASE);

//PIDO CANTIDAD DE FERIADOS TRABAJADOS POR EL EMPLEADO PARA EL MES Y AÑO SELECCIONADOS
const FERIADOS_TRABAJADOS = pedirValor('FERIADOS TRABAJADOS');

//CALCULO SUELDO BÁSICO
const SUELDO_BASICO_LIQUIDACION = calcularSueldoBásico(DIAS_MES, DIAS_TRABAJADOS);

//MUESTRO LA LIQUIDACIÓN POR CONSOLA ----------------------------------------
console.log(
	`Datos ingresados:
	Mes: ${MES} Año: ${ANO}
	Días del mes: ${DIAS_MES}
	Horas base: ${HORAS_BASE}
	Horas Trabajadas: ${HORAS_TRABAJADAS}
	Dias a liquidar: ${DIAS_TRABAJADOS}
	Horas Extra: ${HORAS_EXTRA} 
	Feriados Trabajados: ${FERIADOS_TRABAJADOS} \n
	Liquidación:
	Sueldo Básico: $ ${Intl.NumberFormat('de-DE').format(SUELDO_BASICO_LIQUIDACION)} `
);

// FIN ALGORITMO ***************************************************************************************************
