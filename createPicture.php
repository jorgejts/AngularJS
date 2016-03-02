<?php

$objDatos = json_decode(file_get_contents("php://input"));
$name=$objDatos->name;
$pieces=preg_split("/[.]+/", $name);
$ext=strtolower($pieces[count($pieces)-1]);
$result="";
$name=rand(10,99).$name;

if($ext){
	$data = base64_decode( $objDatos->data);
	$image=imagecreatefromstring($data);
	if ($image !== false&&($ext=="jpeg"||$ext=="jpg")) {
	    header('Content-Type: image/jpeg');
	    if($image&&$im=imagejpeg($image,"./uploads/".$name,'70')){
	    	$basura=imagedestroy($image);
	    	$result=$name;
	    }
	}elseif ($image !== false&&$ext=="png") {
		header('Content-Type: image/png');
	    if($image&&$im=imagepng($image,"./uploads/".$name,'9')){
	    	$basura=imagedestroy($image);
	    	$result=$name;
	    }
	}else {
	    $result= 'ERROR-1';
	}
}else{
	$result= "ERROR-2";
}
echo $result;
?>