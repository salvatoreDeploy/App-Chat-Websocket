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
   -> A constante io acessa o metodo 'on' que realiza a conexão e a comunicação websocket mostrando uma mensagem e recebendo o id;

<!-- Conectando com websocket -->
   -> Verificamos no arquivo chat.js, onde podemos colocar um console.log(), para verificar se ao clicar no botão esta disparando algum evento;
   -> Em seguida redefinimos nossa estrutura de pasta e arquivos, onde criamos um arquivo http.ts, para armazenar o codigo que tera a estrutura para conexão dos protolos e conversão do html, assim podemos exportas ambas para uso;
   -> No nosso arquivo server.ts agora importamos o arquivo http, para utilizar a conexão assim tudo estando desacoplado;
   -> Dentro do arquivo chat.js, ja podemos trabalhar com os eventos, então criamos uma cosntante onde ela recebe a função io() que faz a comunicação entre as duas parte via websocket, e ja vemos via terminal a conexao e que ele fica escutando o lado do client;

<!-- Conexão lado Cliente -->
   -> A constante io acessando o metodo on passando os parametro de connect e fazendo uma arrow function em socket recebemos a constante socket se conectando e recebendo os parametros de primeiro acesso, e criadno uma interface para capturar dados que passamos como parametro ate podendo verificar no terminal a captura de dados vindo do websocket;
   -> Pós isso no arquivo chat.js contruimos o primeiro evento que vai receber, a função da conexao do io(), as contantes que vao receber os parametro vindo da conexao e apartir daki vamos emitir os dados a serem capturados assim retornando colocando funções de callback e error caso seja necessario essa tratativa;

<!-- Criando Tabela Conexao -->
   -> Seguindo o padrão mesmo padra de estrutura, criamos uma migration, uma entidade, um repository e um controlador;
   -> Na nossa migration, dessa vez usamos uma forma diferente, usamo uma queryrunner, e utilizamos uma função que cria e estrutura a forengeKey, sendo fora da estrutura de criação de tabela;
   -> No connectionsService criamos um create trazendo as tabelas que seria necssarios trabalhar os dados;

<!-- Conexão websocket cliente e banco de dados -->
   -> Dentro da nossa estrutura de conexao, trazemos os objetos de service do user e connection, para que ambos se interliguem, e compartilhems seus dados;
   -> Na estrutura de primera conexão, criamos constantes que vão receber os parametro que vai ser trazidos do objeto connectionsService, e seria uma interligação entre ambos bancos;
   -> Desestruturamos as contantes de text e email para estar recebendo os paramentros direto da interface;
   -> Agora para salvar a conexao com socket_id e seu user_id, usamos uma constante que vai receber atraves do userservice a função que percorre a tabela email verificando os dados;
   -> Apartir dai efetuamos os teste onde se não existir ele vai criar se existir ele vai retornar o socket acessando o id do mesmo;

<!-- Salvando dados websocket no banco de dados -->
   -> Apos esses passo vamos refatorar algumas parte e imcorparar outras, sendo elas no nosso connetionsService, vamos criar uma nova função findByUserId dentro da classe que recebe como parametro a coluna "user_id" e assim vai percorrer e verificar a tabela user_id, retornando a constante;
   -> Assim dentro do client, caso o user ja existir, para que não haja um novo registro toda vez que feixar ou alguem iniciar o supporte novamente, introduzimos a função que acabamos de cria onde ele vai verificar a coluna do user_id que eh uma das chaves, assim persistindo os dados atuais so atualizando o id do socket e não criando um registro novo;
   -> Tambem criamos uma variavel user_ id que inicia vazia e dentro do if caso não haja user, a variavel vai receber o user acessado novo id, caso seja o caso do else, a variavel vai recebr o user existente acessando o id, assim podemos trabalhar constante com a variavel;
   -> Neste mesmo else acoplamos um teste para se haver conexão ou não, caso não haja criamos uma nova, tendo sobreescrevemos com dados ja setado persistindo os dados retornando a contante;
   -> Criamos uma constante de messageService que vai receber o objeto do service da mensagem, onde ele vai criar a usando os parametro do text e do user_id assim persisntindo os dados na tabela do  banco de dados;

<!-- Desabilitando o support -->
   -> Descomentamos a funçao onload e vai estar trabalhando em conjuto com uma rota, que rebera os dados da tabela setings se o valor do chat sendo verdadeiro e falso;
   -> Dentro do nosso SettingsService, criamos um nova função sendo a findByUserName recebendo por parametro o 'username', criamos uma função que atraves do repositorio vai percorrer e trazer a propriedade username e dando um retorno da constante;
   -> No controlador da settings, trazemos essa função com o parametro de requisição e resposta, aonde vai ser contruida estas contante recebendo o dados do username, atraves dos params que são das rotas;
   -> Criamos constantes paras estar recebendo o objeto do settingsService, outra que vai estar acessando a propria funçao sendo a propriedade como parametro, retornando a resposta em json, da constante;
   -> Criamos uma rota via get que vai ter como a rota settings com o parametro de um username; que vai acessar nosso metodo findbyusername;
   ->Agora se mudarmos diretamente no banco o valor de chat nesse username, ele vai poder verificar se esta ativo o support ou não;
   -> Para podemros mudar tal funcionalidade se modificar manualmente no banco, criamos uma função dentro do nosso SettingsService que vai ser a update(), que vai receber como parametro o usarname e o chat usamos uma contante que vai receber o acesso do repository da classe, onde dentro dela podemos acessar uma outra função chamada createQueryBuilder, que nos permite criar uma query dentro da função, e passamos para ela query de atulizar uma tabela setando a coluna a ser modificada, com a clausula de filtro onde a propriedade deve ser igual ao parametro que esta chamdando esas função, em seguida a função de executar;
   -> Como de prache seguindo o fluxo partimos para o controlador da class, criando a função e estruturando  com parametro de requisição e resposta estruturando as contantes que vão recebr os dados atraves do params das rotas e o outro do corpo da requisição;
   -> Criamos constantes para instanciar o objeto, em seguida acessar a função update que vai ter os parametro das constantes username e chat, e a resposta vai ser o retorno em json da constante;
   -> Criamos uma rota com verbo put que é utilizado para update em banco de dado, a rota vai estar utilizando o metodo update;
   -> Dentro do insominia, criamos mais um arquivo acessando essa rota, onde passamos o json com chave do chat e o valor true para estar ativo o support e false não;

Aula #05

<!-- Trazer todas mensagens do usuario -->

<!-- Criar estrutura(pastas e arquivos) de admin -->

<!-- Conseguir verificar todas conexoes que os admin_id = null -->

<!-- Construir a vizualização de todos atendimentos que tiverem null -->

<!-- Contruir conexão entre atendente e clinte -->

<!-- Construindo a vizualização de mensagens atendente e cliente -->

<!-- Comunicação de envio e recebimento de mensagem cliente e atendente -->

<!-- Contruindo a parte visual da comunicação atendente e cliente (menssageiro atendente) -->

<!-- Contruindo a parte visual da comunicação atendente e cliente (menssageiro cliente) -->

<!-- Botão de enviar do lado do cliente e suporte recebendo o dado -->

<!-- Envio de mensagens -->

<!-- Conexão de mais clientes -->

<!-- Saida do cliente ja em suporte -->


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
->ejs
->socket.io
->mustach


#Ferramentas:
->Insominia;
->whimiscal;
->beekeeper;
