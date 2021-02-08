<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../greencard_config.php';
require 'helpers.php';

\My\Helpers\handleCORS();
$authEmail = \My\Helpers\authenticate();

header('Content-Type: application/json; charset=utf-8');

$request = json_decode(file_get_contents('php://input'));

$data = [
	"id" => $request->id,
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$stmtDelete = $pdo->prepare("DELETE FROM `${tablePrefix}days` WHERE id = :id");
$stmtDelete->execute($data);

echo json_encode(new \stdClass(), JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
