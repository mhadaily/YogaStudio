<?php 
	if (isset($_POST)) {

		if( 	!empty($_POST['name'])
			&&	!empty($_POST['email'])
			&&	!empty($_POST['message'])
			){			

			$to      = 'mj@rchtheme.com';
			$subject = 'RCHTheme - Yoga Studio';		
			$message = '
						<html>						
						<body>
							        <p>Name: ' . $_POST['name'] . '</p>
							        <p>Email: ' . $_POST['email'] . '</p>
						  			<p>'. $_POST['message'] . '</p>						  
						</body>
						</html>
						';
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= 'From: noreply@rchtheme.com' . "\r\n" .
					    'Reply-To: ' . $_POST['email'] . "\r\n" .
					    'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);

			echo json_encode(true);
		}else{			
			echo json_encode(false);
		}		
	}
?>