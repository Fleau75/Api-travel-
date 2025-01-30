cd backend
npm install
node server.js

Inscription :

curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d '{
"email": "test@example.com",
"password": "password123"
}'

Connexion :

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{
"email": "test@example.com",
"password": "password123"
}'

Récupérer les informations de l’utilisateur connecté (nécessite un token) :

curl -X GET http://localhost:3000/auth/me \
 -H "Authorization: Bearer YOUR_JWT_TOKEN"

Lister les voyages de l’utilisateur connecté :

curl -X GET http://localhost:3000/trips \
 -H "Authorization: Bearer YOUR_JWT_TOKEN"

Créer un voyage :

curl -X POST http://localhost:3000/trips \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{
"destination": "Paris",
"startDate": "2025-06-01 12:00:00",
"endDate": "2025-06-10 12:00:00"
}'

3.  Items des voyages :

curl -X POST http://localhost:3000/items/TRIP_ID/ \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{
"name": "Chaussures de randonnée",
"quantity": 1,
"status": "not taken"
}'

Modifier un item :

curl -X PUT http://localhost:3000/items/ITEM_ID \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{
"name": "Sac à dos",
"quantity": 1,
"status": "pris"
}'

Supprimer un item :

curl -X DELETE http://localhost:3000/items/ITEM_ID \
 -H "Authorization: Bearer YOUR_JWT_TOKEN"

Remplace YOUR_JWT_TOKEN par un token valide obtenu via /auth/login.

Remplace TRIP_ID et ITEM_ID par les valeurs réelles obtenues via les endpoints correspondants.
