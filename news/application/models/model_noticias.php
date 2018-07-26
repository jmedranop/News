<?php


class Model_noticias extends CI_Model
{

	/*Obtiene todas las nociticas*/
	public function getAll ()
	{
		$query = $this->db->get('noticias');
		return $query->result();
	}


	/*Guarda las noticias de hacker news y si ya estan en base, las actualiza*/
	public function insert_hk($data)
	{
		
		$this->db->where('url',$data['url']);
		$q = $this->db->get('noticias');

		if ( $q->num_rows() > 0 ) 
		{
			$this->db->where('url',$data['url']);
			$this->db->update('noticias',$data);
		} else {
			//$this->db->set('id', $data['id']);
			$this->db->insert('noticias',$data);
		}
		return $this->db->insert_id();
	}

	public function insert_rss($data)

	{
		$dia = date("d",strtotime($data['datos'][0]['fecha']));
		$mes = date("m",strtotime($data['datos'][0]['fecha']));
		$anio = date("Y",strtotime($data['datos'][0]['fecha']));
		$hora = date("G",strtotime($data['datos'][0]['fecha']));
		$minuto = date("i",strtotime($data['datos'][0]['fecha']));
		$segundo = date("s",strtotime($data['datos'][0]['fecha']));
		if(empty($data['datos'][0]['img_head'])) $img = "vacio";
		else $img = $data['datos'][0]['img_head'];
		$insertDatos = array(
			"titulo"=>$data['datos'][0]['titulo'],
			"descripcion"=>$data['datos'][0]['descripcion'],
			"fecha"=>$anio."/".$mes."/".$dia." ".$hora.":".$minuto.":".$segundo,
			"url"=>$data['datos'][0]['url'],
			"autor"=>$data['datos'][0]['autor'],
			"categoria"=>$data['datos'][0]['categoria'],
			"titulo_head"=>$data['datos'][0]['titulo_head'],
			"descripcion_head"=>$data['datos'][0]['descripcion_head'],
			"img_head"=>$img ,
			"sitio"=>$data['sitio']
		);
		$this->db->where('url',$data['datos'][0]['url']);
		$q = $this->db->get('noticias');
		if ( $q->num_rows() > 0 ) 
		{
			$this->db->where('url',$data['datos'][0]['url']);
			$this->db->update('noticias',$insertDatos);
		} else {
			//$this->db->set('id', $data['id']);
			$this->db->insert('noticias',$insertDatos);
		}
		
		
	 return $this->db->insert_id();
		
	}

	/*Obtener noticias de hackernews en orden descendente*/
	public function getAll_HN()
	{
		$this->db->where('sitio',30)->order_by("fecha","DESC");
		$query = $this->db->get('noticias');
		return $query->result_array();
	}

	public function getAll_RSS()
	{
		$this->db->where('sitio !=',30)->order_by("fecha","DESC");
		$query = $this->db->get('noticias');
		return $query->result_array();
	}
	public function getSitiosRss()
	
	{
		$query = $this->db->get('feeds');
		return $query->result_array();
	}

}

?>