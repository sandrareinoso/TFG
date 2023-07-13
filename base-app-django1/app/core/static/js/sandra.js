 //PDF 
 function pasarPDF(button) {
	var algoritmo = $("#clustering").val();
		if(algoritmo == 1){
		var valorX = $("#valorX").val();
		var valorY = $("#valorY").val();
		var numero = $("#numero").val();
		var metodo = $("#criterio").val();	
		//console.log("X: "+ valorX +" Y: " + valorY +" N: " + numero + " C: " +metodo);
	}else if(algoritmo == 2){
		var valorX = $("#valorX2").val();
		var valorY = $("#valorY2").val();
		var numero = $("#numero2").val();
		var metodo = $("#criterio2").val();	
	//	console.log("X: "+ valorX +" Y: " + valorY +" N: " + numero + " C: " +metodo);
	}

		const divExportado = document.getElementById('exportado');
		const foto = document.getElementById('ugr');
		
		
		if(algoritmo==1){
			var canvas = document.getElementById('scatterChart');

		}else if(algoritmo == 2) {
			var canvas = document.getElementById('scatterChart2');
		}
		const grafico = canvas.toDataURL();
		
		const doc = new jspdf.jsPDF('landscape'); //Apasisado

		const fontSizeTitle = 15;//título
		const fontSizeCab = 15;//cabecera
		const fontSizeContent = 12; //Subapartados
		const fontSizeText= 11; //Texto normal
		const lineHeight = 7; // separación
		const margin = 15; // Márgenes izquierdo y derecho
		let y = 15; // Posición vertical inicial para el contenido


		doc.setFontSize(fontSizeCab);
		doc.setFont('times', 'bold');
		let cabecera = "TFG: Integración de reglas de asociación y Clustering";
		cabecera += "\nSandra Reinoso Ortega - Informática y Administración de Empresas"; // Utiliza "\n" para indicar un salto de línea
		const cabecera_lines = cabecera.split("\n");
		doc.text(cabecera_lines, margin, y);
		y += lineHeight+lineHeight;
		doc.setFontSize(fontSizeTitle);
		doc.setFont('helvetica', 'bold');
		
		doc.setFontSize(fontSizeContent);
		if(algoritmo==1){
			doc.text('Algoritmo jerárquico aplicado: Método '+metodo+ '++ ' +' --- Nº de Clusters: ' + numero ,margin,y);

		}else if(algoritmo == 2) {
			doc.text('Algoritmo KNN aplicado: Método '+metodo+' --- Nº de Clusters: ' + numero,margin,y);
		}
		y += lineHeight;
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(fontSizeText);
		doc.text("Parámetro aplicado en el eje X para el estudio: " + valorX, margin, y);
		y += lineHeight;
		doc.text("Parámetro aplicado en el eje Y para el estudio: " + valorY, margin, y);
		y += lineHeight;
		doc.addImage(foto, "JPEG", doc.internal.pageSize.getWidth() - 40, 8, 30, 30);
		doc.addImage(grafico, "JPEG",margin, y, 240, 70);
		y += 80;
  
		if(algoritmo==1){
			doc.text('Diagrama de dispersión obtenido al aplicar el algortimo de clustering jerárquico fijandonos en los parametros '+ valorX + ' y ' + valorY + ' del conjunto muestral.',margin,y);
			y += lineHeight;
			doc.text('Los '+numero + ' CLusters, se obtienen por el método de calculo de distancias ' + metodo,margin,y);
			y += lineHeight;
			doc.text('Como se puede apreciar en la gráfica, cada cluster esta diferenciado con un color determinado que nos permite apreciar como se',margin,y);
			y += lineHeight;
			doc.text('han formado los clúster a partir del conjunto de pares que le hemos proporcionado',margin,y);
			
		}else if(algoritmo == 2) {
			doc.text('Diagrama de dispersión obtenido al aplicar el algortimo de clustering KNN fijandonos en los parametros '+ valorX + ' y ' + valorY + ' del conjunto muestral.',margin,y);
			y += lineHeight;
			doc.text('Los '+numero + ' CLusters, se obtienen por el método de inicialización de centroides ' + metodo,margin,y);
			y += lineHeight;
			doc.text('Como se puede apreciar en la gráfica, cada cluster esta diferenciado con un color determinado que nos permite apreciar como se',margin,y);
			y += lineHeight;
			doc.text('han formado los clúster a partir del conjunto de pares que le hemos proporcionado',margin,y);
					}
		// Guardar el archivo PDF
		if(algoritmo==1){
			doc.save('Informe-Jerárquico.pdf');
		}else if(algoritmo == 2) {
			doc.save('Informe-Kmeans.pdf');		}
		
		divExportado.innerHTML = "";
		
}

//Clustering
function enviarClustering(button) {

	var algoritmo = $("#clustering").val();
		if(algoritmo == 1){
		var valorX = $("#valorX").val();
		var valorY = $("#valorY").val();
		var numero = $("#numero").val();
		var metodo = $("#criterio").val();	
		//console.log("X: "+ valorX +" Y: " + valorY +" N: " + numero + " C: " +metodo);
	}else if(algoritmo == 2){
		var valorX = $("#valorX2").val();
		var valorY = $("#valorY2").val();
		var numero = $("#numero2").val();
		var metodo = $("#criterio2").val();	
	//	console.log("X: "+ valorX +" Y: " + valorY +" N: " + numero + " C: " +metodo);
	}



	var parameters = "numero=" + numero + "&metodo=" + metodo+ "&algoritmo=" + algoritmo+ "&valorX=" + valorX+ "&valorY=" + valorY;
  
	$.ajax({
	  type: "POST",
	  url: "http://localhost:5000/Integración de Algoritmos de Reglas de Asociación y Clustering/",
	  data: parameters,
	  dataType: "json",
	  success: function (result) {
		if(algoritmo== 1){
			var elemento2 = document.getElementById('invisibleDispersion');
			elemento2.style.display = 'block'; 	
			var elemento = document.getElementById('export');
			elemento.style.display = 'block'; 		
			var titulo = document.getElementById('titulo');
			var scatterChartCanvas = $('#scatterChart').get(0).getContext('2d')
		}else if(algoritmo == 2){
			var elemento2 = document.getElementById('invisibleDispersion2');
			elemento2.style.display = 'block'; 	
			var elemento = document.getElementById('export2');
			elemento.style.display = 'block'; 		
			var titulo = document.getElementById('titulo2');
			var scatterChartCanvas = $('#scatterChart2').get(0).getContext('2d')
		}
		
		titulo.innerHTML = "Scatter Chart --- Método " +metodo; // Concatenar el nuevo contenido al contenido existente

		//-------------
		//- Scatter CHART -
		//-------------
		// Get context with jQuery - using jQuery's .get() method.
			

		x = 0;
		y = 1;
		var data2=[];
		var label2=[];
		for (var i = 0; i < numero; i++) {
			data2[i] = []; // Inicializar cada array data
			label2[i] = 'Cluster '+ i; // Inicializar cada array label
			for(var j = 0; j<result.length; j++){
				var obj = {
					x: 0,
					y: 0
				};
				if(result[j].Cluster == i){
					if(valorX == 'charges'){
						obj.x = result[j][valorX]/100000;
						obj.y = result[j][valorY];
					}else if(valorY== 'charges'){
						obj.x = result[j][valorX];
						obj.y = result[j][valorY]/100000;
					}else{
						obj.x = result[j][valorX];
						obj.y = result[j][valorY];
					}
					
					data2[i].push(obj);
				}
			}
			
		}

		var datasets = [];

		for (var i = 0; i < numero; i++) {
		var color =getRandomColor();
		var transparentColor = color + Math.floor(0.5 * 255).toString(16).padStart(2, '0');

		var dataset = {
			label: label2[i],
			data: data2[i],
			borderColor: color,
			backgroundColor: transparentColor
		};

		datasets.push(dataset);
		}
		var scatterData = {
			datasets: datasets
		};
		var scatterOptions = {
			maintainAspectRatio : false,
			responsive : true,
			scales: {
				x: {
					type: 'linear',
					position: 'bottom',
					
				},
			
			}
		}
	
		new Chart(scatterChartCanvas, {
			type: 'scatter',
			data: scatterData,
			options: scatterOptions
			})
		},
				error:function(jqXHR){			
		
				},
				complete:function(result){
				
				}
		

		});		
}


function enviarAsociacion(){
	console.log("hola");
	var algoritmo = $("#asociacion").val();
	if(algoritmo == 3){
		var valorX = 0;
		var valorY = 0;
		var numero = $("#numero3").val();
		var metodo = $("#criterio3").val();	
		console.log("X: "+ valorX +" Y: " + valorY +" N: " + numero + " C: " +metodo);
	}


	var parameters = "numero=" + numero + "&metodo=" + metodo+ "&algoritmo=" + algoritmo+ "&valorX=" + valorX+ "&valorY=" + valorY;

	$.ajax({
		type: "POST",
		url: "http://localhost:5000/Integración de Algoritmos de Reglas de Asociación y Clustering/",
		data: parameters,
		dataType: "json",
		success: function (result) {
			if(metodo="JustiPrecio"){
				metodo = "Medio";
			}
			document.getElementById("tablaAsociacion").style.display = "block";
			var html = '<table class="table table-hover text-nowrap">';
			html += '<thead><tr><th>Antecedente</th><th>Consecuente</th></tr></thead>';
			result.forEach(element => {
				 html += "<tr><td>"+element.slice(10,element.length-1)+"</td>";
				 html +="<td>{'Coste="+metodo+"'}</td></tr>";
			});

			html+="</table>";
			
			document.getElementById("reglas").innerHTML = html;

		},
		
		error:function(jqXHR){			
		
		},
		complete:function(result){
				
		}
		

		});		
	}

//Obtener color random
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function elegirClustering() {
    var selectElement = document.getElementById("clustering");
    var selectedValue = selectElement.value;
    
    
    if (selectedValue === "2") {
		document.getElementById("tarjetaEleccion").style.display = "none";
		document.getElementById("tarjetaKmers").style.display = "block";

    } else if (selectedValue === "1") {
		document.getElementById("tarjetaEleccion").style.display = "none";
		document.getElementById("tarjetaJerarquico").style.display = "block";
     
    }
}  
function elegirAsociacion() {
    var selectElement = document.getElementById("asociacion");
    var selectedValue = selectElement.value;
    
    
    if (selectedValue === "3") {
		document.getElementById("tarjetaEleccion").style.display = "none";
		document.getElementById("tarjetaApriori").style.display = "block";

    }
}  
function vuelta() {
   
    document.getElementById("tarjetaEleccion").style.display = "block";
	document.getElementById("tarjetaKmers").style.display = "none";
	document.getElementById("tarjetaJerarquico").style.display = "none";
	document.getElementById("tarjetaApriori").style.display = "none";

} 