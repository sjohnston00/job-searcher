<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "uk_job_search";
$conn = "";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$query = $conn->prepare(
    "INSERT INTO customers (first_name, last_name, email, phone_number, message)
    VALUES (?, ?, ?, ?, ?)"
);

$query->bindParam(1, $firstName);
$query->bindParam(2, $lastName);
$query->bindParam(3, $email);
$query->bindParam(4, $phoneNumber);
$query->bindParam(5, $message);

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phoneNumber = $_POST['phoneNumber'];
$message = $_POST['message'];

$query->execute();
$conn = null;

echo <<<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submission Confirmation</title>
</head>
<body>
    <h2>Thank you, $firstName $lastName.</h2>
    <p>If you wish to go back click <a href="/uk-job-searcher/">here</a></p>
</body>
</html>
EOL;