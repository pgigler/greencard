<?php declare(strict_types=1);
http_response_code(500);

require_once __DIR__ . '/../../greencard_config.php';
require_once '../helpers.php';

\My\Helpers\handleCORS();
$tablePrefix = \My\Helpers\getTablePrefix();

header('Content-Type: application/json; charset=utf-8');

$pdo = \My\Helpers\createDBContext();

// Queries the next three months only
$now = new \DateTime();
$yesterday = $now->sub(new DateInterval('P1D'))->format('Y-m-d');
$threeMonthsLater = $now->add(new DateInterval('P90D'))->format('Y-m-d');
$stmtAppointments = $pdo->prepare("SELECT day, serviceType, timeSlot FROM `${tablePrefix}appointments` WHERE day > :yesterday AND day <= :until AND deleted = 0");
$stmtAppointments->bindParam(':until', $threeMonthsLater);
$stmtAppointments->bindParam(':yesterday', $yesterday);
$stmtAppointments->execute();

$result = new \stdClass();
$result->appointments = [];
while ($rowAppointments = $stmtAppointments->fetch(PDO::FETCH_ASSOC)) {
    $result->appointments[] = $rowAppointments;
}

$stmtDays = $pdo->prepare("SELECT day, status FROM `${tablePrefix}days` WHERE day > :yesterday AND day <= :until");
$stmtDays->bindParam(':until', $threeMonthsLater);
$stmtDays->bindParam(':yesterday', $yesterday);
$stmtDays->execute();

$result->days = [];
while ($rowDays = $stmtDays->fetch(PDO::FETCH_ASSOC)) {
    $result->days[] = $rowDays;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
