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
	"updater" => $authEmail,
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$data['id'] = $request->id;
$data["updater"] = $authEmail;
$stmtDelete = $pdo->prepare(
	"UPDATE `${tablePrefix}appointments` SET deleted = 1, updatedTs = now(), updater = :updater WHERE id = :id"
);
$stmtDelete->execute($data);

header('HTTP/1.1 200 OK');

?>
