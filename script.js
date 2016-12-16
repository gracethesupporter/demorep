/*	Отрисовка графика	*/
function draw(x, m_a, m_b, p, E, id, sp){
	//объект для линии А
	//simpleObj1 = getData();
	var lineA = {
  		x: x, 
  		y: m_a, 
  		type: 'scatter',
		name: 'A',
		line: {
			width: 2,
			shape: sp[0]
		}
	};
	
	//объект для линии В
	var lineB = {
  		x: x, 
  		y: m_b, 
  		type: 'scatter',
		name: 'B',
		line: {
			width: 2,
			shape: sp[1]
		}
	};
	
	//Хеминг
	var Ham = {
  		x: x, 
  		y: p, 
  		type: 'scatter',
		name: 'Хеминг',
		line: {
			width: 2,
			shape: sp[2]
		}
	};
	
	//Евклид
	var Evq = {
		x: x,
		y: E,
		type: 'scatter',
		name: 'Евклид',
		line: {
			width: 2,
			shape: sp[3]
		}
	};

	var layout = {
		yaxis: {
    		showgrid: false,
  		},
  		xaxis: {
    		showgrid: false,
    		showline: false
  		}
	};

	var data = [lineA, lineB, Ham, Evq];
	Plotly.newPlot(id, data, layout, {displayModeBar: false});	
}

/*Functions part*/
function getDataOne(){
	var arr = [];
	//считывание элементов в массив
	var elem = document.getElementsByClassName('inpPart2');
	var n  = document.getElementById('n1').value;

	//добаление в массив value
	for(var i = 0; i < elem.length; i++){
		if(elem[i].value == ""){
			elem[i].value = 1;
			arr.push(parseInt(elem[i].value));
		}else{
			arr.push(parseInt(elem[i].value));	
		}
	}

	//объект со значениями из полей
	return obj = {
		A: [arr[0], arr[1], arr[2]],
		B: [arr[3], arr[4], arr[5]],
		n: n
	};
}

function getDataTwo(){
	var arr = [];
	//считывание элементов в массив
	var elem = document.getElementsByClassName('inpPart3');
	var n  = document.getElementById('n2').value;

	//добаление в массив value
	for(var i = 0; i < elem.length; i++){
		if(elem[i].value == ""){
			elem[i].value = 0;
			arr.push(elem[i].value);
		}else{
			arr.push(elem[i].value);	
		}
	}

	//объект со значениями из полей
	return obj = {
		A: [arr[0], arr[3]],
		B: [arr[1], arr[4]],
		C: [arr[2], arr[5]],
		n: n
	};
}

function getDataThree(){
	var arr = [];
	//считывание элементов в массив
	var elem = document.getElementsByClassName('inpPart4');
	var n  = document.getElementById('n3').value;

	//добаление в массив value
	for(var i = 0; i < elem.length; i++){
		if(elem[i].value == ""){
			elem[i].value = 0;
			arr.push(elem[i].value);
		}else{
			arr.push(elem[i].value);	
		}
	}

	//объект со значениями из полей
	return obj = {
		A: [arr[0], arr[2]],
		C: [arr[1], arr[3]],
		n: n
	};
}

//--------//

function calc1(){
	var obj = getDataOne();

	var x = [];	//значения оси x - тут просто будет наращиваться определенный щаг
	var m_a = [];	//значения оси y для числа a
	var m_b = [];  //значения оси y для числа b
	var p = [];  //значения оси y для Хеминга
	var E = [];  //значения оси y для Евклида
	var dt_x = (Math.max(parseInt(obj.A[2]), parseInt(obj.B[2])) - Math.min(parseInt(obj.A[0]), parseInt(obj.B[0]))) / parseInt(obj.n); //шаг
	var j = 0;

	for(var i = Math.min(parseInt(obj.A[0]), parseInt(obj.B[0])); i <= Math.max(parseInt(obj.A[2]), parseInt(obj.B[2])); i+= dt_x, j++){                    
        x[j] = i;                    
        m_a[j] = calc_m_triangle(i, obj.A);//там три условия труголного множества (прямая модель короче,на к.р. делали)
        m_b[j] = calc_m_triangle(i, obj.B);//также для b
        p[j] = Math.abs(m_a[j] - m_b[j]);  // формула что в лабе для Хеминга
        E[j] = Math.pow(m_a[j] - m_b[j], 2); // формула что в лабе для Евклида
	}

    var sum_p=0;
    var sum_e=0;

    for(var i = 0; i < p.length; i++){
        sum_p+= p[i];
        sum_e+= E[i];
    }

	var elem1 = document.getElementById('resinp1');
	var elem2 = document.getElementById('resinp2');

	elem1.value = Math.round(sum_p);
	elem2.value = Math.round(sum_e);

	id = "myDiv1";
	sp = ["linear", "linear", "linear", "linear"];
	draw(x, m_a, m_b, p, E, id, sp);
}

function calc2(){
	var obj = getDataTwo();

	var x = [];	//значения оси x - тут просто будет наращиваться определенный щаг
	var m_a = [];	//значения оси y для числа a
	var m_b = [];  //значения оси y для числа b
	var p = [];  //значения оси y для Хеминга
	var E = [];  //значения оси y для Евклида
	var dt_x = ( Math.max( parseInt(obj.C[0]) + Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) + Math.abs(parseInt(obj.C[1])) ) - Math.min( parseInt(obj.C[0]) - Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) - Math.abs(parseInt(obj.C[1])) ) ) / parseInt(obj.n); //шаг
	var j = 0;

	for(var i = Math.min( parseInt(obj.C[0]) - Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) - Math.abs(parseInt(obj.C[1])) ); i <= Math.max( parseInt(obj.C[0]) + Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) + Math.abs(parseInt(obj.C[1])) ); i+= dt_x, j++){                    
        x[j] = i;                    
        m_a[j] = calc_m_bell(i, obj.A[0], obj.B[0], obj.C[0]);//там три условия труголного множества (прямая модель короче,на к.р. делали)
        m_b[j] = calc_m_bell(i, obj.A[1], obj.B[1], obj.C[1]);//также для b
        p[j] = Math.abs(m_a[j] - m_b[j]);  // формула что в лабе для Хеминга
        E[j] = Math.pow(m_a[j] - m_b[j], 2); // формула что в лабе для Евклида
	}

    var sum_p=0;
    var sum_e=0;

    for(var i = 0; i < p.length; i++){
        sum_p+= p[i];
        sum_e+= E[i];
    }

	var elem1 = document.getElementById('resinp3');
	var elem2 = document.getElementById('resinp4');

	elem1.value = Math.round(sum_p);
	elem2.value = Math.round(sum_e);

	id = "myDiv2";
	sp = ["spline", "spline", "spline", "spline"];
	draw(x, m_a, m_b, p, E, id, sp);
}

function calc3(){
	var obj = getDataThree();

	var x = [];	//значения оси x - тут просто будет наращиваться определенный щаг
	var m_a = [];	//значения оси y для числа a
	var m_b = [];  //значения оси y для числа b
	var p = [];  //значения оси y для Хеминга
	var E = [];  //значения оси y для Евклида
	var dt_x = ( Math.max( parseInt(obj.C[0]) + 0.5 * Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) + 0.5 * Math.abs(parseInt(obj.C[1])) ) - Math.min( parseInt(obj.C[0]) - 0.5 * Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) - 0.5 * Math.abs(parseInt(obj.C[1])) ) ) / parseInt(obj.n); //шаг
	var steps = 0;
	var j = 0;

	for(var i = Math.min( parseInt(obj.C[0]) - 0.5 * Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) - 0.5 * Math.abs(parseInt(obj.C[1])) ); i <= Math.max( parseInt(obj.C[0]) + 0.5 * Math.abs(parseInt(obj.C[0])), parseInt(obj.C[1]) + 0.5 * Math.abs(parseInt(obj.C[1])) ); i+= dt_x, j++){                    
        x[j] = i;                    
        m_a[j] = calc_m_sigma(i, obj.A[0], obj.C[0]);//там три условия труголного множества (прямая модель короче,на к.р. делали)
        m_b[j] = calc_m_sigma(i, obj.A[1], obj.C[1]);//также для b
        p[j] = Math.abs(m_a[j] - m_b[j]);  // формула что в лабе для Хеминга
        E[j] = Math.pow(m_a[j] - m_b[j], 2); // формула что в лабе для Евклида
	}

    var sum_p=0;
    var sum_e=0;

    for(var i = 0; i < p.length; i++){
        sum_p+= p[i];
        sum_e+= E[i];
    }

	var elem1 = document.getElementById('resinp5');
	var elem2 = document.getElementById('resinp6');

	elem1.value = Math.round(sum_p);
	elem2.value = Math.round(sum_e);

	id = "myDiv3";
	sp = ["spline", "spline", "spline", "spline"];
	draw(x, m_a, m_b, p, E, id, sp);
}

function calc_m_triangle(x, arr){
    if(x <= arr[0] || x >= arr[2]){
    	return 0; 
    } else if (x > arr[0] && x <= arr[1]) {
    	return (x - arr[0]) / (arr[1] - arr[0]);
    } else {
        return (arr[2] - x) / (arr[2] - arr[1]); 
	}
}

function calc_m_sigma(x, a, c){
    return 1 / (1 + Math.pow( Math.E, -a * (x - c) ) );
}
    
function calc_m_bell(x, a, b, c){ 
	return 1 / ( 1 + Math.pow( Math.abs( (x - c) / a), 2 * b) );
}