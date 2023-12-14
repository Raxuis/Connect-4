<?php
require 'connection.php';

if (isset($_GET)) {
    if (isset($_GET['api'])) {
        if ($_GET['api'] === 'create') {
            $query = $bdd->prepare('INSERT INTO games (yellow_username, red_username, yellow_score, red_score) VALUES (:yellow_user, :red_user, :yellow_score, :red_score)');
            $query->execute([
                'yellow_user' => $_GET['yellow_user'],
                'red_user' => $_GET['red_user'],
                'yellow_score' => $_GET['yellow_score'],
                'red_score' => $_GET['red_score']
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
