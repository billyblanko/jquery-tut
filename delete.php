<?php
    //response from php to ajax
    header('Content-Type: application/json');

    //if request method is equal to post carryout the following instructions

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id = $_GET['id'];
        $json = file_get_contents('api/orders.json');
        $data =  json_decode($json, true);

        // loop through the json file and find the id to be deleted
        foreach ($data as $key => $value) {
            if ($value['id'] == $id) {
                unset($data[$key]);
            }
        }

        file_put_contents('api/orders.json', json_encode(array_values($data)));
    
        echo json_encode(array('success' => true));
    } else {
        http_response_code(405);
        echo json_encode(array('error' => 'Method Not Allowed'));
    }

    
?>