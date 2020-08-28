<?php

// 1.接受前端数据
$username = $_POST['username'];
$password = $_POST['password'];


// 2.连接数据库
$conn = mysqli_connect('localhost','root','root','test');
// 3.书写SQL语句
$sql = "SELECT * FROM `user` WHERE `username`= '$username' AND `password`='$password'";

// 4.执行SQL语句
$result = mysqli_query($conn,$sql);



//5 解析查询结果
$data = mysqli_fetch_assoc($result);


if($data){
    $arr = array('code'=>1,'data'=>array('username'=>$username,'password'=>$password));
}else{
    $arr = array('code'=>0,'msg'=>'用户名或密码错误');
}

// 6.返回json格式的数据
echo json_encode($arr);

?>