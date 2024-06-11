/*
SIMULADOR LIQUIDACIÓN DE SUELDOS DE UN EMPLEADO DE SEGURIDAD PRIVADA
USO: 
PROCURAR TENER LO SUFICIENTEMENTE ANCHA LA ZONA DONDE SE MUESTRA LA CONSOLA
PARA QUE EL RECIBO DE LIQUIDACION SE MUESTRE CORRECTAMENTE

Se debe ingresar por prompt:
 - número de mes del 1 al  12 (cero para salir)
 - número de año de cuatro digitos (cero para salir)
 - horas trabajadas teniendo en cuenta que en meses de 30 dias las horas base son 208, 
	en meses de 31 dias las horas base son 216 y todo lo que excede de esas horas son horas extra
	El simulador busca las horas base correspondientes al mes ingresado y en base a eso 
	establece los dias trabajados a los que equivalen las horas ingresadas
	Si las horas ingresadas no son iguales o mayores a las horas base, se liquidará un proporcional 
 - número de dias feriados trabajados. Estos feriados se encuentran previamente cargados de acuerdo al mes y el simulador no 
	permitirá cargar una cantidad de feriados que no coincida con la cantidad maxima de feriados precargada para ese mes

	Se ha creado una clase Empleado y se ha generado una instancia de esa clase, nombrada EMPLEADO1
	El simulador muestra la liquidación para ese empleado, 
	EN EL FUTURO, la idea es ir recorridendo una tabla con los datos de todos los empleados e ir liquidando sus haberes 
	en función de las horas que hayan cubierto, las cualess también se traerán
	desde una tabla.

*/

//ESCALA DE SUELDOS VIGENTE
//CONCEPTOS REMUNERATIVOS
const SUELDO_BASICO = 356000;
const PRESENTISMO = 112000;
const REMUNERATIVO = 123000;
const FERIADO = 0;
const NOCTURNIDAD = 0;

const VIATICOS = 219000;

//CONCEPTOS NO REMUNERATIVOS
const NO_REMUNERATIVO = 30000;

//DESCUENTOS DE LEY - aplican solo sobre conceptos REMUNERATIVOS
const PORCE_JUBILACION = 0.11;
const PORCE_LEY19032 = 0.03;
const PORCE_OBRA_SOCIAL = 0.03;
const PORCE_SUVICO = 0.03;
const PORCE_APORTE_SOLIDARIO = 0.02;

//FUNCIONES A UTILIZAR ----------------------------------------------------------------------------------------------
/**
 * FUNCIÓN: pedirValor solicita mediante prompt un determinado valor.
 * PARÁMETROS:
 * 	nombreValor (es el nombre del valor a solicitar que se mostrará en el prompt)
 *  mes (es opcional y corresponde al numero del mes con el que se está trabajando)
 * Devuelve el valor para el nombreValor ingresado, luego de validarlo
 */
const pedirValor = (nombreValor, mes) => {
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

/**
 * FUNCIÓN: calcularHorasBase devuelve las horas base del mes
 * PARÁMETROS:
 * 	diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 * SOBRE LAS HORAS DE TRABAJO
 * En los meses de 30 días las horas base son 208.
 * En los meses de 31 días las horas base son 216.
 * En los meses de 28 días las horas base son 192.
 * En los meses de 29 días las horas base son 200.
 * Cuando el empleado trabaja las horas base del mes, le corresponde cobrar todos los conceptos integramente.
 * Cuando el empleado NO trabaja las horas base del mes, le corresponde cobrar un PROPORCIONAL a las horas trabajadas
 * Cuando el empleado supera las horas base del mes, el excedente se considera HORAS EXTRA
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

/**
 * FUNCIÓN: calcularDiasTrabajados devuelve la equivalencia en días de trabajo en base a las horas base del mes
 * PARÁMETROS:
 * 	horasTrabajadas (número dehoras trabajadas por el empleado)
 * 	horasBase (número de horas base del mes seleccionado)
 * 	diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 */

const calcularDiasTrabajados = (horasTrabajadas, horasBase, diasMes) => {
	const DIAS_TRABAJADOS = Math.ceil((horasTrabajadas / horasBase) * diasMes); //redondeo hacia arriba en favor del empleado
	if (DIAS_TRABAJADOS > diasMes) {
		return diasMes;
	}
	return DIAS_TRABAJADOS;
};

/**
 * FUNCIÓN: calcularExtras devuelve las horas extras trabajadas en caso de corresponder
 * las horas extras son aquellas que exceden las horas base del mes
 * ej: si las horas base del mes son 208 y el empleado trabajo 216, le corresponden 8 horas extra
 * si el empleado trabajó menos de las horas base, la función devuelve cero
 * PARÁMETROS:
 * horasTrabajadas (número de horas trabajadas)
 * horasBase (número de horas base del mes)
 */
const calcularExtras = (horasTrabajadas, horasBase) => {
	const HORAS_EXTRA = horasTrabajadas - horasBase;
	if (HORAS_EXTRA >= 0) {
		return HORAS_EXTRA;
	}
	return 0;
};

/**
 * FUNCIÓN: calcularFeriados devuelve el numero de feriados correspondiente al mes y año que se pasa por parámetro
 * PARÁMETROS:
 * 	mes (es el número de mes) Hay que mejorar luego esta función agregando el numero de año
 */
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

/**
 * FUNCIÓN:: calcularConceptoProporcional, devuelve el importe proporcional correspondiente al
 * concepto solicitado por argumento;
 * Si el empleado trabajó todos los dias se cobra el 100% del concepto; en caso contrario cobrará un
 * proporcional segun los dias trabajados
 * PARÁMETROS:
 * 	diasMes (numero que representa la cantidad de dias del mes)
 * 	diasTrabajados (numero que representa los dias efectivamente trabajados por el empleado)
 * 	importeConcepto (es el importe del concepto sobre el cual se desea calcular el importe a liquidar)
 */
const calcularProporcional = (diasMes, diasTrabajados, importeConcepto) => {
	const IMPORTE_LIQUIDACION = (importeConcepto / diasMes) * diasTrabajados;
	return IMPORTE_LIQUIDACION;
};

/**
 * FUNCIÓN:: calcularTiempoAntiguedad, calcula y devuelve la cantidad de años, meses y dias
 * transcurridos desde la fecha de ingreso del empleado hasta el ultimo día del mes con el que se está trabajando
 * PARÁMETROS:
 * fechaAlta (fecha de ingreso del empleado)
 * fechaCalculo (fecha contra la cual se desea calcular el tiempo transcurrido)
 */
const calcularTiempoAntiguedad = (fechaAlta, fechaCalculo) => {
	const FECHA_CALCULO = new Date(fechaCalculo);
	const FECHA_ALTA = new Date(fechaAlta);

	let anos = FECHA_CALCULO.getFullYear() - FECHA_ALTA.getFullYear();
	let meses = FECHA_CALCULO.getMonth() - FECHA_ALTA.getMonth();
	let dias = FECHA_CALCULO.getDate() - FECHA_ALTA.getDate();

	// Ahora ajusto los meses y años si el mes actual es menor que el mes de la fecha inicial
	if (meses < 0) {
		anos--;
		meses += 12;
	}

	// Ahora ajusto los días y meses si el día fecha de cálculo es menor que el día de la fecha inicial
	if (dias < 0) {
		meses--;
		// obtengo el último día del mes anterior
		const ultimoDiaMesAnterior = new Date(
			FECHA_CALCULO.getFullYear(),
			FECHA_CALCULO.getMonth(),
			0
		).getDate();
		dias += ultimoDiaMesAnterior;
	}
	// todavía no se como devolver los tres valores juntos
	//por ahora me sirve devolver los años que son los que se usan para calcular
	//el procentaje de antiguedad que debo aplicar sobre el sueldo básico
	return anos;
};

/**
 * FUNCIÓN:: calcularAntiguedad, devuelve el importe correspondiente al
 * concepto antiguead, en función de la fecha
 * de alta que tenga el empleado
 * Antiguedad es igual a ((Sueldo Bascio de escala + remunerativo de escala) /
 * total dias del mes * dias trabajados) * Porcentaje correspondiente de acuerdo
 * a los años transcurridos desde su fecha de alta.
 *
 * El PORCENTAJE a aplicar se basa en el siguiente esquema:
 * Desde el año 1 al  5 corresponde un 2% por año
 * Desde el año 6 al 10 corresponde un 1.5% por año
 * Dese el año 11 en adelante corresponde un 1% por año
 * PARÁMETROS:
 * 	fechaAlta (es la fecha de ingreso a la empresa que tenga el empleado)
 * 	fechaCalculo (fecha que equivale al ultimo dia del mes con el que estamos trabajando)
 * 	diasTrabajados (cantidad de días que trabajó el empleado)
 * 	diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 *  sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable
 *  global, la envío por parámetro para que la funcion sea independiente)
 * 	remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable
 * global, la envío por parámetro para que la funcion sea independiente)
 */
const calcularImporteAntiguedad = (
	fechaAlta,
	fechaCalculo,
	diasMes,
	diasTrabajados,
	sueldoBasico,
	remunerativo
) => {
	const ANOS_ANTIGUEDAD = calcularTiempoAntiguedad(fechaAlta, fechaCalculo);
	let porcentajeAntiguedad = 0;
	let porcentajeAno;

	for (let ano = 1; ano <= ANOS_ANTIGUEDAD; ano++) {
		if (ano <= 5) {
			porcentajeAno = 2;
		} else if (ano <= 10) {
			porcentajeAno = 1.5;
		} else {
			porcentajeAno = 1;
		}
		porcentajeAntiguedad += porcentajeAno / 100;
	}
	// ahora calculo el importe de la antiguedad
	const ANTIGUEDAD_LIQUIDACION =
		((sueldoBasico + remunerativo) / diasMes) * diasTrabajados * porcentajeAntiguedad;

	return ANTIGUEDAD_LIQUIDACION;
};

/**
 * FUNCIÓN:: calcularImporteHorasExtra, devuelve el importe correspondiente a las horas extra trabajadas;
 * La hora normal equivale a: (Sueldo Basico de escala + Antiguedad del empleado + Remunerativo de escala) /200
 * La hora extra equivale a la hora normal mas un 50% de su valor.
 * Hora extra = (hora normal + 50%) * 1.5
 * PARÁMETROS:
 * 	horasExtraTrabajadas (cantidad de horas extra que trabajó el empleado en el mes)
 * 	importeAntiguedad (importe correspondiente al concepto antiguedad del empleado)
 *  sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable
 *  global, la envío por parámetro para que la funcion sea independiente)
 * 	remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable
 * global, la envío por parámetro para que la funcion sea independiente)
 */
const calcularImporteHorasExtra = (
	horasExtraTrabajadas,
	importeAntiguedad,
	sueldoBasico,
	remunerativo
) => {
	const HORA_NORMAL = (sueldoBasico + importeAntiguedad + remunerativo) / 200;
	const HORA_EXTRA = HORA_NORMAL * 1.5;
	const IMPORTE_HORAS_EXTRA = HORA_EXTRA * horasExtraTrabajadas;
	return IMPORTE_HORAS_EXTRA;
};

/**
 * FUNCIÓN:: calcularImporteFeriados, devuelve el importe correspondiente a los dias feriados trabajados;
 * El día feriado se calcula: (Sueldo Basico de escala + Antiguedad del empleado + Remunerativo de escala) /25 * Cantidad de
 * feriados trabajados
 * PARÁMETROS:
 * 	feriadosTrabajados (cantidad de dias feriados que trabajó el empleado en el mes)
 * 	importeAntiguedad (importe correspondiente al concepto antiguedad del empleado)
 * 	sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable
 *  global, la envío por parámetro para que la funcion sea independiente)
 * 	remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable
 * global, la envío por parámetro para que la funcion sea independiente)
 */
const calcularImporteFeriados = (
	feriadosTrabados,
	importeAntiguedad,
	sueldoBasico,
	remunerativo
) => {
	const DIA_FERIADO = (sueldoBasico + importeAntiguedad + remunerativo) / 25;
	const IMPORTE_FERIADOS = DIA_FERIADO * feriadosTrabados;

	return IMPORTE_FERIADOS;
};

const formatearNumero = (numero) => {
	return numero.toLocaleString('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

//FIN FUNCIONES A UTILIZAR ------------------------------------------------------------------------------------------

//CLASES -----------------------------------------------------------------------------------------------------------
class Empleado {
	constructor(
		legajo,
		cuil,
		dni,
		apellido,
		nombre,
		tipo,
		estado,
		fechaNacimiento,
		fechaAlta,
		fechaBaja,
		email,
		CBU,
		suvico
	) {
		this.legajo = legajo;
		this.cuil = cuil;
		this.dni = dni;
		this.nombre = `${apellido} ${nombre}`;
		this.tipo = tipo;
		this.estado = estado;
		this.fechaNacimiento = fechaNacimiento;
		this.fechaAlta = fechaAlta;
		this.fechaBaja = fechaBaja;
		this.email = email;
		this.CBU = CBU;
		this.suvico = suvico;
	}
}
const FECHA_HOY = new Date().toLocaleDateString();
const EMPLEADO1 = new Empleado(
	'1',
	'20-22777777-7',
	'22777777',
	'FARIAS',
	'MARCELO',
	'VIGILADOR',
	'ACTIVO',
	'1971-01-01',
	'2004-09-16',
	'',
	'email@gmail.com',
	'1234567890123456789012',
	'SI'
);

// '2023-06-14',

console.log(EMPLEADO1);

//FIN CLASES -------------------------------------------------------------------------------------------------------

// ALGORITMO *******************************************************************************************************

//PIDO MES A LIQUIDAR VALIDO -------------------------------------------------
const MES = pedirValor('MES');

//PIDO AÑO A LIQUIDAR VALIDO -------------------------------------------------
const ANO = pedirValor('AÑO');

//establezco la cantidad de dias que tiene el mes seleccionado---------------
const DIAS_MES = new Date(ANO, MES, 0).getDate();

//FECHA FIN DE MES
const FECHA_FIN_MES = new Date(ANO, MES, 0);

//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
const HORAS_BASE = calculaHorasBase(DIAS_MES);

//PIDO LAS HORAS TRABAJADAS POR EL EMPLEADO DURANTE EL MES Y AÑO SELECCIONADO-
const HORAS_TRABAJADAS = pedirValor('HORAS TRABAJADAS');

//CALCULO EQUIVALENCIA EN DIAS PARA ESAS HORAS TRABAJADAS EN BASE A LAS HORAS BASE
const DIAS_TRABAJADOS = calcularDiasTrabajados(HORAS_TRABAJADAS, HORAS_BASE, DIAS_MES);

//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base) --------
const HORAS_EXTRA = calcularExtras(HORAS_TRABAJADAS, HORAS_BASE);

//PIDO CANTIDAD DE FERIADOS TRABAJADOS POR EL EMPLEADO PARA EL MES Y AÑO SELECCIONADOS
const FERIADOS_TRABAJADOS = pedirValor('FERIADOS TRABAJADOS', MES);

//CALCULO SUELDO BÁSICO
const SUELDO_BASICO_LIQUIDACION = calcularProporcional(
	DIAS_MES,
	DIAS_TRABAJADOS,
	SUELDO_BASICO
);

//CALCULO PRESENTISMO
const PRESENTISMO_LIQUIDACION = calcularProporcional(
	DIAS_MES,
	DIAS_TRABAJADOS,
	PRESENTISMO
);

//CALCULO REMUNERATIVO
const REMUNERATIVO_LIQUIDACION = calcularProporcional(
	DIAS_MES,
	DIAS_TRABAJADOS,
	REMUNERATIVO
);

//CALCULO VIATICOS
const VIATICOS_LIQUIDACION = calcularProporcional(DIAS_MES, DIAS_TRABAJADOS, VIATICOS);

//CALCULO ANTIGUEDAD PARA UN DETERMINADO EMPLEADO (ejemplo empleado1)
const ANTIGUEDAD_LIQUIDACION = calcularImporteAntiguedad(
	EMPLEADO1.fechaAlta,
	FECHA_FIN_MES,
	DIAS_MES,
	DIAS_TRABAJADOS,
	SUELDO_BASICO,
	REMUNERATIVO
);

//CALCULO HORAS EXTRA
const HORAS_EXTRA_LIQUIDACION = calcularImporteHorasExtra(
	HORAS_EXTRA,
	ANTIGUEDAD_LIQUIDACION,
	SUELDO_BASICO,
	REMUNERATIVO
);

//CALCULO IMPORTE FERIADOS
const FERIADOS_LIQUIDACION = calcularImporteFeriados(
	FERIADOS_TRABAJADOS,
	ANTIGUEDAD_LIQUIDACION,
	SUELDO_BASICO,
	REMUNERATIVO
);

//CALCULO SUMA NO REMUNERATIVA
const NO_REMUNETATIVO_LIQUIDACION = calcularProporcional(
	DIAS_MES,
	DIAS_TRABAJADOS,
	NO_REMUNERATIVO
);

// CALCULO EL TOTAL DE BONIFICACIONES REMUNERATIVAS
const TOTAL_REMUNERATIVO =
	SUELDO_BASICO_LIQUIDACION +
	ANTIGUEDAD_LIQUIDACION +
	REMUNERATIVO_LIQUIDACION +
	PRESENTISMO_LIQUIDACION +
	FERIADOS_LIQUIDACION +
	HORAS_EXTRA_LIQUIDACION;

// CALCULO EL TOTAL DE BONIFICACIONES NO REMUNERATIVAS
const TOTAL_NO_REMUNERATIVO = VIATICOS_LIQUIDACION + NO_REMUNETATIVO_LIQUIDACION;

// CALCULO DE LOS APORTES --------------------------------------------------
// CALCULO IMPORTE APORTE JUBILATORIO
const APORTE_JUBILATORIO_LIQUIDACION = TOTAL_REMUNERATIVO * PORCE_JUBILACION;

// CALCULO IMPORTE APORTE LEY 19.032
const APORTE_LEY19032_LIQUIDACION = TOTAL_REMUNERATIVO * PORCE_LEY19032;

// CALCULO IMPORTE APORTE SUVICO
// si el empleado es socio de SUVICO corresponde un 3% en caso contratio 2%
let aporteSuvicoLiquidacion;

switch (EMPLEADO1.suvico) {
	case 'SI':
		aporteSuvicoLiquidacion =
			(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_SUVICO;
		break;

	default:
		aporteSuvicoLiquidacion =
			(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_APORTE_SOLIDARIO;
		break;
}

// CALCULO IMPORTE APORTE OBRA SOCIAL
const APORTE_OBRA_SOCIAL_LIQUIDACION =
	(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_OBRA_SOCIAL;

// FIN CALCULO DE LOS APORTES ----------------------------------------------

// CALCULO EL TOTAL DE DESCUENTOS
const TOTAL_DESCUENTOS =
	APORTE_JUBILATORIO_LIQUIDACION +
	APORTE_LEY19032_LIQUIDACION +
	aporteSuvicoLiquidacion +
	APORTE_OBRA_SOCIAL_LIQUIDACION;

// CALCULO EL TOTAL DE BOLSILLO
const TOTAL_BOLSILLO = TOTAL_REMUNERATIVO + TOTAL_NO_REMUNERATIVO - TOTAL_DESCUENTOS;

//MUESTRO LA LIQUIDACIÓN POR CONSOLA (procurar que sea ancha el area de consola------
console.log(
	`   Fecha de proceso: ${FECHA_HOY}
	------------------------------------------------------------
	Datos ingresados:
	Mes: ${MES} Año: ${ANO}
	Días del mes: ${DIAS_MES}
	Horas base: ${HORAS_BASE}
	Horas Trabajadas: ${HORAS_TRABAJADAS}
	Dias a liquidar: ${DIAS_TRABAJADOS}
	Horas Extra: ${HORAS_EXTRA}
	Feriados Trabajados: ${FERIADOS_TRABAJADOS} \n
	------------------------------------------------------------
	Liquidación:   REMUNERATIVOS  NO REMUNERATIVOS   DESCUENTOS
	------------------------------------------------------------
	Sueldo Básico: $ ${formatearNumero(SUELDO_BASICO_LIQUIDACION)}
	Antiguedad   : $ ${formatearNumero(ANTIGUEDAD_LIQUIDACION)}
	Remunerativo : $ ${formatearNumero(REMUNERATIVO_LIQUIDACION)}
	Presentismo  : $ ${formatearNumero(PRESENTISMO_LIQUIDACION)}
	Feriados     : $ ${formatearNumero(FERIADOS_LIQUIDACION)}
	Horas Extra  : $ ${formatearNumero(HORAS_EXTRA_LIQUIDACION)}
	Viáticos     : 			 	   $ ${formatearNumero(VIATICOS_LIQUIDACION)}
	Suma No Remun: 				   $ ${formatearNumero(NO_REMUNETATIVO_LIQUIDACION)}
	------------------------------------------------------------
	TOTAL BONIFIC:   $ ${formatearNumero(TOTAL_REMUNERATIVO)}  $ ${formatearNumero(
		TOTAL_NO_REMUNERATIVO
	)}     
	------------------------------------------------------------
	Jubilación  : 								    $ ${formatearNumero(APORTE_JUBILATORIO_LIQUIDACION)}
	Ley 19.032  : 								    $ ${formatearNumero(APORTE_LEY19032_LIQUIDACION)}
	SUVICO      : 								    $ ${formatearNumero(aporteSuvicoLiquidacion)}
	Obra Social: 								    $ ${formatearNumero(APORTE_OBRA_SOCIAL_LIQUIDACION)}
	------------------------------------------------------------
	TOTAL DESCUENTOS:   						   $ ${formatearNumero(TOTAL_DESCUENTOS)}
	------------------------------------------------------------
	TOTAL DE BOLSILLO: $ ${formatearNumero(TOTAL_BOLSILLO)}
	`
);

// FIN ALGORITMO ***************************************************************************************************
