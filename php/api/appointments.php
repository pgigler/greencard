<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../greencard_config.php';
require_once 'helpers.php';

\My\Helpers\handleCORS();
$authEmail = \My\Helpers\authenticate();
header('Content-Type: application/json; charset=utf-8');

$request = json_decode(file_get_contents('php://input'));
$fromDate = date("Y-m-d", strtotime($request->fromDate));
$toDate = date("Y-m-d", strtotime($request->toDate));

$tablePrefix = \My\Helpers\getTablePrefix();
$pdo = \My\Helpers\createDBContext();

$stmtAppointments = $pdo->prepare(
	"SELECT * FROM `${tablePrefix}appointments` WHERE day >= :fromDate AND day <= :toDate AND deleted = 0"
);
$stmtAppointments->bindParam(':fromDate', $fromDate);
$stmtAppointments->bindParam(':toDate', $toDate);
$stmtAppointments->execute();

$result = new \stdClass();
$result->appointments = [];
while ($rowAppointments = $stmtAppointments->fetch(PDO::FETCH_ASSOC)) {
	$result->appointments[] = $rowAppointments;
}

$stmtDays = $pdo->prepare("SELECT * FROM `${tablePrefix}days` WHERE day >= :fromDate AND day <= :toDate");
$stmtDays->bindParam(':fromDate', $fromDate);
$stmtDays->bindParam(':toDate', $toDate);
$stmtDays->execute();

$result->days = [];
while ($rowDays = $stmtDays->fetch(PDO::FETCH_ASSOC)) {
	$result->days[] = $rowDays;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
