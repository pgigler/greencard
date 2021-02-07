<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../../greencard_config.php';
require '../helpers.php';

$isUAT = ENV == "uat";
$tablePrefix = \My\Helpers\getTablePrefix();

\My\Helpers\handleCORS();

header('Content-Type: application/json; charset=utf-8');

// Takes raw data from the request
$json = file_get_contents('php://input');

$data = json_decode($json);

$result = new class {};
$dec = join(
	"",
	array_map(function ($char) {
		return hexdec($char);
	}, str_split(md5($json)))
);
$num1 = substr($dec, 0, 5);
$num2 = substr($dec, 5, 4);
$result->orderId = (new DateTime())->format("ymd") . "-" . $num1 . "-" . $num2;

echo json_encode($result, JSON_UNESCAPED_UNICODE);

// try {
// 	$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
// 	$pdo = new PDO($dsn, DB_USER, DB_PASS);
// } catch (\PDOException $e) {
// 	throw new \PDOException($e->getMessage(), (int) $e->getCode());
// }

header('HTTP/1.1 200 OK');

?>
