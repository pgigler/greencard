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
	"serviceType" => $request->serviceType,
	"timeSlot" => $request->timeSlot,
	"email" => $request->email,
	"name" => $request->name,
	"phone" => $request->phone,
	"regNumber" => $request->regNumber,
	"autoType" => $request->autoType,
	"remark" => isset($request->remark) ? $request->remark : "",
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

if (isset($request->id)) {
	$data['id'] = $request->id;
	$data["updater"] = $authEmail;
	$stmtUpdate = $pdo->prepare(
		"UPDATE `${tablePrefix}appointments` SET day = :day, serviceType = :serviceType, timeSlot = :timeSlot, email = :email, updatedTs = now(), updater = :updater" .
			", name = :name, phone = :phone, regNumber = :regNumber, autoType = :autoType, remark = :remark WHERE id = :id"
	);
	$stmtUpdate->execute($data);
} else {
	$data["creator"] = $authEmail;
	$stmtAdd = $pdo->prepare(
		"INSERT INTO `${tablePrefix}appointments` (`day`, serviceType, timeSlot, email, name, phone, regNumber, autoType, remark, createdTs, creator)" .
			" VALUES (:day, :serviceType, :timeSlot, :email, :name, :phone, :regNumber, :autoType, :remark, now(), :creator)"
	);
	$stmtAdd->execute($data);
}

header('HTTP/1.1 200 OK');

echo json_encode(new \stdClass(), JSON_UNESCAPED_UNICODE);

?>
