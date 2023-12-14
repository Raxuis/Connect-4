<?php
require 'connection.php';


if (isset($_GET)) {
    if (isset($_GET['api'])) {
        if (in_array(' ', $_GET['yellow_user'])) {
            $_GET['yellow_user'] = str_replace(' ', '_', $_GET['yellow_user']);
            $_GET['red_user'] = str_replace(' ', '_', $_GET['red_user']);
        }
        if ($_GET['api'] === 'create') {
            $query = $bdd->prepare('INSERT INTO games (yellow_name, red_name, yellow_score, red_score, time) VALUES (:yellow_user, :red_user, :yellow_score, :red_score,:gameTime)');
            $query->execute([
                'yellow_user' => $_GET['yellow_user'],
                'red_user' => $_GET['red_user'],
                'yellow_score' => $_GET['yellow_score'],
                'red_score' => $_GET['red_score'],
                'gameTime' => $_GET['gametime']
            ]);
            echo json_encode('success');
        } elseif ($_GET['api'] === 'read') {
            $query = $bdd->prepare('SELECT * FROM games');
            $query->execute();
            $response = $query->fetchAll();
            echo json_encode($response);
        }
    }
} else {
    echo json_encode('error');
}
