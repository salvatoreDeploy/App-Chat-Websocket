Documentação:
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
#Comandos:
->yarn add express
->yarn add @types/express -D
->yarn add typescript -D
->yarn tsc --init
->yarn add ts-node-dev -D

#Tecnologias:
->Express


#Ferramentas:
->Insominia;
->whimiscal;
