<?php
$sendto = nl2br($_POST['email']);

$content = "Заявка с сайта ";
// Формирование заголовка письма
$subject  = $content;
$headers  = "From: no-reply@no-reply.ru" . "\r\n";
$headers .= "Reply-To: Без ответа". "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = '';

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>



