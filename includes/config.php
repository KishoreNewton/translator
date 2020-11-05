<?php
ob_start();
session_start();
date_default_timezone_set('America/Los_Angeles');
try {
    $con = new PDO('mysql:dbname=translater;host=localhost', 'root', '');
    $con->exec('set names utf8');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (PDOException $e) {
    exit('Connection failed: ' . $e->getMessage());
}
?>
