# Introdução

### Instalação

Primeiro devemos instalar algumas dependências em nossa máquina, como: PHP 5.6, apache2 e o Mysql:

	$ sudo apt install php5.6
	$ sudo apt install apache2
	$ sudo apt install mysql-server

Agora, iremos configurar o Mysql definindo o usuário e senha para entrada.

### Configuração do banco

Criaremos uma nova base de dados chamada 'banco' da seguinte forma:

	$ mysql -u root -p
	create database banco;

Para importarmos as tabelas e dados para a nova base de dados, devemos fazer o seguinte:

	banco < tabela.sql

Sendo tabela.sql o diretório e nome do arquivo onde se encontra os mesmos.

Feito as configurações dentro do banco, iremos ir em `/config/conexao.php` onde, nas linhas 4 e 5 devemos informar o usuário e senha do banco, respectivamente.

### Organização das pastas

A pasta `assets` ficam os scripts Javascript's e estilos CSS3.
Na pasta `config` é onde fica a configuração de conexão com o banco de dados.
Na `/controller` são os controladores que fazem a ligação entre as models e as views.
As `models` é a pasta onde ficam as `querys` que fazem a comunicação e requisições do banco.
As `views` guardam o `HTML` da aplicação.

# Aplicação

Ao entrar em `localhost/SoftExpert` no navegador, seremos redirecionados para a página de login que ao efetuarmos com o login `admin` e senha `admin`, definidas no banco, entraremos dentro da aplicação Mercado, onde teremos acesso à visualização dos produtos do mercado, juntamente com as opções de vender, editar, e excluir os produtos.

No menu esquerdo teremos a opção `Cadastrar`, onde tal opção nos leva para a página de criação de produtos e categorias.

# Conclusão

### Proposta de melhorias

+ Melhorias em questões de segurança
+ A velocidade e performance do site
+ Organização e "clean code" do mesmo
+ Funcionalidades adicionais como exclusão e alteração dos tipos de categoria
+ Adição da aba "Funcionários" para organização e separação de taferas para cada

### Finalização

Um dos principais objetivos foi desenvolver um site que permite uma boa visualização, organização e com uma estrutura clara, melhorando a experiência do usuário. Em questões de segurança e clean code, ficou algo aberto para melhorias. Não levei em conta usar Vue Cli, pois acredito que para um projeto de tal tamanho, não teria relevância. Com mais tempo, poderia sim utilizar Vue Cli e utilizar componentes do Vue para assim, ficar um código de melhor entendimento.
Gostei da experiência que o projeto me trouxe, juntamente com a pressão de tempo para finalização.

# Links e Contato

+ [LinkedIn](http://linkedin.com/in/joão-lucas-cardoso-87398717b)
+ [GitHub](https://github.com/JoaoCardoso02)
+ joaolucas.cardoso02@gmail.com
