new Vue({
    el: "#app",
    data: {
        message: 'Hello Vue from PHP!',
        products: '',
        value: '',
        qtd: {}
    },
    created() {
        fetch('./api.php?funcao=selectBanco&tabela=produtos,categorias&where=1')
            .then(resposta => resposta.json())
            .then(products => this.products = products)
        // .then(products => {
        //     products.forEach(product => {
        //         this.qtd = {
        //             id = products.id
        //         }
        //     });
        // })
    },
    methods: {
        mudaValor() {
            console.log('1');

        },
        printaValor($id) {
            $num = document.getElementById($id);
            fetch('./api.php?funcao=alteraBanco&colunas=estoque&dados=35&tabela=produtos&where="id = 1"')



        }
    }
});

