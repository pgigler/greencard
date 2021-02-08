<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../greencard_config.php';
require 'helpers.php';

\My\Helpers\handleCORS();

header('Content-Type: application/json; charset=utf-8');

$request = json_decode(file_get_contents('php://input'));

$data = [
    "day" => date("Y-m-d", strtotime($request->day)),
	"serviceType" => $request->serviceType,
	"timeSlot" => $request->timeSlot,
	"email" => $request->email,
	"name" => $request->name,
	"phone" => $request->phone,
	"regNumber" => $request->regNumber,
	"autoType" => $request->autoType,
	"remark" => $request->remark,
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$data["creator"] = 'Anonymous';
$stmtAdd = $pdo->prepare(
    "INSERT INTO `${tablePrefix}appointments` (`day`, serviceType, timeSlot, email, name, phone, regNumber, autoType, remark, createdTs, creator)" .
        " VALUES (:day, :serviceType, :timeSlot, :email, :name, :phone, :regNumber, :autoType, :remark, now(), :creator)"
);
$stmtAdd->execute($data);

echo json_encode(new \stdClass(), JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
