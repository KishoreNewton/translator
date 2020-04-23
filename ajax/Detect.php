<?php
require_once("../includes/config.php");

if(isset($_POST["textValue"])){
    $textValue = $_POST["textValue"];
    $sentance = preg_split('/ /', $textValue);
    $array = array();
    foreach($sentance as $word){
        $query = $con->prepare("SELECT * FROM languages WHERE english=:input OR italian=:input OR hindi=:input OR german=:input OR french=:input OR russian=:input OR spanish=:input OR greek=:input OR hebrew=:input OR dutch=:input OR arabic=:input OR bengali=:input OR chineses=:input OR chineset=:input OR swedish=:input OR japanese=:input OR romanian=:input OR portuguese=:input LIMIT 1");
        $query->bindValue(":input", $word);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_NAMED);
        array_push($array, $row);
    }
    echo json_encode($array);
} else {
    echo "something went wrong";
}
?>