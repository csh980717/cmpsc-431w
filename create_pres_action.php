<?php

require 'Config.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('America/New_York');
$username = Config::$username;
$password = Config::$password;
$host = Config::$ip;
$dbname = Config::$database;
session_start();

// TODO: Uncomment this before submission
$did = $_SESSION['user_id'];

// TODO: Delete this before submission
//$did = 'doc0';

$pid = $_GET['pid'];

$comment = $_GET['comment'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (PDOException $e) {
    die("Could not connect to the database $dbname :" . $e->getMessage());
}

try {
    $pdo->beginTransaction();
    $sql = $pdo->prepare('insert into attendence(doctor_id, patient_id, attendence_date, comment) VALUES (:did,:pid,:date,:comment)');
    $sql->execute(['did' => $did, 'pid' => $pid, 'date' => date('Y-m-d'), 'comment' => $comment]);
    $sql = $pdo->prepare('select attendance_id from attendence order by attendance_id desc limit 1');
    $sql->execute();
    $result = $sql->fetch();
    $pdo->commit();
    echo($result['attendance_id']);
//<!--    <html lang="en">-->
//<!--    <head>-->
//<!--        <title>Create prescription</title>-->
//<!--    </head>-->
//<!--    <body>-->
//<!--    Create successful... Redirecting to another page...-->
//<!--    <script>-->
//<!--        setInterval(() => {-->
    /*<!--            location.replace('edit_prescription.php?id=--><?php //echo $result['attendance_id']?>//')*/
//<!--//        }, 1000);-->
//<!--//    </script>-->
//<!--//    </body>-->
//<!--//    </html>-->
//<!--//-->
//<!--//    -->
} catch (PDOException $e) {
    $pdo->rollBack();
    echo $e->getMessage();
}