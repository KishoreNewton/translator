<?php
require_once("../includes/config.php");

if(isset($_POST["inputLanguage"]) && isset($_POST["outputLanguage"]) && isset($_POST["textValue"])){
    $inputLanguage = $_POST["inputLanguage"];
    $outputLanguage = $_POST["outputLanguage"];
    $textValue = $_POST["textValue"];
    $sentance = preg_split('/ /', $textValue);
    $array = array();
    foreach($sentance as $word){
        $query = $con->prepare("SELECT " . $inputLanguage . " AS input, " . $outputLanguage . " AS output FROM languages WHERE ". $inputLanguage ."=:input");
        $query->bindValue(":input", $word);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        // if($row == false){
        //     $json = json_encode(array('input' => 'aww', 'output' => 'aww'));
        //     echo $json;
        // } else{
        //     echo json_encode($row);
        // }
        array_push($array, $row);
    }
    echo json_encode($array);
} else {
    echo "something went wrong";
}
?>