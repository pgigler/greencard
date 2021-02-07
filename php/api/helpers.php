<?php declare(strict_types=1);

namespace My\Helpers;

require_once __DIR__ . '/../greencard_config.php';
require __DIR__ . '/../vendor/autoload.php';

use Google\Auth\AccessToken;

function getTablePrefix()
{
	$isUAT = ENV == "uat";
	return $isUAT ? "uat_" : "prod_";
}

function handleCORS()
{
	$isUAT = ENV == "uat";

	header("Access-Control-Allow-Headers: Authorization, X-Authorization, Content-Type");
	// UAT is cross-domain query, so allow it
	if ($isUAT) {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Methods: *");
	}

	// Allow OPTIONS to support prefetch
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		header('HTTP/1.1 200 OK');
		exit();
	}
}

function authenticate()
{
	try {
		$headers = getAuthorizationHeader();
		$idToken = null;
		if (!empty($headers)) {
			if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
				$idToken = $matches[1];
			}
		} else {
			throw new \Exception("Bearer token not found");
		}
		$auth = new AccessToken();
		$payload = $auth->verify($idToken, ['throwException' => true]);
		$email = $payload["email"];
		if (!isEmailAuthorized($email)) {
			header('HTTP/1.1 403 Forbidden');
			exit();
		} else {
			return $email;
		}
	} catch (\Exception $ex) {
		header('HTTP/1.1 401 Unauthorized');
		exit();
	}
}

function isEmailAuthorized($email)
{
	$allowedEmails = array_map('trim', explode(",", ALLOWED_EMAILS));
	return in_array($email, $allowedEmails);
}

function getAuthorizationHeader()
{
	$headers = null;
	if (isset($_SERVER['Authorization'])) {
		$headers = trim($_SERVER["Authorization"]);
	} elseif (isset($_SERVER['X-Authorization'])) {
		$headers = trim($_SERVER["X-Authorization"]);
	} elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
		//Nginx or fast CGI
		$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
	} elseif (function_exists('apache_request_headers')) {
		$requestHeaders = apache_request_headers();
		// Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
		$requestHeaders = array_combine(
			array_map('ucwords', array_keys($requestHeaders)),
			array_values($requestHeaders)
		);
		// print_r($requestHeaders);
		if (isset($requestHeaders['Authorization'])) {
			$headers = trim($requestHeaders['Authorization']);
		} elseif (isset($requestHeaders['X-Authorization'])) {
			$headers = trim($requestHeaders['X-Authorization']);
		}
	}
	return $headers;
}

function createDBContext()
{
	try {
		$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
		return new \PDO($dsn, DB_USER, DB_PASS);
	} catch (\PDOException $e) {
		throw new \PDOException($e->getMessage(), (int) $e->getCode());
	}
}

?>
