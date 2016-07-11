//Widget de FB
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=694888090567711";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//Widget de Twitter
window.twttr = (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],
		t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);
 
	t._e = [];
	t.ready = function(f) {
		t._e.push(f);
	};
 
	return t;
}(document, "script", "twitter-wjs"));

$("#carrusel-marcas").carousel({
	interval: false

});

//Función para check de selección de preferencias en el registro
$(document).on("click", ".boton-brand", function () {
		//Variable que almacena la opción que fue clickeada
		var idCheck = $(this).attr('data-box');
		//Dejar "chulo" activo sobre el elemento
		$(this).addClass("active");
		console.log(idCheck);
		//Check en la preferencia
		$('#'+idCheck).prop('checked', true);
		//Quitar clases para deseleccionar checkbox
		if($(this).hasClass('active-equis')){
		$(this).removeClass("active");
		$(this).removeClass("active-equis");
		//Quitar seleccion de checkbox
		$('#'+idCheck).prop('checked', false);
		console.log(idCheck+" adios check");
		}


});
//Funcion que muestra X para quitar selección
$(document).on("mouseover", ".boton-brand", function () {
		if($(this).hasClass('active')){
			$(this).addClass("active-equis");
		}

});
//Funcion que quita X para quitar selección
$(document).on("mouseout", ".boton-brand", function () {
		if($(this).hasClass('active-equis')){
			$(this).addClass("active");
			$(this).removeClass("active-equis");

		}

});

//Funcion para volver arriba
$(document).on("click", "#btn-up", function () {
		
		$(window).scrollTop(0);
		$(".up").removeClass('animated fadeInUp');


});



//Funciones y animaciones del sitio web
$(document).on("ready", function () {
	//Sticky menu
	 $("#menu").affix({
							offset: { 
									top: 100 
						}
					});

				//Animacion de entrada para fijar menu

				$("#menu").on('affixed.bs.affix', function () {
						
						$(this).addClass('animated fadeInDown');


				});

				//removemos animacion 
				$("#menu").on("affixed-top.bs.affix", function () {
						$(this).removeClass('animated fadeInDown');
				});

			//slide de login
			// Abrimos el panel de login
			$(".btn-login").on("click", function () {

				$(".login").addClass('animated slideInDown').slideDown();
				// $(".login").slideDown();
				
			});

			//Cerramos el panel de login

			$(".cerrar-login").on("click", function () {
				 $(".login").removeClass('animated slideInDown').slideUp();
			});

		//Fuciones de scroll
		$(window).scroll(function() {

		//Ocultamos boton volver arriba
		 if (  $(window).scrollTop() >= 980 ) {

		 	$(".up").removeClass('animated fadeInUp');
		 }


		//Mostramos boton volver arriba
		 if ( $(window).scrollTop() > 1500 && !$(".up").hasClass('animated')  ) {

		 		$(".up").addClass('animated fadeInUp');		


		 }

		});

});


