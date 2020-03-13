<?php

    include './conexao.php';

    function selectBanco($PDO, $items, $tabela, $where){
        $sql = "SELECT $items FROM $tabela WHERE $where";
        $result = $PDO->query($sql);
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }

    function deleteBanco($PDO, $tabela, $where){
        $sql = "DELETE FROM $tabela WHERE $where";
        if($result = $PDO->query($sql)){
            return TRUE;
        }else{
            return FALSE;
        }
        
    }
    
    function alteraBanco($PDO, $colunasArray, $dados, $tabela, $where){
        for ($i=0; $i <count($colunasArray) ; $i++) { 
            if($i == count($colunasArray) - 1){
                
                if (isset($colunas)) {
                    $colunas = $colunas.$colunasArray[$i]." = ".$dados[$i]." ";
                }else{
                    if ($colunasArray != array()) {
                        $colunas = $colunasArray." = ".$dados." ";    
                    }else{
                        $colunas = $colunasArray[$i]." = ".$dados[$i]." ";
                    }
                }

                
            }else{
                if (isset($colunas)) {
                    $colunas = $colunas.$colunasArray[$i]." = ".$dados[$i].", ";
                }else{
                    if ($colunasArray != array()) {
                        $colunas = $colunasArray." = ".$dados.", ";    
                    }else{
                        $colunas = $colunasArray[$i]." = ".$dados[$i].", ";
                    }
                }
            }
            
        }
        $sql = "UPDATE $tabela SET $colunas WHERE $where";
        if($result = $PDO->query($sql)){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    
    function insertBanco($PDO, $colunasArray, $dados, $tabela){
        $dados = explode(',', $dados);
        for ($i=0; $i <count($dados) ; $i++) { 
            if (isset($values)) {
                $values = $values.','.$dados[$i];
            }else{
                $values = $dados[$i];
            }
        }
        
        $sql = "INSERT INTO $tabela ($colunasArray) values ($values)";
        if($result = $PDO->query($sql)){
            return TRUE;
        }else{
            return FALSE;
        }
    }
    function login(){
        $login = $_POST['login'];
        $senha = $_POST['senha'];
        $loginSql = 'login = '.$login;
        $usuario = selectBanco(conexao(), '*', 'usuarios', "login = '".$login."'")[0];
        if ($usuario['login'] == $login && $usuario['senha'] == $senha) {
            session_start();
            $_SESSION['login'] = $login;
        }
        header('Location: ./index.php');

    }
?>
