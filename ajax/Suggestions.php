<?php
require_once("../includes/config.php");

if(isset($_POST["inputLanguage"]) && isset($_POST["textValue"])){
    $inputLanguage = $_POST["inputLanguage"];
    $textValue = $_POST["textValue"];
    $sentance = preg_split('/ /', $textValue);
    $array = array();
    foreach($sentance as $word){
        $query = $con->prepare("SELECT " . $inputLanguage . " AS input FROM languages WHERE " .$inputLanguage . " LIKE CONCAT(:input, '%') LIMIT 3 ");
        $query->bindValue(":input", $word);
        $query->execute();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            array_push($array, $row);
        }
        
    }
    echo json_encode($array);
} else {
    echo "something went wrong";
}
?>