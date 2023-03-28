<?php
    //connect to data base
    $connect = mysqli_connect('localhost', 'root', '', 'testajax');

    echo 'Processing...';

    //check for GET variable
    if(isset($_GET['name'])){
        echo 'GET: Your name is '. $_GET['name'];
    }

    //check for POST variable
    if(isset($_POST['name'])){
        $name = mysqli_real_escape_string($connect, $_POST['name']);
        echo 'POST: Your name is '. $_POST['name'];

        $query = "INSERT into users(name) VALUES('$name')";

        if(mysqli_query($connect, $query)){
            echo 'User Added';
        }else{
            echo 'ERROR: '. mysqli_error($connect); 
        }
    }

?>  