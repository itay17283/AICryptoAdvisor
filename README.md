# AICryptoAdvisor
Git repository link: https://github.com/itay17283/AICryptoAdvisor.git
## URL:  
  
  
## Tech Stack
- **Frontend:** React + javascript  
- **Backend:** NestJS + TypeScript  
- **Database:** PostgreSQL  
- **Deployment:**  

## How to Run the Project Locally:
### Clone the repository
```bash
git clone https://github.com/itay17283/AICryptoAdvisor.git  
cd AICryptoAdvisor 

#Run the Backend  
cd server  
npm install  
*make sure that you downloaded to your computer pgadmin4 and posrgreSQL*
npm run start:dev  

#Run the Frontend  
cd client
npm install  
npm start  
```

The backend will run locally at: http://localhost:3000
  
The frontend will run locally at: http://localhost:3001  

important: if you want to use the API'S services for the "Lastest News" and for the "AI Market Insight" you should do the next steps:  
1. Create file with the name ".env" and put it in /AICryptoAdvisor/server  
2. Get API keys from the websites: CryptoPanic (news) and OpenRouter (AI insights)  
3. Enter these 2 fields in the ".env" file:  
   CRYPTOPANIC_TOKEN=*put your API key here*  
   OPENROUTER_API_KEY=*put your API key here*  
## Postgresql database  
- **Database name:** `AICryptoAdvisor`
- **Username:** `postgres`
- **Password:** `1234`  

## API Endpoints Overview  
All endpoints are available under the base URL:  

When working locally, use:  
`http://localhost:3000/`

All endpoints are available under the base URL:  
`https://AICryptoAdvisor.chan.net`

### Auth Endpoints (/auth)
- `POST /auth/signup`  
  sign up with full name, email and password. Returns userId, name and email.  

- `POST /auth/login`  
  Log in with username and password. Returns a JWT token.

### User Endpoints (/users)
- `GET /users`  
  Retrieve all users 

- `GET /users/id/:id`  
  Get a specific user by his id
  




