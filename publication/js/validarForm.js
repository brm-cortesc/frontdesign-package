$(document).ready(function(){

  $("#registro-pregunta").validate({

  	 // debug: true,

  	//Contenedor y clase donde se pinta el error
  	errorElement: "div",
  	errorClass: "mensaje-error",

  	//Campos para validar

 	rules: {
	       nickname: 			{required: true, accept: "[a-zA-Z]+" }, 
	       pregunta: 			{required: true, maxlength: 500,},
	       terminos:    	  	{required: true},  
		   privacidad:       	{required: true}
	       },

	//Mensajes en caso de dar error para cada input
	messages: {
		nickname: 			{required: "debes ingresar un nombre", accept: "Ingresa solo texto"},
		terminos:    	  	{required: "Debes aceptar los terminos y condiciones"}, 
		privacidad:  	  	{required: "Debes aceptar los terminos y condiciones"},
		pregunta: 			{required: "Comenta algo", maxlength: "solo puedes escribir máximo 500 caracteres"},

         },

         highlight: function(element, errorClass, validClass)
         {
         	if($(element)[0].id=="terminos"){
         	  $(element.form).find("label[for=" + element.id + "]").removeClass("pintaCheck");
         	};

         	if($(element)[0].id=="privacidad"){
         	  $(element.form).find("label[for=" + element.id + "]").removeClass("pintaCheck");
         	};
         },

         unhighlight: function(element, errorClass, validClass)
         {
         	if($(element)[0].id=="terminos"){
         	  $(element.form).find("label[for=" + element.id + "]").addClass("pintaCheck");
         	};

         	if($(element)[0].id=="privacidad"){
         	  $(element.form).find("label[for=" + element.id + "]").addClass("pintaCheck");
         	};
         },

      });

	//Muestra mensaje para pruebas

    $("#submit-pregunta").on("click", function () {
    	$("#modalMensaje").modal("show");
    });	

    
	
  });	