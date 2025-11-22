# AICryptoAdvisor
Git repository link: https://github.com/itay17283/AICryptoAdvisor.git
## URL  
https://ai-crypto-advisor-pi.vercel.app/
  
  
## Tech Stack
- **Frontend:** React + Javascript  
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

## Postgresql database  
- **Database name:** `AICryptoAdvisor`
- **Username:** `postgres`
- **Password:** `1234`  

## API Endpoints Overview  

All endpoints are available under the base URL:   
`https://aicryptoadvisor-backend.onrender.com/`  

When working locally, use:   
`http://localhost:3000/`  

### Auth Endpoints (/auth)
- `POST /auth/signup`  
  sign up with full name, email and password. Returns userId, name and email.  

- `POST /auth/login`  
  Log in with username and password. Returns a JWT token.

### User Endpoints (/users)
- `GET /users`  
  Retrieve all users. 

- `GET /users/id/:id`  
  Get a specific user by his id.  

### preferences Endpoints (/preferences)  
- `GET /preferences`  
  Retrieve all preferences.  

- `GET /preferences/userId/:id`  
  Get a specific preferences by userId.  

### feedback Endpoints (/feedback)  
- `GET /feedback`  
  Retrieve all feedbacks.  

- `GET /feedback/userId/:id`   
  Get feedbacks by userId.  

- `GET /feedback/:section`    
  Get feedbacks by section.  

## API important note:
if you want to use the API'S services for the "Lastest News" and for the "AI Market Insight" you should do the next steps:  
1. Create file with the name ".env" and put it in /AICryptoAdvisor/server  
2. Get API keys from the websites: CryptoPanic (news) and OpenRouter (AI insights)  
3. Enter these 2 fields in the ".env" file:  
   CRYPTOPANIC_TOKEN=*put your API key here*  
   OPENROUTER_API_KEY=*put your API key here*  




