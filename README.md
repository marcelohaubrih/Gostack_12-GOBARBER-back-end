## Back-End GoStack APP GoBarber

### Criando arquivo de Migrations
- yarn typeorm migration:create -n CreateAppointments
OBS: Só edite os arquivos de migrations se não foi enviado os codigos para produção
Caso seja nescessário editar um arquivo de migrations execute o comando (yarn typeorm migration:revert)

### Executando as Migrations
- yarn typeorm migration:run