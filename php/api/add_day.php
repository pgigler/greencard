<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../greencard_config.php';
require 'helpers.php';

\My\Helpers\handleCORS();
$authEmail = \My\Helpers\authenticate();
header('Content-Type: application/json; charset=utf-8');

$request = json_decode(file_get_contents('php://input'));

$data = [
    "day" => date("Y-m-d", strtotime($request->day)),
	"status" => $request->status,
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$stmtAdd = $pdo->prepare(
    "INSERT INTO `${tablePrefix}days` (`day`, `status`) VALUES (:day, :status)"
);
$stmtAdd->execute($data);

echo json_encode(new \stdClass(), JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
