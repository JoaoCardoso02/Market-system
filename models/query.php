<?php

    include '../config/conexao.php';

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
            $dados = explode(',', $dados);
            $colunasArray = explode(',',$colunasArray);
            foreach ($colunasArray as $key => $coluna) {
                if (!isset($colunas)) {
                    $colunas = $coluna.' = '.$dados[$key];
                }else{
                    $colunas = $colunas.','.$coluna.' = '.$dados[$key];
                }
                
                
            }
        }
        $sql = "UPDATE $tabela SET $colunas WHERE $where";
        return json_encode($result = $PDO->query($sql));
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
    function login($PDO, $login, $senha){
        #$result = selectBanco($PDO, '*', 'usuarios', 'login = "'.$login.'" and senha "'.$senha.'"');
        $sql = "SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha'";
        $result = $PDO->query($sql);
        $rows = $result->fetchAll(PDO::FETCH_ASSOC)[0];
        
        if ($rows) {
            session_start();
            $_SESSION['login'] = $login;
            header('Location: ../index.php');
        }
    }
?>
