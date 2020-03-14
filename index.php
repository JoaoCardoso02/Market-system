<?php
    session_start();
    #print($_COOKIE['user']);
    include 'models/query.php';
    if (isset($_SESSION['login'])) {
        include 'views/mercado.html'; 
    }else{
        include 'views/index.html';
    }

    
?>