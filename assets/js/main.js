new Vue({
    el: "#app",
    data: {
        currentTab: 'Produtos',
        tabs: ['Produtos', 'Cadastrar produtos'],
        products: '',
        value: '',
        categorias: ''
    },
    created() {
        fetch('./api.php?funcao=selectBanco&tabela=produtos,categorias&where=categorias.id_categoria=produtos.cod_categoria')
            .then(resposta => resposta.json())
            .then(products => this.products = products)
        fetch('./api.php?funcao=selectBanco&tabela=categorias&where=1')
            .then(resposta => resposta.json())
            .then(categorias => this.categorias = categorias)
        
    },
    methods: {
        refresh(){
            fetch('./api.php?funcao=selectBanco&tabela=produtos,categorias&where=categorias.id_categoria=produtos.cod_categoria')
                .then(resposta => resposta.json())
                .then(products => this.products = products)
            fetch('./api.php?funcao=selectBanco&tabela=categorias&where=1')
                .then(resposta => resposta.json())
                .then(categorias => this.categorias = categorias)
        },
        compraProduto(id) {
            var num = parseInt(document.getElementById(id).value);
            this.products.forEach(function (elements, index) {
                if (elements.id == id) {
                    idSql = id;
                    id = index;
                    console.log(elements.estoque);
                    
                }
            })
            
            var numData = parseInt(this.products[id].estoque);
            
            
            numNovo = numData - num;
     
            
            if (num > numData) {                
                alert("O número inserido é maior que o disponível no estoque!");
            }else{
                fetch('./api.php?funcao=alteraBanco&colunasArray=estoque&dados='+numNovo+'&tabela=produtos&where=id='+idSql)
                this.refresh()
                //location.reload();
            }
            
        },
        addProduto(){
            var nome = document.getElementById('nome').value;
            var categoria = document.getElementById('categoria').value;
            var estoque = document.getElementById('estoque').value;
            var imposto = document.getElementById('imposto').value;
            var preco = document.getElementById('preco').value;
            this.categorias.forEach(element => {
                id_categoria = element.id_categoria;
            });

            if (nome == false || !parseInt(estoque) || !parseInt(imposto) || !parseInt(preco)) {
                alert("Dados inválidos!")                
            }else{
                fetch('./api.php?funcao=insertBanco&colunasArray=nome,estoque,preco,preco_imposto,cod_categoria&dados="'+nome+'",'+estoque+','+preco+','+imposto+','+id_categoria+'&tabela=produtos')
                location.reload();
            }
        },
        addCategoria(){
            var nomeCategoria = document.getElementById('nomeCategoria').value;

            if (nomeCategoria == '') {
                alert("Dados inválidos!")                
            }else{
                fetch('./api.php?funcao=insertBanco&colunasArray=categoria&dados="'+nomeCategoria+'"&tabela=categorias')
                location.reload();
            }
        },
        print(){
            console.log(this.products);
        }
    },
    computed: {
      currentTabComponent: function () {
        return 'tab-' + this.currentTab.toLowerCase()
      }
    }
});

