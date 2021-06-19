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

Aula #03:
   <!-- Criando objeto service -->
   -> Começamos restruturando o projeto, criando um obejto de serviço, para que ele fique responsavel pela parte de criação dos nossos atributos e repositorios, pois é um padrao mais agradavel que não fique essa responsabilidade para controlador;
   -> Criamos a classe de serviço e tranferimos a parte de receber o repositorio, e ciar os atributos;
   -> Criamos uma interface onde os parametros são os atributos que serão criados, com suas tipagens;
   -> Na classe service, usamos o 'create()' desestruturando e recebendo os paramentro da intreface e associando a interface criada;

   <!-- Tratamento de erros -->
   -> Atribuimos a uma constante o acesso a um função 'findOne' onde a mesma faz um query basica de ler um dado por vez a query do atributo username seria : 'Select * from settings where username = "username limit 1"';
   -> Fazemos um teste usando 'if' na constante que criamos acima, onde se for veraddeiro significa q o dado existe, assim trazendo a função 'try' que tem caracterista de tratar erros assim a função traz o objeto 'Error' onde podemos atribuir um texto de aviso, então se o teste retorna falso, ele segue os blocos seguintes fazendo o salvamento no banco se não ele retorna a resposata do erro para camada que acessou o service que seria no caso a camada controller;
   -> Mas para camada controller receber esses dados e devolver para o front que seria o usuario criamos um bloco try tambem no controller onde teremos a constante que recebe a camada service e tambem o return que traz a resposta, que neste caso seria o sucesso na operação, e a função 'catch' vai receber a excessão que seria o erro, colocamos como parametro o 'err', que vai retornar a resposta com um parametro de erro, recebendo a chave 'message' e seu valor sera o texto que passamos para o 'try' da camada service;

   <!-- Criando tabela de Usuarios -->
   -> Como de inicio para cria uma tabela junto a sua migration usamos o comando yarn typeorm migration:create -n "nome da migration";
   -> Criamos a estrutura que queremos subir para o banco de dados, e o down e rodamos a migration;
   -> Seguindo o fluxo da estruturas, fazemos agora a criação das entidade da tabela users;
   -> Criar o repositorio usando a entidade como parametro;
   -> Criar service para essa entidade com a regra de negocio;
   -> Criando o service, a unica propriedade que vamos trazer é o email, executamos a nossa regra de negocio que seria:
      ->Verificar se usuario existe;
      ->Se não existir, criar e salvar;
      ->Se existir retornar o user
   -> Criamos o controller da classe, nossa unica difereça é que colocamos um retorno da classe como uma 'promisse' significando uma promessa de retorno desse tipo;

   <!-- Criando Tabela Menssagem -->
   -> Seguimos o mesmo fluxo de criação de classes e arquivos que ja vemos criado;
   -> O que temos diferente nesta parte e criação de relacao entre tabelas e colunas, onde expressamos a coluna e sua chave primaria;
   -> Tambem como podemos recebe um valor em certa coluna null, usamos a propriedade 'isNullable';
   -> Para contruir tal relação devemos criar uma chave estrangeira que sera rastreada pelo banco de dados para saber com qual coluna e tabela tera relação assim trazendo tal dado, sua estrutura é usar o 'foreignKeys' contruindo um array com as informações dessa relação, sendo referencia de Tabela e Coluna assim criando uma nova coluna, em seguida passamos parametros de segurança para caso a tabela principal a tabela pai seja deletada oq vai acontecer exemplos colocar os valores de volta a null ou um evento em cascade;
   -> Uma outra diferença seria na classe entitidades, onde devemos efetuar um 'JoinColunm' onde associamos as tabelas, tambem 'ManyToOne' onde ele seguinifica a relação sendo de muitos para um ou um para muitos, que nesse caso sera de muitos(menssagens) para um(usuario), por fim trazemos o objeto de relação direto para a entidade que vai se relacionar;
   -> Como fim de prache, efetuamos a criação da rota;
   -> Ao testar a funcionalidade, rodamos um teste com o admin_id como null, simbolizando o usuario, e outra vez com admin_id sendo o atendente respondendo;
   -> Para termos um id gerado para o admin, usamos um site de geração de uuid "www.uuidgenerator.net";

   <!-- Buscar mensagens do Usuario -->
   -> Aqui vamos trazer uma listagem de dados, que podemos ser perdido, ou uma consulta;
   -> Colocamos mais um serviço, na classe de services de mensagem, criamos uma função que tem uma constante que vai receber o repositorio acessando a função 'find' onde diferente do findOne que traz um objeto o find traz uma lista, do parametro desejado, assim retornando a constante, podemos tambem usanod 'where' na coluna uma relação e assim trazer todos os dados;
   -> Pós isso criamos mais uma funçao na camada de controller de message, onde essa funçao tera como padrao um request e response, com uma contante que vai um request inves de usar o body usara o 'param' que vai enviar pela url via get um parametro para receber o valor;
   -> Criamos a constante que vai receber a instancia do messageservice, então com outra contante recebendo a constante anterior acessandao a função que criamos como novo serviço na camada service;
   -> Nosso return sera um response com a contante 'list';
   -> Para rodar o serviço, antes adicionamos uma rota de message com metodo get que vai receber um parametro;
   -> Pós isso mexemos como restruturação, criamos um atributo em todas nossas classes de service, que recebe uma tipagem de repository e classe que esta sendo usada;
   -> Sendo private somente aquela classe podera acessar o metodo;
   -> Usamos o construtor para padronizar o acesso da função 'getCustomRepository' de cada classe, assim acessando atravez o metodo 'this' que significa acessar algo dentro do proprio objeto;
   
Aula #04:

<!-- Construindo o protocolo Websocket -->
   -> Utilizaremos o socket.io, assim instalamos o mesmo no projeto, em seguida instalamos suas tipagens;
   -> Importamos as funçoes necessario tanto do http que nativo do node, quanto as de dentro do socket;
   -> Atribuimos a uma constante a criação da conexão usando como parametro nosso app que ja recebia a conexao do servido via express do node, está contante sera nossa conexao 'http';
   -> Com isso numa nova constante instanciamos o novo objeto de servidor, que usamo como parametro no http, 
   assim ele se torna a conexao websocket;
   -> Pós isso usamo a ultima contante para realizar a conexão com os dois protocolos via 'socket';
   -> Como tinhamos uma conexao ja rodando via expres, agora acessamos no listen para acessar a porta 3333, a constante que recebe o app, sendo ele http;

<!-- Criando uma forma de acessar a pasta public para usar view html -->
   -> Importando o 'path' do node podemos estar trabalhando com caminhos de arquivos dentro de suas funções;
   -> Entao usando funções podemos passar um novo caminho para o node, onde ele ira buscar views, mas precisamos converte para html, assim trazemos uma novo biblioteca q é a 'ejs', para q possamos converter e ele enterder nosso arquivos que serão renderizados;
   -> Setamos isso atraves do node, na sua engine que o arquivo sera para html, assim pegamos atraves de uma rota get na url, onde no browser ele fara uma requisição e sua resposta sera atraves do 'render', renderizando uma view que estamos usando atraves do caminho do arquivo;
   -> A contante io acessa o metodo 'on' que realiza a conexão e a comunicação websocket mostrando uma mensagem e recebendo o id;

<!-- Conectando com websocket -->
   -> Verificamos no arquivo chat.js, onde podemos colocar um console.log(), para verificar se ao clicar no botão esta disparando algum evento;
   -> Em seguida redefinimos nossa estrutura de pasta e arquivos, onde criamos um arquivo http.ts, para armazenar o codigo que tera a estrutura para conexão dos protolos e conversão do html, assim podemos exportas ambas para uso;
   -> No nosso arquivo server.ts agora importamos o arquivo http, para utilizar a conexão assim tudo estando desacoplado;
   -> Dentro do arquivo chat.js, ja podemos trabalhar com os eventos, então criamos uma cosntante onde ela recebe a função io() que faz a comunicação entre as duas parte via websocket, e ja vemos via terminal a conexao e que ele fica escutando o lado do client;

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
->yarn typeorm migration:create -n CreateUsers
->yarn typeorm migration:run
->yarn add socket.io
->yarn @types/socket.io -D
->yarn add ejs
->yarn add socket.io-client

#Tecnologias:
->Express.js
->typeORM.js
->uuid.js
->socket.io


#Ferramentas:
->Insominia;
->whimiscal;
->beekeeper;
