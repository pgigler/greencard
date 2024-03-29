<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../../greencard_config.php';
require '../helpers.php';

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
	"remark" => isset($request->remark) ? $request->remark : "",
];

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM `${tablePrefix}appointments` WHERE day = :day AND serviceType = :serviceType AND timeSlot = :timeSlot AND deleted = 0");
$stmtCheck->bindParam(':day', $data["day"]);
$stmtCheck->bindParam(':serviceType', $data["serviceType"]);
$stmtCheck->bindParam(':timeSlot', $data["timeSlot"]);
$stmtCheck->execute();
$count = $stmtCheck->fetchColumn();

// if appointment already exists on this slot
if ($count > 0) {
    header('HTTP/1.1 422 Unprocessable Entity');
    exit(0);
}

$data["creator"] = 'Anonymous';
$stmtAdd = $pdo->prepare(
    "INSERT INTO `${tablePrefix}appointments` (`day`, serviceType, timeSlot, email, name, phone, regNumber, autoType, remark, creator)" .
        " VALUES (:day, :serviceType, :timeSlot, :email, :name, :phone, :regNumber, :autoType, :remark, :creator)"
);
$stmtAdd->execute($data);

$serviceType = $data["serviceType"] == "MotTest" ? "Műszaki vizsga" : "Eredetiség vizsgálat";

\My\Helpers\sendEmail($data["email"], 'Visszaigazolás',
    "Kedves " . $data["name"] . "!<br/><br/>Köszönjük a foglalást. Várjuk a megadott időpontban. Lemondani, időpontot módosítani emailen: zoldkartyabt1@gmail.com, vagy munkaidőben tud telefonon: +36 (30) 131 4101.<br/>"
    . "<br/>" . $serviceType . "<br/><br/>Név: " . $data["name"] . "<br/>Telefonszám: " . $data["phone"] . "<br/>Időpont: " . $data["day"] . " " . $data["timeSlot"]
    . "<br/>Autó: " . $data["autoType"] . " (" . $data["regNumber"] . ")<br/>Megjegyzés: " . $data["remark"] . "<br/><br/>Üdvözlettel,<br/>Zöldkártya Bt.");

header('HTTP/1.1 200 OK');

echo json_encode(new \stdClass(), JSON_UNESCAPED_UNICODE);

?>
