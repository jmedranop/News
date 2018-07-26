<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Principal extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//$this->load->model('model_noticias');
		//$this->load->library('rssparser');

	}

	public function index()
	{
		

		
		$rss = "Hola";
		$data['datos'] = array(
			'title'=> 'Inicio',
			'init' => 'init.js',
			'todas' => $rss 
		);
		
		$this->load->view('head',$data);
		$this->load->view('menu');
		$this->load->view('index',$data);
		$this->load->view('modal');
		$this->load->view('modal_aviso');
		$this->load->view('footer',$data);
		


	}

	/*public function prueba()
	{
			$rss = $this->rssparser->set_feed_url("https://www.bbc.com/mundo/ultimas_noticias/index.xml#sa-link_location=story-body&intlink_from_url=http%3A%2F%2Fwww.bbc.com%2Fmundo%2Finstitucional%2F2011%2F03%2F000000_rss_gel&intlink_ts=1530574869913-sa")->set_cache_life(30)->getFeed(1);
			print_r($rss);
	}
	// Devuelve un json despues de haber leìdo el rss del sitio 
	public function searchNews()
	{
		$url = $this->input->post("url");
		$rss = $this->rssparser->set_feed_url($url)->set_cache_life(30)->getFeed(5);
		$data = array (
			"url" => $url,
			"sitio" =>$this->input->post("sitio"),
			"datos" => $rss
		);
		$resultado = $this->model_noticias->insert_rss($data);
		return  $resultado;
	}

//Busqueda en base de datos , devuelve un json con todos los sitios rss
	public function getSitiosRss()
	{
		$sitios = $this->model_noticias->getSitiosRss();
		echo json_encode($sitios);
	}

	//Guarda en base de datos las noticas obtenidas de la API de hackernews
	public function saveHN(){
		$fecha = date_create();
		date_timestamp_set($fecha, $this->input->post('fecha'));

		$data = array (
			"id" => $this->input->post('id'),
			"titulo" =>  $this->input->post('titulo'),
			"descripcion" => "Vacio",
			"fecha"=> date_format($fecha, 'Y-m-d H:i:s'),
			"url" => $this->input->post('url'),
			"img_head"=>"vacio" ,
			"sitio"=>30

		);

		$resultado = $this->model_noticias->insert_hk($data);
		return $resultado;
		
		
	}

//Obtiene las noticias HN o RSS
	public function getAll()
	{
		$type = $this->input->post("type");
		
		switch ($type) {
			case 'HN': $resultado = $this->model_noticias->getAll_HN();
			echo json_encode($resultado);
			break;
			case 'Rss': $resultado = $this->model_noticias->getAll_Rss();
			echo json_encode($resultado);
			break;
			case "all": 
			$hk = $this->model_noticias->getAll_HN();
			$rss = $this->model_noticias->getAll_Rss();
			$todos = array_merge($hk,$rss);
			echo json_encode($todos);
			break;
			default:
			# code...
			break;
		}
	}*/
}
