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