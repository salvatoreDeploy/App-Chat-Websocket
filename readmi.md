Documentação:

Aula #01:

<!-- Criando o Servidor -->
 -> Primeiro criamos uma pasta src, e um arquivo server.ts, para abrigar nossas config de servidor;
 -> Sempre que haver os '...' quer dizer que nao estao criadas as tipagens daquela biblioteca, devemos criar as
 tipagens;
 -> Rodamos o comando para adicionar as tipagens com type, nome da biblioteca e em ambiente de desenvolvedor;
 -> Pós isso devemos executar o arquivo do node para inicializar o servidor, mas o node não entende o "import e from", que seria o import e export, entao para isso precisamos instalar tambem o typescript;
 -> Mudamos o strict no tsconfig para nao ficar verificando durante o desenvolvimento;
 -> Rodamos o comando do ts-node para ele traduzir e ficar responsavel por fazer a parte de import e export;
 -> No arquivo do package, incluimos um script com "nome", que sera atrelado ao script do ts-node-dev na pasta que criamos com server;
 -> Rodando agora o comando o yarn dev estartamos o servidor;

<!-- Criando as Rotas -->
 -> Temos os seguintes metodos:
    GET = Buscas;
    POST = Criar;
    PUT = Alterar;
    DELETE = Apagar;
    PATCH = Alterar informação especifica
 -> Dentro do metodo get, primeiro paramentro e nossa url, e como segundo eh o request e o response;
 -> Navegadores por padrao buscao rotas na url de metodo get, para usar rotas post devemos usar uma ferramenta insominia;

 Aula #02:

   <!-- Conhecendo os bancos de dados, criando e configurando o TypeORM -->
   -> Quando falamos de banco de dados, que vamos crialo devemos pensar em relacional ou não relacional;
   -> Partindo disso, na estrutura de node devemos instalar o drive do banco junto a nossa aplicação;
   -> Dentro da nossa aplicação podemos utilizar um drive de banco de dados pode ser nativo ex: Postgre ou não nativo como Knex, TypeORM, SequelizeORM
   -> Criamos uma conexao entre a aplicação com o ORM escolhido, assim ele faz um mapeamento entre o objeto da aplicação e as tabelas do banco de dados, assim construindo essa interação;
   -> Apos escolher o ORM fazemos as instalações necessarias, criamos o arquivo ormconfig.json, onde ficara as configuraçãoes necessarias para o banco de dados;
   -> Criamos, uma pasta database dentro src, com arquivo index, este arquivo vai conter, o import da função createConnection de dentro do typeorm, em seguida usamos essa função,
   -> Assim dentro do nosso server importamos esta pasta database;

   <!-- Migrations -->

   -> As migration são, historicos de tudo que foi ou sera rodado dentro do banco de dados;
   -> Criamos uma pasta dentro do nosso database, uma pasta para nossas migrations
   -> Usamos o comando para o typeorm criar a migration, na estrutura da mesma tesmo o up, que vai subir os dados para nossa tabela atraves do comando run, e o down vai reverter os dados da tabela com comando revert;
   -> Dentro do up, estruturamos o nome da tabela que queremos, com os nomes de cada coluna, seus tipos, e valores default que seria os valores padroes;
   -> Damos o comando run que é para inicializar a estrutura do up;
   -> A partir disso criamos uma pasta entities para abrigar o arquivo settings com as configuraçoes da tabela do nosso banco sendo suas entidades e suas anotações, assim criamos e exportamos esta classe;
   -> Para tratar o quesito do uuid, poderiamos deixar o proprio banco gerenciar isso, utilizando uma funcionalidade chamada 'generationStrategy', passando como padrao o uuid, mas acredita ser melhor o projeto ficar responsavel por trabalhar e tratar tais dados, assim adicionamos a biblioteca do uuid, e tambem as tipagens;
   -> Assim importamos tal biblioteca para dentro do arquivo que trata as settings do banco, escolhemos a versão melhor para uso, e podemos dar um apelido utilizando 'as' para trocar seu nome no projeto;
   -> Trazemos o contrutor da classe, assim toda vez q classe for instanciada, o contrutor fara um teste onde se o id for vazio ou seja falso ele vai criar um e atribuir ao atributo id;
   -> Precisamos tambem adcionar no nosso ormconfig, um script para mapear nossas entidades;

   <!-- Criar os repositorios -->
   
   -> Repositorios serião as classe responsaveis e fundamentais pela comunicação entre aplicação e banco de dados e sua manipulção, assim as classes ficam mais responsaveis;
   -> Criamos dentro de src a pasta 'repositories', para cada entidade cria um repositorio, ou seja uma classe;
   -> Dentro da pasta criamos uma classe 'SettingsRepository', ela extendera uma classe nativa a 'Repository', que tera como tipo nossa propria classe 'settings', depois importamos uma nova entidade para essa Repositori e atrelamos a entidade, por fim exportamos a classe;

   <!-- Criar Rotas -->

   -> Podemos comantar os metodos get e post que usamos no inicio para criar o servidor e sua rota;
   -> Dentro da raiz criamos um arquivo 'routes.ts' para rotas, importamos o Router do express, importamos nossa classe SettingsRepository do nosso repositorio;
   -> Criamos uma constante que vai receber a funcionalidade Router;
   -> Criamos a estrutura de Post, onde a constante acessa o metodo post passando por parametro nossa classe, o  'async'de request e response do node, assim criamos constantes que vamos receber, desestrurando as propriedades da nossa tabela, constante que vai receber o metodo 'getCustomRepository' usando como parametro nossa classe, por fim a contante que vai receber a contante anterior, acessando o metodo 'create' que vai criar as propriedades que queremos criar dentro dessa entidade;
   -> Pós isso usamos o 'await' para que constante acesse o metodo save para percistir no banco de dados;
   -> E para integirmos via json atraves do post return um 'response.json';
   -> Para que tudo isso se valide retornamos no arquivo server, para importamos routes do nosso diretorio proprio, incluindo o uso da rota e do json pelo express;
   -> Tipos de parametros:
         Routes Params => parametro de rotas
            ex: http://localhost:3333/settings/1 -> parametros depois da rota
         Query Params => filtros e busca
            ex: http://localhost:3333/settings/1?search=algumacoisa -> parametro de buscas
         Body Params => 
            ex: recebemos um json um objto => {

            }

   <!-- Criando o Controller -->

   -> Controllers e um dos MVC, reponsaveis por controlar interação e comunicação entre diferentes partes de um projeto, neste caso controlar e ser responsavel pela comunicação entre rotas e repositorios;
   -> Criamos uma pasta controllers, onde criamos uma classe 'SettingsController';
   -> Refaturamos a parte de rota, onde dividimos a resposabilidade com controlador onde colocamos as contante com os metodos para classe do controlador, assim na rota criamos uma constante que vai receber essa classe e os metodos;



#Comandos:
->yarn add express
->yarn add @types/express -D
->yarn add typescript -D
->yarn tsc --init
->yarn add -D ts-node-dev
->yarn add typeorm reflect-metadata sqlite3
->yarn typeorm migration:create -n CreateSettings
->yarn typeorm migration:run
->yarn add uuid
->yarn add @types/uuid -D

#Tecnologias:
->Express.js
->typeORM.js
->uuid.js


#Ferramentas:
->Insominia;
->whimiscal;
->beekeeper;
