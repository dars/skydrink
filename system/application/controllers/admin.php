<?php
class Admin extends Controller{
	function __construct(){parent::Controller();}
	function index(){
		$pdata=array();
		$this->load->view('admin',$pdata);
	}
	function orders(){
		$this->db->order_by('id','DESC');
		$this->db->limit($this->input->post('limit'),$this->input->post('start'));
		$query = $this->db->get('order_m');
		$res = new stdClass();
		$res->totalProperty=$this->db->count_all_results('order_m');
		$res->root = $query->result();
		echo json_encode($res);
	}
	function order_d(){
		$this->db->select('a.*,b.name as pname,c.name as sname,d.name as iname,e.name as mname1,f.name as mname2');
		$this->db->join('products as b','a.prod_id = b.id','left');
		$this->db->join('sugure as c','a.sugure_id = c.id','left');
		$this->db->join('ice as d','a.ice_id = d.id','left');
		$this->db->join('material as e','a.mate1_id = e.id','left');
		$this->db->join('material as f','a.mate2_id = f.id','left');
		$this->db->order_by('a.id','ASC');
		$this->db->where('a.order_id',$this->input->post('order_id'));
		$query = $this->db->get('order_d as a');
		$res = new stdClass();
		$res->root = $query->result();
		echo json_encode($res);
	}
	function products(){
		$this->db->select('a.*,b.name as tname');
		$this->db->join('taxonomy as b','a.t_id = b.id','left');
		$this->db->order_by('a.id','ASC');
		$this->db->limit($this->input->post('limit'),$this->input->post('start'));
		$query = $this->db->get('products as a');
		$res = new stdClass();
		$res->root = $query->result();
		$i = 0;
		$count = count($res->root);
		while($i<$count){
			$tmpi = explode(',',$res->root[$i]->ice);
			$j=0;
			$jcount = count($tmpi);
			while($j<$jcount){
				if($tmpi[$j] == 1){$res->root[$i]->ice1='on';}
				if($tmpi[$j] == 2){$res->root[$i]->ice2='on';}
				if($tmpi[$j] == 3){$res->root[$i]->ice3='on';}
				if($tmpi[$j] == 4){$res->root[$i]->ice4='on';}
				if($tmpi[$j] == 5){$res->root[$i]->ice5='on';}
				if($tmpi[$j] == 6){$res->root[$i]->ice6='on';}
				$j++;
			}
			$tmpi = explode(',',$res->root[$i]->sugure);
			$j=0;
			$jcount = count($tmpi);
			while($j<$jcount){
				if($tmpi[$j] == 1){$res->root[$i]->sugure1='on';}
				if($tmpi[$j] == 2){$res->root[$i]->sugure2='on';}
				if($tmpi[$j] == 3){$res->root[$i]->sugure3='on';}
				if($tmpi[$j] == 4){$res->root[$i]->sugure4='on';}
				if($tmpi[$j] == 5){$res->root[$i]->sugure5='on';}
				if($tmpi[$j] == 6){$res->root[$i]->sugure6='on';}
				$j++;
			}
			$i++;
		}
		$res->totalProperty = $this->db->count_all_results('products');
		echo json_encode($res);
	}
	function cate_list(){
		$this->db->order_by('id','ASC');
		$query = $this->db->get('taxonomy');
		$res = new stdClass();
		$res->root = $query->result();
		echo json_encode($res);
	}
	function prod_save(){
		$config['upload_path'] = 'public/files/images/';
		$config['allowed_types'] = 'gif|jpg|jpeg|png|bmp';
		$config['overwrite'] = false;
		$config['encrypt_name'] = true;
		$this->load->library('upload',$config);
		$this->upload->initialize($config);
		$img_name = "";
		if($this->upload->do_upload('img')){
			$data=$this->upload->data();
			$config = array();
			$config['image_library'] = 'gd2';
			$config['source_image']	= $data['full_path'];
			$config['create_thumb'] = FALSE;
			$config['maintain_ratio'] = TRUE;
			$config['width'] = 300;
			$config['height'] = 300;
			$this->load->library('image_lib',$config); 
			$this->image_lib->initialize($config);
			$this->image_lib->resize();
			$img_name = $data['file_name'];
		}
		
		$tmp = array();
		$tmp['img'] = $img_name;
		$tmp['t_id'] = $this->input->post('t_id');
		$tmp['name'] = $this->input->post('name');
		$tmp['m_price'] = $this->input->post('m_price');
		$tmp['l_price'] = $this->input->post('l_price');
		
		$tmp_s = array();
		if($this->input->post('sugure1') == 'on'){
			array_push($tmp_s,1);
		}
		if($this->input->post('sugure2') == 'on'){
			array_push($tmp_s,2);
		}
		if($this->input->post('sugure3') == 'on'){
			array_push($tmp_s,3);
		}
		if($this->input->post('sugure4') == 'on'){
			array_push($tmp_s,4);
		}
		if($this->input->post('sugure5') == 'on'){
			array_push($tmp_s,5);
		}
		$tmp['sugure'] = join($tmp_s,',');
		if($this->input->post('sugure6') == 'on'){
			$tmp['sugure'] = 6;
		}
		$tmp_i = array();
		if($this->input->post('ice1') == 'on'){
			array_push($tmp_i,1);
		}
		if($this->input->post('ice2') == 'on'){
			array_push($tmp_i,2);
		}
		if($this->input->post('ice3') == 'on'){
			array_push($tmp_i,3);
		}
		if($this->input->post('ice4') == 'on'){
			array_push($tmp_i,4);
		}
		if($this->input->post('ice5') == 'on'){
			array_push($tmp_i,5);
		}
		$tmp['ice'] = join($tmp_i,',');
		if($this->input->post('ice6') == 'on'){
			$tmp['ice'] = 6;
		}
		if($this->input->post('id')){
			$this->db->where('id',$this->input->post('id'));
			$this->db->update('products',$tmp);
		}else{
			$this->db->insert('products',$tmp);
		}
		echo "{'success':true}";
	}
	function prod_del(){
		$this->db->where('prod_id',$this->input->post('id'));
		$num = $this->db->count_all_results('order_d');
		if($num<1){
			$this->db->where('id',$this->input->post('id'));
			$this->db->delete('products');
		}
		echo "{'success':true}";
	}
}