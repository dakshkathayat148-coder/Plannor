<?php
$content = file_get_contents('php://input');
$result = file_put_contents(__DIR__ . '/plannor-ai.html', $content);
echo $result !== false ? 'saved:' . $result : 'error';
@unlink(__FILE__);
?>	