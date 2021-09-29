# workshop-back

Repositorie du backend pour le workshop

Langage utilisé: NodeJS

## Requêtes autorisées

### Récuperer l'ID
GET : https://api.tisamo.fr/workshop/getid

### Signaler

POST : https://api.tisamo.fr/workshop/report
ARGS : { id, url }

### Check le site
POST : https://api.tisamo.fr/workshop/getsite
ARGS : { url }
