<?php 
    include('db/db.php');
    $db=new DB;
    $tbl=array('tbl_slide','tbl_category','tbl_sub_category','tbl_product');
    $opt=$_POST['opt'];
    $msg['total']=0;
    $msg['total']=$db->CountData($tbl[$opt],'id > 0');
    echo json_encode($msg);
?>