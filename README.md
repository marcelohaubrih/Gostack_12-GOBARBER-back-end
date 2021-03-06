## Back-End GoStack APP GoBarber

### ♠ Criando arquivo de Migrations
- yarn typeorm migration:create -n CreateAppointments
OBS: Só edite os arquivos de migrations se não foi enviado os códigos para produção
Caso seja necessário editar um arquivo de migrations execute o comando (yarn typeorm migration:revert)

### ♣ Executando as Migrations
- yarn typeorm migration:run


### ♦ Criando imagem docker e Subindo a imagem

Para criação da maquina API apenas com o comando:
  - docker build -t mhcoyote/api_gostack:1.0 .    (Gera a imagem da maquina)
  - docker run --rm -it  -p 3001:3001/tcp mhcoyote/api_gostack:1.0
  - docker push mhcoyote/api_bobarber:1.0

Para Execução da API e DB juntos executar:
  - docker-compose up
  - docker-compose up --build (Para recriar as imagens com as alterações)

Versão 1.0:

## ⚙ Disponível as seguintes rotas
- [x] routes.use('/appointments', appointmentsRouter);
- [x] routes.use('/users', usersRouter);
- [x] routes.use('/sessions', sessionsRouter);
- [x] routes.use('/password', passwordRouter);
- [x] routes.use('/profile', profileRouter);
---
> # Anotações de Desenvolvimento
>Funcionalidades macro

>## Recuperação de senha
>>**RF (Requisitos Funcionáis)**

 - [x] O usuário deve poder recuperar sua senha informando o email;
 - [x] O usuário deve receber um email com instruções de recuperação de senha;
 - [x] O usuário deve poder resetar sua senha;

>>**RNF (Requisitos não Funcionais)**

 - [x] Utilizar mailtrap para teste de emails em ambiente de dev;
 - [x] Utilizar Amazon SES para envios em produção;
 - [x] O envio deve acontecer em segundo plano (background job);

>>**RN (Regras de Negócios)**

 - [x] O link enviado por email para resetar senha, deve expirar em 2h;
 - [x] O usuário precisa confirmar nova senha ao resetar sua senha;
---
>## Atualização do perfil
>>**RF**

 - [x] O usuário deve poder atualizar seu nome, email e senha;

>>**RN**

 - [x] O usuário não pode alterar seu email para um email já cadastrado;
 - [x] Para atualizar sua senha, o usuário deve informar sua senha antiga;
 - [x] Para atualizar sua senha, o usuário precisa confirmar a nova senha;
---
>## Painel do Prestador
>>**RF**

 - [x] O prestador deve poder listar seus agendamentos de um dia específico;
 - [x] O prestador deve receber uma notificação sempre que houver um novo agendamento;
 - [x] O prestador deve poder visualizar as notificações não lidas;

>>**RNF**

 - [x] Os agendamentos do prestador no dia devem ser armazenados em cache;
 - [x] As notificações do prestador devem ser armazenadas no mongoDB;
 - [x] As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

>>**RN**

 - [x] A notificação deve ter um status de lida ou não lida para que o prestador possa controlar
---
>## Agendamento de serviços
>>**RF**

 - [x] O usuário deve poder listar todos os prestadores de serviço cadastrado;
 - [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
 - [x] O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
 - [x] O usuário deve poder realizar um novo agendamento com um prestador;

>>**RNF**

 - [ ] A listagem de prestadores deve ser armazenada em cache;

>>**RN**

 - [x] Cada agendamento deve furar 1h exatamente;
 - [x] Os agendamentos devem estar disponíveis entre 8h as 18h (Primeiro as 8h, Último as 17h);
 - [x] O usuário não deve agendar um um horário já ocupado;
 - [x] O usuário não pode agendar em um horário que já passou;
 - [x] O usuário não pode agendar serviço consigo mesmo;
