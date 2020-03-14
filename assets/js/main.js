new Vue({
    el: "#app",
    data: {
        currentTab: 'Produtos',
        tabs: ['Produtos', 'Cadastrar'],
        products: '',
        value: '',
        categorias: '',
        modal: '',
        nomeProduto: '',
        qtd: '',
        preco: '',
        percentImposto: '',
        precoImposto: '',
        precoSemImposto: '',
        valorTotalVenda: '',
        idProduto: '',
        novaQtdAltera: '',
        idAlteraEstoque: '',
        novoPrecoAltera: '',
        sucesso: false
    },
    created() {
        fetch('controller/api.php?funcao=selectBanco&tabela=produtos,categorias&where=categorias.id_categoria=produtos.cod_categoria')
            .then(resposta => resposta.json())
            .then(products => this.products = products)
        fetch('controller/api.php?funcao=selectBanco&tabela=categorias&where=1')
            .then(resposta => resposta.json())
            .then(categorias => this.categorias = categorias)
    },
    methods: {
        refresh() {
            fetch('controller/api.php?funcao=selectBanco&tabela=produtos,categorias&where=categorias.id_categoria=produtos.cod_categoria')
                .then(resposta => resposta.json())
                .then(products => this.products = products)
            fetch('controller/api.php?funcao=selectBanco&tabela=categorias&where=1')
                .then(resposta => resposta.json())
                .then(categorias => this.categorias = categorias)
        },
        vendeProduto(id) {
            var num = parseInt(document.getElementById(id).value);
            this.products.forEach(function (elements, index) {
                if (elements.id == id) {
                    nome = elements.nome;
                    idSql = id;
                    id = index;

                }
            })

            var numData = parseInt(this.products[id].estoque);


            numNovo = numData - num;
            if (numNovo == 0) {
                alert("O estoque de "+nome+" chegou a zero itens!");
                fetch('controller/api.php?funcao=alteraBanco&colunasArray=estoque&dados=0&tabela=produtos&where=id=' + idSql)
                this.refresh()
                this.refresh()
            } else if (num > numData) {
                alert("O número inserido é maior que o disponível no estoque!");
            } else {
                fetch('controller/api.php?funcao=alteraBanco&colunasArray=estoque&dados=' + numNovo + '&tabela=produtos&where=id=' + idSql)
                this.refresh()
                this.refresh()
            }

        },
        addProduto() {
            var nome = document.getElementById('nome').value;
            var categoria = document.getElementById('categoria').value;
            var estoque = document.getElementById('estoque').value;
            var preco = document.getElementById('preco').value;
            this.categorias.forEach(element => {
                if(categoria == element.categoria){
                    id_categoria = element.id_categoria;
                    porcentagem_imposto = element.porcentagem_imposto;
                }
            });
            
            
            preco = preco.replace(",", ".");
            var imposto = (porcentagem_imposto/100) * preco;

            if (nome == false  || !parseInt(estoque) || !parseInt(preco)) {
                alert("Dados inválidos!")
            } else {
                fetch('controller/api.php?funcao=insertBanco&colunasArray=nome,estoque,preco,cod_categoria,valor_imposto&dados="' + nome + '",' + estoque + ',' + preco + ',' + id_categoria + ',' + imposto + '&tabela=produtos')
                this.refresh()
                this.refresh()
                this.currentTab = 'Produtos';
            }
        },
        alteraEstoque(id){
            preco = this.novoPrecoAltera;
            qtd = parseInt(this.novaQtdAltera);
            preco.replace(",", ".");
            if (preco == '' || preco == undefined || qtd == String) {
                alert(typeof(qtd))
                alert("Dados inválidos");
            }else{
                fetch('controller/api.php?funcao=alteraBanco&colunasArray=estoque,preco&dados=' + qtd + ',"' + preco + '"&tabela=produtos&where=id=' + id)
                this.refresh()
                this.refresh()
            }
            
        },
        deletaProduto(id){
            fetch('controller/api.php?funcao=deletaBanco&tabela=produtos&where=id=' + id)
            this.refresh()
            location.reload();
        },
        addCategoria() {
            var nomeCategoria = document.getElementById('nomeCategoria').value;
            var imposto = document.getElementById('imposto').value;
            if (nomeCategoria == '' || imposto == '' || imposto == false) {
                alert("Dados inválidos!");
                this.sucesso = false;
            } else {
                this.sucesso = true;
                fetch('controller/api.php?funcao=insertBanco&colunasArray=categoria,porcentagem_imposto&dados="' + nomeCategoria + '", ' + imposto + '&tabela=categorias')
                this.refresh()
                this.refresh()
            }
        },
        modalProduto(id){
            this.products.forEach((element, index) => {
                if (element.id == id) {
                    nome = element.nome;
                    preco = element.preco;
                    imposto = element.porcentagem_imposto;
                    semImposto = element.valor_imposto;
                    idIndex = index;
                    
                    
                }
            });
            qtd = parseInt(this.products[idIndex].qtd);
            
            this.idProduto = id;
            this.nomeProduto = nome;
            this.qtd = qtd;
            this.preco = preco;
            this.percentImposto = imposto;
            this.precoImposto = ((imposto/100)*preco)*qtd;
            this.precoSemImposto = (preco-((imposto/100)*preco))*qtd;
            this.valorTotalVenda = preco * qtd;     
            
            
        },
        modalEditarProduto(id){
            this.products.forEach((element, index) => {
                if (element.id == id) {
                    this.novaQtdAltera = element.estoque;
                    this.novoPrecoAltera = element.preco;
                }
            });

            this.idAlteraEstoque = id;
            
        },
        modalExcluiProduto(id){
            this.idDeleta = id;
        },
        logout(){
            window.location.replace("logout.php");
        }
    },
    computed: {
        currentTabComponent: function () {
            console.log(this.currentTab);
            
            return 'tab-' + this.currentTab.toLowerCase()
        }
    },
});