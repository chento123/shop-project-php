<?php 
    include('db/db.php');
    $db=new DB;
    $tbl=array('tbl_slide','tbl_category','tbl_sub_category','tbl_product');
    $TblOpt=$_POST['opt'];
    $res['id']=$db->get_auto_id('id',$TblOpt ); 
    echo json_encode($res);
?>