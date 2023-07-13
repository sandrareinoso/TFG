
function init(){
/*******************************************/ 
	process=false;
	$state=$("#state");
	recorre=recorrer();
	previousDate='';
}

//FUNCIONES ENCRIPTADO
function recorrer(){
	return 'ANT'+(20011969*3)+'REI';
}
//****************************************/
function encriptalo(string){
	var temp=CryptoJS.AES.encrypt(JSON.stringify(string), recorre, {format: CryptoJSAesJson}).toString();
	//var posIV=(temp.length-temp.indexOf('","iv":"'));//65, 48 despues de limpiar  //tamaño 32
	//var posS=(temp.length-temp.indexOf('","s":"'));//25, 16 después de limpiar //tamaño 16
	var temp2=temp.substr(7,temp.length-9).replace('","iv":"','').replace('","s":"','');
	return temp2;
}
//***********************************
function desencriptalo(string){
	var temp2='{"ct":"'+string.substr(0, string.length-48)+'","iv":"'+string.substr(string.length - 48, 32)+'","s":"'+string.substr(string.length - 16, 16)+'"}';
	var temp=JSON.parse(CryptoJS.AES.decrypt(temp2,recorre, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
;
	return temp;	
}

//*********************
function openSession(){
	if(!process){
		process=true;
		$state.css("display","block");
		var  $form=$("#formSession");
		var parameters="opt=openSession"+paramElement($form);
		$.ajax({
			type: "GET",
			url: "ajax/resultajax.php",
			data: "paramEncrypt="+encriptalo(parameters),
			success: function(result){
			//	if(result==-1) alert(1);
				switch(result){
					case "-1":
						alert("Usted no tiene permisos para utilizar esta aplicaci\xf3n"); 
						break;
						
					case "0":
						alert("Nombre de usuario o clave incorrecta");	
						break;
						
					case "1":
					default:
						$("#content").html(result);
						break;
						
				//	default:
				//		alert("Error: "+result);
				}
			},
			error:function(jqXHR){			
				if(jqXHR.status=="401"){
					alert("Su sesión ha caducado");
					javascript:location.reload();
				}
				else{
					alert("Error ("+qXHR.status+"): " + jqXHR.responseText);
					$("#error").html("Error: " + jqXHR.responseText);
				}
			},
			complete:function(result){
				process=false;
				$state.css("display","none");
			}
	   });		
	}
}
//*********************
function closeSession(){
	if(!process){
		process=true;
		$state.css("display","block");
		var  $form=$("#formSession");
		$.ajax({
			type: "GET",
			url: "ajax/resultajax.php",
			data: "paramEncrypt="+encriptalo("opt=closeSession"),
			success: function(result){
				$("#content").html(result);
			},
			error:function(jqXHR){			
				if(jqXHR.status=="401"){
					alert("Su sesión ha caducado");
					javascript:location.reload();
				}
				else{
					alert("Error ("+qXHR.status+"): " + jqXHR.responseText);
					$("#error").html("Error: " + jqXHR.responseText);
				}
			},
			complete:function(result){
				process=false;
				$state.css("display","none");
			}
	   });		
	}
}

//**************************************************************
function optionMenu(option){
if(!process){
	process=true;
	$state.css("display","block");
	var cardEdit=$("#cardEdit").val()
	seguir=true
	if(cardEdit==1)
		if(!confirm("¿Está seguro de salir sin guardar?"))
			seguir=false
	if(seguir){
		$("#master").html("");
		$.ajax({	
			type: "GET",
			url: "ajax/resultajax.php",	
			data: "paramEncrypt="+encriptalo("opt="+option),
			//dataType:"json",
			success: function(result){
				//alert(result);
				$("#master").html(result);
				functionsTypeEdit($("#master"));	
			},
			error:function(jqXHR){		
				if(jqXHR.status=="401"){
					alert("La Sesión ha caducado");
					javascript:location.reload();
				}
				else{
					alert("Error: " + jqXHR.responseText);
					$("#error").html("Error: " + jqXHR.responseText);
				}
			},
			complete:function(result){	
				process=false;
				$state.css("display","none");
			}
		});
	}
	else{	
		process=false;
		$state.css("display","none");
	}
	
}	
}
//*********************************
function functionsTypeEdit($form){
	//alert($form);
	$form.find('textarea').each(function() {
	//  alert(this.id);
      	UpLine(this);
	});	
	
	$form.find(".datepicker").datepicker();
	$form.find(".timepicker").timepicker({ 'timeFormat': 'H:i' });
	$form.find(".sortable").sortable();
	$form.find(".selectable").selectable();
	$form.find(".sortableSelectable" ).sortable({ handle: ".br-icon" });
	
	$form.find(".datepicker").focus(function(){   
	  previousDate= $(this).val(); ;
	});
	$form.find(".datepicker").blur(function(){   
		 var newDate = $(this).val();   
		 if(newDate){
			if (!moment(newDate, 'DD/MM/YYYY', true).isValid()){         
				$(this).val(previousDate);      
				console.log("Error");
			}  
		 }
	});
//	$form.find(".multiSelect").multiselect();
	//$("#cpdateTrasplanting").datepicker();
}
//*********************************/
function formFull($form){
	var full=true;
	$form.find(".required").each(function(index, input) {
		var $input=$(input);	//alert($input.attr("name"));
		if($input.val()){
			if($input.val().length<=0 ||( $input.is("select") && ($input.val()=="0" || $input.val()=="0,0"))){
				$input.addClass("incomplete");
				full=false;
			}
			else{
				$input.removeClass("incomplete");
			}
		}
		else{
			$input.addClass("incomplete");
			full=false;
		}
		
    });	
	return full;
	
}
//*********************************/
function formOk($form){
	var allOk=true;
	//comprobamos los emails
	$form.find(".email").each(function(index, input) {
		var email=$(input).val();
		if(email.length){
			if(!validateEmail(email)){
				$(input).addClass("incomplete");
				allOk=false;
				alert("Este email parece no ser correcto");
				return false;
				}
		}
    });
	
	
	return allOk;
	
}
	
//*********************
function dataDmsas(){
if(!process){
	process=true;
	$state.css("display","block");
	var userDmsas=$("input[name='eduserDmsas']").val();	
	if(userDmsas!=""){
		var parameters="opt=userDmsas|userDmsas="+userDmsas
		$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		dataType:"json",
		success: function(result){
			if (result["error"]==1){		
				$("input[name='edfirstName']").val(result["nombre"]);
				$("input[name='edlastName']").val(result["apellidos"]);
				$("input[name='edemail']").val(result["correo"]);
			}
			else{
				alert('usuario no encontrado');
			}		
		},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
	}
	else{
		process=false;
		$state.css("display","none");
		alert("Introduzca el usuario de DMSAS");
	}
}
}




//*************************************************
//*********************************

function radioClick(){
 this.blur();  
 this.focus();  
}
//*********************************
function saltaLinea(textArea){
	var salts=textArea.value.split("\n").length-1;  
	if(salts>=3){
		textArea.rows=salts+1;
	}
	/*if(salts<2){
		textArea.rows=2;
	} */        
} 
//*********************************
function enCode(string)
{//alert(cadena);
	string=string.replace(/([+])/g,"/mas/");
	string=string.replace(/([#])/g,"/almohadilla/");
	string=string.replace(/(["])/g,"/doblescomillas/");
	string=string.replace(/(['])/g,"/comillas/");
	string=string.replace(/([&])/g,"/ampersan/");
	string=string.replace(/([€])/g,"/euro/");
	string=string.replace(/([%])/g,"/porCiento/");
	string=string.replace(/([´])/g,"/apostrofe/");
	return string;
}

//**********************************************************/
function paramElement($elementForm){
	var elements=$elementForm.find("select, input, textarea" );
	var l = elements.length;
 	var limit= "|";
	var temp = "";
	//alert(cadenaFormulario);
	for (var i=0; i <= l-1;i++){//	alert(Formulario.elements[i].type);
		var element=elements[i];
	//	alert(elemento.value);
		if(element.type=="textarea" ){		
			var valueTemp=element.value.replace(/\n/g,"<br>");
			temp += limit+element.name+'='+(valueTemp.replace(limit,"/sepCampos/"));
		}
		if(element.type=="text" ||element.type=="password" || element.type=="hidden" || element.type=="mail" || element.type=="select-one" || element.type=="file"|| element.type=="color"  )
			temp += limit+element.name+"="+(element.value.replace(limit,"/sepCampos/"));
			
		if(element.type=="select-multiple"){
			var arrayString=$(element).val();
			if(arrayString){
				var arrayInt=new Array();
				arrayString.forEach( function(value,index){
					arrayString[index]=parseInt(value)});
				temp += limit+element.name+"="+JSON.stringify(arrayString);
			}
			else
				temp += limit+element.name+"=0";
		}
		
		if(element.type=="checkbox")
			temp += limit+element.name+"="+(element.checked);
		 if(element.type=="radio"){
			if($('input[name='+element.name+']:checked').length){
				 if (element.checked)
					temp += limit+element.name+'='+(element.value);
			}
			else
				temp += limit+element.name+'=0';
				
		 }
			
	}
//	alert(parametroOpcion+","+actualizarCabecera+","+cadenaFormulario+","+div);
	
//	temp=enCode(temp);
	return temp;
}

/*******************************************/ 
function validateEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (expr.test(email));      
}

/*******************************************/ 
function preventEvent(e) {
        var ev = e || window.event;
        if (ev.preventDefault) ev.preventDefault();
        else ev.returnValue = false;
        if (ev.stopPropagation)
                ev.stopPropagation();
        return false;
}

/*******************************************/
function cancelEvent(e) {
    var ev = e || window.event;
    if (ev.preventDefault) {
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
}
//****************************************/
function sendClick(e,button) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $("#"+button).click();
        return false;
    } else {
        return true;
    }
}
//****************************************/
function cambiarAcentos(str){
var a = array('á'   , 'é'   , 'í'   , 'ó'   , 'ú'   , 'ñ'   , 'Á'  ,'É'   ,'Í'   ,'Ó'   ,'Ú'   ,'Ñ');
var b = array('\xe1', '\xe9', '\xed', '\xf3', '\xfa', '\xf1','\xc1','\xc9','\xcd','\xd3','\xda','\xd1');
return str_replace(a, b, str);
}

//*****************************
function validInt(e) {//Solo acepta caracteres numéricos  	
    tecla = (document.all) ? e.keyCode : e.which; 

    if (tecla==8) return true; 
    patron =/[0-9\s]/; 
    te = String.fromCharCode(tecla); 
    return patron.test(te); 
}
//*****************************
function validDec(e) 
//Solo acepta caracteres numéricos 
{ 

    tecla = (document.all) ? e.keyCode : e.which; 
    if (tecla==8) return true;
	//patron= /^[0-9]+(\.)?[\d{1,2}]$/;
	patron= /^([0-9])*[,]?[0-9]*$/ 
    te = String.fromCharCode(tecla); 
    return patron.test(te); 
}
//*****************************
function IsNumeric(valor) { 
	var log=valor.length; 
	var sw="S"; 
	for (x=0; x<log; x++) {
		 v1=valor.substr(x,1); 
		v2 = parseInt(v1); 
		//Compruebo si es un valor numérico 
		if (isNaN(v2)) { 
			sw= "N";
			} 
		} 
		if (sw=="S") {
			return true;
			} 
		else {
			return false; 
			} 
	} 
	var primerslap=false; 
	var segundoslap=false;

//*********************
function isDate(campo) {
      var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
      if ((campo.match(RegExPattern)) && (campo!='')) {
            return true;
      } else {
            return false;
      }
}
//*********************
function datePost(dateI,dateF){
		valuesStart=dateI.split("/");
		valuesEnd=dateF.split("/");
	// Verificamos que la fecha no sea posterior a la actual
		var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
		var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
		if(dateStart>=dateEnd)
		{
			return false;
		}
		return true;
	}

//*******************************
function ucfirst(str) {
  str += '';
  var f = str.charAt(0)
    .toUpperCase();
  return f + str.substr(1);
}
// JavaScript Document
//*********************************/
function insertBook(button){
if(!process){
	process=true;
	$state.css("display","block");
//	returnBrowse=savemaster();
	var parameters = "opt=card|cardId=book|operation=new";
	$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		success: function(result){
			$("#master").html(result);
			functionsTypeEdit($("#master"));
		},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
	
}
}
//******************************
function editBook(button){
if(!process){
	process=true;
	$state.css("display","block");
//	returnBrowse=savemaster();
	var $row=$(button).closest("tr");
	var id = $row.attr("id");
	id=id.substr(2,id.length-2);
	var parameters = "opt=card|cardId=book|operation=edit|id="+id;
	//alert(parameters);
	$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		success: function(result){
					$("#master").html(result);
					functionsTypeEdit($("#master"));
				},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
}
}

//*********************************/
function viewBook(button){
if(!process){
	process=true;
	$state.css("display","block");
//	returnBrowse=savemaster();
	var $row=$(button).closest("tr");
	var id = $row.attr("id");
	id=id.substr(2,id.length-2);
	var parameters = "opt=card|cardId=book|operation=view|id="+id;
	
	$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		success: function(result){
				//	alert(datos);
					$("#master").html(result);
					functionsTypeEdit($("#master"));
					
					createTabs(id,"book");
				//	alert("datepicker");
				//	$("#waiting").css("display","none");	
				//	procesando=false;		
				},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
}
}


//******************************
function editBookE(button){
if(!process){
	process=true;
	$state.css("display","block");
	returnBrowse=savemaster();
	var $row=$(button).closest("tr");
	var id = $row.attr("id");
	id=id.substr(2,id.length-2);
	var parameters = "opt=card|cardId=book|operation=edit|id="+id;
	//alert(parameters);
	$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		success: function(result){
					$("#master").html(result+'<span id="especial"></span>');
					functionsTypeEdit($("#master"));
				},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
}
}

//*********************************/
function viewBookE(button){
if(!process){
	process=true;
	$state.css("display","block");
	returnBrowse=savemaster();
	var $row=$(button).closest("tr");
	var id = $row.attr("id");
	id=id.substr(2,id.length-2);
	var parameters = "opt=card|cardId=book|operation=view|id="+id;
	
	$.ajax({	
		type: "GET",
		url: "ajax/resultajax.php",
		data: "paramEncrypt="+encriptalo(parameters),
		success: function(result){
				//	alert(datos);
					$("#master").html(result+'<span id="especial"></span>');
					functionsTypeEdit($("#master"));
					
					createTabs(id,"book");
				//	alert("datepicker");
				//	$("#waiting").css("display","none");	
				//	procesando=false;		
				},
		error:function(jqXHR){		
			if(jqXHR.status=="401"){
				alert("La Sesión ha caducado");
				javascript:location.reload();
			}
			else{
				alert("Error: " + jqXHR.responseText);
				$("#error").html("Error: " + jqXHR.responseText);
			}
		},
		complete:function(result){	
			process=false;
			$state.css("display","none");
		}
	});
}
}

