<?php
    //Handle POST Request from server side.
    //Retrieve the data from the POST Request

    $clientName = $_POST['name'];
    $drink = $_POST['drink'];

    if(empty($clientName) || empty($drink)) {
        header("HTTP/1.1 400 Bad Request");
        die("Missing Required Data");
    }

    //Read exisiting users
    $orders = [];
    if(file_exists('api/orders.json')) {
        $orders = json_decode(file_get_contents('api/orders.json'), true);
    }

    //Save the data from the database or format where it is stored

    // add new order
    $newOrder = array(
        'name'=> $clientName,
        'drink'=> $drink
    );
    array_push($orders, $newOrder);

    //save order
    file_put_contents('api/orders.json', json_encode($orders));

    //Construct the response data

    $newOrder = array(
        'name'=> $clientName,
        'drink'=> $drink
    );
    //send the data response to the client side javascript
    header('Content-Type: application/json');
    echo json_encode($newOrder);
?>