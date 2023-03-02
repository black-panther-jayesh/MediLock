<?php
	$P_ID = $_POST["P_ID"];
    $NAME = $_POST["NAME"];
    $AGE = $_POST["AGE"];
    $GENDER = $_POST["GENDER"];
    $MOBILE = $_POST["MOBILE"];
    $PASSWORD = $_POST["PASSWORD"];

	// Database connection
	$conn = new mysqli('localhost','root','','medi-lock');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into signup(P_ID,NAME,AGE,GENDER,MOBILE,PASSWORD) values(?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssi", $P_ID, $NAME, $AGE, $GENDER, $MOBILE, $PASSWORD);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>