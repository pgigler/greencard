<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../greencard_config.php';
require_once 'helpers.php';

\My\Helpers\handleCORS();
$email = \My\Helpers\authenticate();
$tablePrefix = \My\Helpers\getTablePrefix();

header('Content-Type: application/json; charset=utf-8');

try {
	$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
	$pdo = new PDO($dsn, DB_USER, DB_PASS);
} catch (\PDOException $e) {
	throw new \PDOException($e->getMessage(), (int) $e->getCode());
}

$stmt = $pdo->query("SELECT * FROM `${tablePrefix}orders` WHERE 1");
$arr = [];
while ($row = $stmt->fetch()) {
	array_push($arr, $row);
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
