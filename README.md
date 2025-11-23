# 🎯 Guess The Number - Full Stack Application

A modern full-stack application built with Angular and .NET 8 Web API, featuring a number guessing game with user authentication, leaderboards, and best score tracking.

## 🚀 Features

- **User Authentication**: JWT-based registration and login
- **Number Guessing Game**: Guess a number between 1-43 with hints (higher/lower)
- **Best Score Tracking**: Personal best scores saved per user
- **Leaderboard**: Global leaderboard showing top players
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Docker Support**: Full containerization with docker-compose

## 🛠️ Tech Stack

### Backend
- .NET 8 Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt for password hashing

### Frontend
- Angular 17
- TypeScript
- SCSS
- RxJS

## 📋 Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- PostgreSQL (or use Docker)
- Docker & Docker Compose (optional, for containerized deployment)

## 🔧 Setup Instructions

### Backend Setup

1. **Navigate to the API directory:**
   ```bash
   cd GuessNumber.API
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Update connection string** in `appsettings.json` if needed:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=GuessNumberDB;Username=postgres;Password=postgres"
   }
   ```

4. **Run database migrations** (EF Core will create the database automatically):
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
   
   Or simply run the application - it will create the database automatically using `EnsureCreated()`.

5. **Run the API:**
   ```bash
   dotnet run
   ```
   
   The API will be available at `https://localhost:7000` or `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API URL** in `src/environments/environment.ts` if your backend runs on a different port:
   ```typescript
   apiUrl: 'https://localhost:7000'
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```
   
   The app will be available at `http://localhost:4200`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - pgAdmin on port 5050
   - .NET API on ports 7000/7001

2. **Access services:**
   - API: `http://localhost:7000`
   - pgAdmin: `http://localhost:5050` (admin@admin.com / admin)

3. **Stop services:**
   ```bash
   docker-compose down
   ```

### Building Individual Docker Images

**Backend:**
```bash
cd GuessNumber.API
docker build -t guessnumber-api .
docker run -p 7000:80 guessnumber-api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Game
- `POST /api/game/start` - Start a new game (requires authentication)
- `POST /api/game/guess?gameSessionId={id}` - Make a guess (requires authentication)

### User
- `GET /api/user/best-score` - Get current user's best score (requires authentication)
- `GET /api/user/leaderboard` - Get leaderboard (requires authentication)

## 🌐 Production Deployment

### Backend Deployment (AWS/Render)

1. **Set environment variables:**
   - `ConnectionStrings__DefaultConnection`: Your PostgreSQL connection string
   - `JwtSettings__SecretKey`: A secure random key (at least 32 characters)
   - `JwtSettings__Issuer`: Your API issuer name
   - `JwtSettings__Audience`: Your API audience name

2. **For AWS:**
   - Use AWS RDS for PostgreSQL
   - Deploy API to AWS ECS or EC2
   - Update CORS settings in `Program.cs` for your frontend domain

3. **For Render:**
   - Create a PostgreSQL database
   - Deploy as a Web Service
   - Set environment variables in Render dashboard

### Frontend Deployment

**Option 1: AWS S3 + CloudFront**
```bash
cd frontend
npm run build
# Upload dist/guess-number-frontend/* to S3 bucket
# Configure CloudFront distribution
```

**Option 2: Render Static Site**
```bash
cd frontend
npm run build
# Deploy dist/guess-number-frontend to Render
```

**Important:** Update `environment.prod.ts` with your production API URL:
```typescript
apiUrl: 'https://your-production-api-url.com'
```

## 🎮 How to Play

1. **Register/Login**: Create an account or login
2. **Start Game**: Click "Start Game" to begin
3. **Guess**: Enter a number between 1 and 43
4. **Get Hints**: The game will tell you if you need to go higher or lower
5. **Win**: When you guess correctly, your score (number of attempts) is saved
6. **Compete**: Check the leaderboard to see how you rank!

## 📁 Project Structure

```
guess-number-fullstack-angular-dotnet/
├── GuessNumber.API/          # .NET 8 Web API
│   ├── Controllers/          # API controllers
│   ├── Data/                 # DbContext
│   ├── DTOs/                 # Data transfer objects
│   ├── Models/               # Entity models
│   ├── Services/             # Business logic
│   └── Program.cs            # Application entry point
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   ├── services/     # Angular services
│   │   │   ├── guards/       # Route guards
│   │   │   └── interceptors/ # HTTP interceptors
│   │   └── environments/     # Environment configs
│   └── package.json
├── docker-compose.yml        # Docker compose configuration
└── README.md
```

## 🔒 Security Features

- Password hashing with BCrypt
- JWT token-based authentication
- CORS configuration
- Input validation
- SQL injection protection (EF Core parameterized queries)

## 🐛 Troubleshooting

**Database connection issues:**
- Ensure PostgreSQL is running
- Check connection string in `appsettings.json`
- Verify database credentials

**CORS errors:**
- Update CORS policy in `Program.cs` with your frontend URL
- Ensure API and frontend URLs match in environment files

**JWT token issues:**
- Verify JWT secret key is set correctly
- Check token expiration settings
- Ensure token is being sent in Authorization header

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Guessing! 🎯**

