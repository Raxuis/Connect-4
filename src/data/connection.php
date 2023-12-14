<?php

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
if (!isset($_SESSION['token'])) {
    $_SESSION['token'] = md5(uniqid(mt_rand(), true));
}

if (isset($_GET['kill']) && $_GET['kill'] === "all") {
    session_destroy();
    header("location: index.php");
    exit();
}

if (PHP_OS == 'Darwin') {
    try {
        $bdd = new PDO(
            'mysql:host=localhost;dbname=connect4;charset=utf8',
            'root',
            'root'
        );
        $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('Error : ' . $e->getMessage());
    }
} else {
    try {
        $bdd = new PDO(
            'mysql:host=localhost;dbname=connect4;charset=utf8',
            'root',
            ''
        );
        $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('Error : ' . $e->getMessage());
    }
}