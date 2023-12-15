<?php
require 'connection.php';
header('Access-Control-Allow-Origin: *');
if (isset($_GET)) {
    if (isset($_GET['api'])) {
        if (isset($_POST['yellow_user']) && isset($_POST['red_user'])) {
            if (strpos($_POST['yellow_user'], ' ') !== false) {
                $_POST['yellow_user'] = str_replace(' ', '_', $_POST['yellow_user']);
            }
            if (strpos($_POST['red_user'], ' ') !== false) {
                $_POST['red_user'] = str_replace(' ', '_', $_POST['red_user']);
            }
        }
        if ($_GET['api'] === 'create') {
            $query = $bdd->prepare('INSERT INTO games (yellow_name, red_name, yellow_score, red_score, time) VALUES (:yellow_user, :red_user, :yellow_score, :red_score,:gameTime)');
            $query->execute([
                'yellow_user' => $_POST['yellow_user'],
                'red_user' => $_POST['red_user'],
                'yellow_score' => $_POST['yellow_score'],
                'red_score' => $_POST['red_score'],
                'gameTime' => $_POST['gametime']
            ]);
            echo json_encode(['message' => 'success']);
        } elseif ($_GET['api'] === 'read') {
            $query = $bdd->prepare('SELECT * FROM games');
            $query->execute();
            $response = $query->fetchAll(PDO::FETCH_ASSOC);

            // Escape HTML special characters in each field
            foreach ($response as &$row) {
                foreach ($row as $key => &$value) {
                    if ($value !== null) {
                        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                    }
                }
            }

            echo json_encode($response);
        }
    }
} else {
    echo json_encode('error');
}
