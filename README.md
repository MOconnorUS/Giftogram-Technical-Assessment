# Giftogram-Technical-Assessment

# cURL requests
- Register:curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"email": "test2@gmail.com", "password": "Test", "first_name": "Jake", "last_name": "Kyle"}'
- Login: curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "matt@usync.gg", "password": "Test"}'
- View Message: curl "http://localhost:3000/view_messages?user_id_a=1&user_id_b=2"
- Send Message: curl -X POST http://localhost:3000/send_message -H "Content-Type: application/json" -d '{"sender_user_id": 2, "receiver_user_id": 3, "message": "Hahahaha"}'
- List All Users: curl "http://localhost:3000/list_all_users?requester_user_id=1"