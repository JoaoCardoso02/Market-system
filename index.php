<?php

    include './query.php';
    if (!isset($_SESSION['login'])) {
        include './views/mercado.html';    
    }else{
        include './views/index.html';
    }
    
    
?>