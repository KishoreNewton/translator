<?php
require_once("../includes/config.php");

if(isset($_POST["inputLanguage"]) && isset($_POST["outputLanguage"]) && isset($_POST["textValue"])){
    $inputLanguage = $_POST["inputLanguage"];
    $outputLanguage = $_POST["outputLanguage"];
    $textValue = $_POST["textValue"];
    $query = $con->prepare("SELECT " . $inputLanguage . " AS input, " . $outputLanguage . " AS output FROM languages WHERE ". $inputLanguage ."=:input");
    $query->bindValue(":input", $textValue);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    echo json_encode($row);
} else {
    echo "something went wrong";
}
?>