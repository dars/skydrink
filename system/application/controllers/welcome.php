<?php
class Welcome extends Controller {
	function __construct(){parent::Controller();}
	function index(){
		/* 產品 */
		$this->db->select("a.*,b.name as tname");
		$this->db->join("taxonomy as b","a.t_id=b.id","left");
		$this->db->order_by("b.weight","DESC");
		$this->db->order_by("a.weight","DESC");
		$this->db->order_by("a.id","ASC");
		$query = $this->db->get("products as a");
		$res['prod'] = $query->result();
		$tmp='';
		$index=0;
		$jprod = new stdClass();
		$jprod->data=array();
		foreach($res['prod'] as $p):
			if($p->t_id != $tmp){
				if($index != 0){
					array_push($jprod->data,$tmp2);
				}
				$jprod->index[$p->t_id]=$index;
				$tmp = $p->t_id;
				$index++;
				$tmp2=new stdClass();
				$tmp2->data=array();
				$i=0;
			}
			$tmp2->index[$p->id]=$i;
			$i++;
			array_push($tmp2->data,$p);
		endforeach;
		array_push($jprod->data,$tmp2);
		$res['jprod'] = json_encode($jprod);
		/* 分類 */
		$this->db->order_by('weight','DESC');
		$query = $this->db->get('taxonomy');
		$res['tax'] = $query->result();
		
		/* 加料 */
		$query = $this->db->get('material');
		$res['mat'] = $query->result();
		
		$query = $this->db->get('property');
		$free = $query->row();
		$res['free_limit']=$free->free;
				
		$this->load->view('welcome_message',$res);
	}
	function prod_list(){
		$this->db->select('id,name');
		$this->db->where('t_id',$this->input->post('_value'));
		$query = $this->db->get('products');
		$res = $query->result();
		echo json_encode($res);
	}
	function save(){
		$prod = $this->input->post('prod_id');
		$size = $this->input->post('size_id');
		$sugure = $this->input->post('sugure_id');
		$ice = $this->input->post('ice_id');
		$mate1 = $this->input->post('mate_id1');
		$mate2 = $this->input->post('mate_id2');
		$price = $this->input->post('price');
		$num = $this->input->post('num');
		/* order_m */
		$tmp = array();
		$tmp['name'] = $this->input->post('name');
		$tmp['tel'] = $this->input->post('tel');
		$tmp['address'] = $this->input->post('addr');
		$tmp['date'] = $this->input->post('date');
		$tmp['time'] = $this->input->post('time');
		$tmp['remark'] = $this->input->post('remark');
		$tmp['created'] = date('Y-m-d H:i:s');
		$this->db->insert('order_m',$tmp);
		$order_id = $this->db->insert_id();
		$cups = 0;
		$total = 0;
		$i=0;
		$count = count($prod);
		/* order_d */
		while($i<$count){
			$tmp=array();
			$tmp['order_id']=$order_id;
			$tmp['prod_id']=$prod[$i];
			$tmp['size_id']=$size[$i];
			$tmp['sugure_id']=$sugure[$i];
			$tmp['ice_id']=$ice[$i];
			$tmp['mate1_id']=$mate1[$i];
			$tmp['mate2_id']=$mate2[$i];
			$tmp['num']=$num[$i];
			$cups+=$num[$i];
			$tmp['price']=$price[$i];
			$tmp['total']=$num[$i]*$price[$i];
			$total+=$tmp['total'];
			$this->db->insert('order_d',$tmp);
			$i++;
		}
		$query = $this->db->get('property');
		$free = $query->row();
		
		if($cups>=$free->free){
			$free=floor($cups/$free->free);
			$price = floor($total/$cups);
			$total = $total - ($free*$price);
		}
		$this->db->set('total',$total);
		$this->db->where('id',$order_id);
		$this->db->update('order_m');
		$this->session->set_flashdata('notify',msg_block('訊息','訂購已完成','info'));
		header('Location:'.site_url());
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */