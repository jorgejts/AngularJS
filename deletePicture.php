<?php
$objDatos = json_decode(file_get_contents("php://input"));
$name=$objDatos->name;

if($name && unlink("./uploads/".$name))
{
	echo $name." deleted";
}
?>