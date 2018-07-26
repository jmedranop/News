	//base_url="http://localhost/news/";
	var yek="83bff4ded3954c35862369983b88c41b";
	$(document).ready(function()
	{

		paginaInicio();
		
		$(".categoria").on('click',function(){
			categoria = $(this).data('category');
			buscarNoticias(categoria);
		});
		

		$('#alerta').on('hide.bs.modal', function (e) {
			location.reload();
		})

	});

	function paginaInicio()
	{
		$.getJSON("https://newsapi.org/v2/sources?language=es&apiKey="+yek,function(resultado){

			for (var i = 0; i < resultado.sources.length; i++) {
					//console.log(resultado.sources[i]);
					$.getJSON("https://newsapi.org/v2/top-headlines?sources="+resultado.sources[i].id+"&apiKey="+yek,function(resultado_uno){
						//console.log(resultado_uno);
						for (var i = 0; i < resultado_uno.totalResults; i++) {

							$('img').on('error', function (e) {
								$(this).attr('src', '../libs/img/vacio.png');
							});


						/*$(".panel_news").append('<div class="row"><div class="card cardContent col-md-6">'+
							'<img class="card-img-top" src="'+resultado_uno.articles[i].urlToImage+'" alt="Card image cap" style="max-width:100%;">'+
							'<div class="card-body ">'+
							'<h5 class="card-title text-justify">'+resultado_uno.articles[i].title+'</h5>'+
							'<a href="'+resultado_uno.articles[i].url+'" class="btn btn-primary">Visitar</a>'+
							'</div>'+'</div></div><br>');*/

							/*$(".panel_news").append('<div class="col-md-12">'+
								'<div class="panel-group">'+
								'<div class="panel panel-primary">'+
								'<div class="panel-heading">'+resultado_uno.articles[i].title+'</div>'+
								'<div class="panel-body">'+
								'<div class="row">'
								+'<div class="col-md-12"><br><center>'
								+'<img src="'+resultado_uno.articles[i].urlToImage+'" class="img-responsive" style="width:30%;">'
								+'</center><br></div>'
								+'</div>'
								+'<div class="row">'
								+'<div class="col-md-12">'
								+'<p class="text-justify">'+resultado_uno.articles[i].description+'</p>'
								+'</div>'
								+'</div>'
								+'<div class="row">'
								+'<div class="col-md-12">'
								+'<p class="text-justify leer_mas"><a href="'+resultado_uno.articles[i].url+'">Leer más</a></p>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>'
								+'</div>');*/

								$(".panel_news").append(''
									+'<div class="col-sm-6 col-md-6">'
									+'<div class="thumbnail">'
									+'<center><img src="'+resultado_uno.articles[i].urlToImage+'" style="width:50%; height:50%;" class="img-responsive"></center>'
									+' <div class="caption">'
									+'<h4 class="text-justify">'+resultado_uno.articles[i].title+'</h4>'
									+'<p class="text-justify">'+resultado_uno.articles[i].description+'</p>'
									+'<p><a href="'+resultado_uno.articles[i].url+'" class="btn btn-default leer_mas" role="button">Leer más</a></p>'
									+'</div>'
									+'</div>'
									+'</div>'
									+'');



							}
						});
				}
			});

	}




	function buscarNoticias(categoria)
	{
		$.getJSON( "https://newsapi.org/v2/top-headlines?country=mx&apiKey="+yek+"&category="+categoria, function( data ) {
			console.log(data);
			if(data.articles.length==0) 
			{
				$("#modal_aviso").modal();
				$("#modal_aviso .text_modal_aviso").empty().append("No hay noticias en está categoría");
			}
			else
			{
				$(".panel_news").empty();
				for(i=0;i<data.articles.length;i++)
				{


					$('img').on('error', function (e) {
						$(this).attr('src', '../libs/img/vacio.png');
					});
					$(".panel_news").append(''
						+'<div class="col-sm-6 col-md-6">'
						+'<div class="thumbnail">'
						+'<center><img src="'+data.articles[i].urlToImage+'" style="width:50%; height:50%;" class="img-responsive"></center>'
						+' <div class="caption">'
						+'<h4 class="text-justify">'+data.articles[i].title+'</h4>'
						+'<p class="text-justify">'+data.articles[i].description+'</p>'
						+'<p><a href="'+data.articles[i].url+'" class="btn btn-default leer_mas" role="button">Leer más</a></p>'
						+'</div>'
						+'</div>'
						+'</div>'
						+'');	


				}

			}
			


		});
	}



















