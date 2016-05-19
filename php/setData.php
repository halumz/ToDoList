<?PHP
	require 'init.php';
	$columnns="";
	foreach ($AdminColumnnames as $columnname) 
	{
		$columnns = $columnns.$columnname." , ";
	}
	$columnns = substr($columnns , 0, strlen($columnns ) - 2);
	$query = "select ".$columnns." from USERS order by ID desc";
	$parseresults = ociparse($conn, $query);
	ociexecute($parseresults);
	while($row=oci_fetch_assoc($parseresults)) 
		$output[]=$row;

	print json_encode($output);
	
	oci_free_statement($parseresults);
	oci_close($conn);
?>