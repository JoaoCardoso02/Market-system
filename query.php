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
                    $colunas = $colunas.$colunasArray[$i]." = '".$dados[$i]."' ";
                }else{
                    $colunas = $colunasArray[$i]." = '".$dados[$i]."' ";
                    
                }

                
            }else{
                if (isset($colunas)) {
                    $colunas = $colunas.$colunasArray[$i]." = '".$dados[$i]."', ";
                }else{

                    $colunas = $colunasArray[$i]." = '".$dados[$i]."', ";
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
        for ($i=0; $i <count($colunasArray) ; $i++) { 
            if($i == count($colunasArray) - 1){
                
                if (isset($colunas)) {
                    $colunas = $colunas.$colunasArray[$i];
                    $values = $values.'"'.$dados[$i].'"';
                }else{
                    $colunas = $colunasArray[$i];
                    $values = '"'.$dados[$i].'"';
                }

                
            }else{
                if (isset($colunas)) {
                    $colunas = $colunas.$colunasArray[$i].', ';
                    $values = '"'.$values.$dados[$i].'", ';
                }else{
                    $colunas = $colunasArray[$i].', ';
                    $values = '"'.$dados[$i].'", ';
                }
            }
            
        }
        $sql = "INSERT INTO $tabela ($colunas) values ($values)";
        print($sql);
        if($result = $PDO->query($sql)){
            return TRUE;
        }else{
            return FALSE;
        }
    }
?>
