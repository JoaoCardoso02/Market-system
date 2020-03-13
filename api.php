<?php

    include './query.php';

    foreach($_GET as $chave => $valor){
        if ($chave == "funcao") {
            $function = $valor;
        }else{
            $dados[$chave] = $valor;
        }
    }
    if ($function == "selectBanco") {
        print_r(json_encode(selectBanco(conexao(), '*', $dados['tabela'], $dados['where'])));
    } elseif ($function == "alteraBanco") { 
        print_r(alteraBanco(conexao(), $dados['colunasArray'], $dados['dados'], $dados['tabela'], $dados['where']));
    } elseif ($function == "insertBanco"){
        print_r(insertBanco(conexao(), $dados['colunasArray'], $dados['dados'], $dados['tabela']));
    }
?>