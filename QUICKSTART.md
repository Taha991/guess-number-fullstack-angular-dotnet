# 🚀 Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Check

- ✅ .NET 8 SDK installed? Run: `dotnet --version`
- ✅ Node.js 18+ installed? Run: `node --version`
- ✅ PostgreSQL running? (or use Docker)

## Step 1: Start PostgreSQL

**Option A: Using Docker**
```bash
docker run --name guessnumber-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=GuessNumberDB -p 5432:5432 -d postgres:15-alpine
```

**Option B: Local PostgreSQL**
- Make sure PostgreSQL is running
- Create database: `CREATE DATABASE GuessNumberDB;`

## Step 2: Start Backend API

```bash
cd GuessNumber.API
dotnet restore
dotnet run
```

✅ API should be running at `https://localhost:7000`
✅ Swagger UI available at `https://localhost:7000/swagger`

## Step 3: Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

✅ Frontend should be running at `http://localhost:4200`

## Step 4: Test the Application

1. Open `http://localhost:4200` in your browser
2. Click "Register" to create an account
3. Login with your credentials
4. Click "Start Game" and start guessing!

## Troubleshooting

**Port already in use?**
- Backend: Change ports in `Properties/launchSettings.json`
- Frontend: Angular will prompt to use a different port

**Database connection error?**
- Check PostgreSQL is running
- Verify connection string in `appsettings.json`
- For Docker: Use `Host=localhost` instead of `Host=postgres`

**CORS errors?**
- Make sure backend is running on port 7000
- Check CORS settings in `Program.cs`

## Using Docker Compose (All-in-One)

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- pgAdmin on port 5050
- API on port 7000

Then just start the frontend:
```bash
cd frontend
npm install
npm start
```

---

**Need help?** Check the main [README.md](README.md) for detailed documentation.

