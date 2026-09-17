# Giftogram-Technical-Assessment

# cURL requests
- Register:curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"email": "test@gmail.com", "password": "Test", "first_name": "John", "last_name": "Williams"}'
- Login: curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "matt@usync.gg", "password": "Test"}'
- View Message: curl -X GET http://localhost:3000/view_messages -H "Content-Type: application/json" -d '{"user_id_a": "8", "user_id_b": "2"}'
- Send Message: curl -X POST http://localhost:3000/send_message -H "Content-Type: application/json" -d '{"sender_user_id": 2, "receiver_user_id": 1, "message": "Lovely weather today."}'