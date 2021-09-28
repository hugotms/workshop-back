# workshop-back

Repositorie du backend pour le workshop

Langage utilisé: NodeJS

## Requêtes autorisées

### Récuperer l'ID
GET : https://nywwfgl5hl.execute-api.eu-west-3.amazonaws.com/getid

### Signaler

POST : https://nywwfgl5hl.execute-api.eu-west-3.amazonaws.com/report
ARGS : { source, url }

### Check le site
POST : https://nywwfgl5hl.execute-api.eu-west-3.amazonaws.com/getsite
ARGS : { url }
