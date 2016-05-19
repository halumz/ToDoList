<?php
require 'init.php';
$query ="SELECT * FROM todolist";
$data=mysqli_query($query);
$rows = array();
while($row = mysql_fetch_assoc ($data))
{
	$rows[] = $row;
}
echo  json_encode($rows);
?>
