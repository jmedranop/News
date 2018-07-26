	base_url="http://localhost/news/";
	$(document).ready(function()
	{

		
		//cargarNoticiasHN();
		//cargarNoticiasRss();
		
		/*$(".actualizarBase").on('click',function()
		{
			who = $(this).data('id');
			if(who=="hn") buscarNoticiasDelDiaHN();
			if(who=="rss") buscarNoticiasDelDiaRss();
		})*/
		

		

$('#alerta').on('hide.bs.modal', function (e) {
  location.reload();
})

});

	

		//consulta el api de HN y almacena las noticias en la base de datos
		function buscarNoticiasDelDiaHN()
		{



			$.getJSON( "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty", function( data ) {
				var items = [];
				var otro = data;

				$.each( data, function( key, val ) {
					$("#alerta").modal('show');
					$.getJSON("https://hacker-news.firebaseio.com/v0/item/"+val+".json?print=pretty",function(data)
					{
						
						if(data!=null)
						{
							$.post(base_url+"principal/saveHN",{id:data.id,titulo:data.title,fecha:data.time,url:data.url}).done(function(d){		
							})	
							items.push(data.id);
						}


						if(items.length==otro.length)
						{
							
							topstories();
						}
						
					});

				});


			});


		}  
		/// Fin de noticias HN
		//Buscar Hackernews por top stories
		function topstories() {

			$.getJSON( "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", function( data ) {
				var items1 = [];
				var otro1 = data;

				$.each( data, function(key,val) {
					
					$.getJSON("https://hacker-news.firebaseio.com/v0/item/"+val+".json?print=pretty",function(data)
					{
						
						if(data!=null)
						{
							$.post(base_url+"principal/saveHN",{id:data.id,titulo:data.title,fecha:data.time,url:data.url}).done(function(d){	
								
							})	
							items1.push(data.id);
						}
						

						if(items1.length==otro1.length)
							$("#alerta").modal('hide');

					});

				});

			});
			

		}

		//Cargar noticias de nuestra base de datos
		function cargarNoticiasHN()
		{
			$.post(base_url+"principal/getAll",{type:"HN"}).done(function(datos){
				todos = jQuery.parseJSON(datos);

				for(i=0;i<todos.length;i++)
				{
					url = todos[i].url;
					if(url!=null)
						boton = '<a href="'+url+'" class="btn btn-primary">Visitar</a>';
					else
						boton = '';

					$(".top").append('<div class="card cardContent" style="width: 18rem;">'+
						'<img class="card-img-top" src="'+base_url+'/libs/img/vacio.png" alt="Card image cap">'+
						'<div class="card-body">'+
						'<h5 class="card-title text-justify">'+todos[i].titulo+'</h5>'+
						'<p class="card-text">'+todos[i].fecha+'</p>'+boton+
						'</div>'+'</div><br>');

				}
			});
		}

		//Cargar noticias de nuestra base de datos
		function cargarNoticiasRss()
		{
			$.post(base_url+"principal/getAll",{type:"Rss"}).done(function(datos){
				todos = jQuery.parseJSON(datos);
				var img = ''; 
				for(i=0;i<todos.length;i++)
				{

					if(todos[i].img_head != null && todos[i].img_head != "vacio") img = '<img class="card-img-top img-responsive" src="'+todos[i].img_head+'" alt="Card image cap">';
					else img = '<img class="card-img-top" src="'+base_url+'/libs/img/vacio.png" alt="Card image cap">';
					$(".rss").append('<div class="card cardContent" style="width: 18rem;">'+
						''+img+
						'<div class="card-body">'+
						'<h5 class="card-title text-justify">'+todos[i].titulo+'</h5>'+
						'<p class="card-text">'+todos[i].fecha+'</p>'+
						'<a href="'+todos[i].url+'" class="btn btn-primary">Visitar</a>'+
						'</div>'+'</div><br>');

				}
			});
		}


		function buscarNoticiasDelDiaRss ()
		{
			
			$.post(base_url+"principal/getSitiosRss").done(function(datos){
				sitios = jQuery.parseJSON(datos);
				var items1 = [];
				$("#alerta").modal("show");
				//sitios.length
				for(i=0;i<sitios.length;i++)
				{
					$.post(base_url+"principal/searchNews",{url:sitios[i].url,sitio:sitios[i].sitio}).done(function(d){

					});
				items1.push(sitios[i].url);

				if(sitios.length==items1.length)
					console.log(sitios.length+"<------->"+items1.length);
					//$("#alerta").modal('hide');
			
				}
			});
		}

















