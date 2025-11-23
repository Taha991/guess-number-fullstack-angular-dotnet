FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["GuessNumber.API/GuessNumber.API.csproj", "GuessNumber.API/"]
RUN dotnet restore "GuessNumber.API/GuessNumber.API.csproj"
COPY . .
WORKDIR "/src/GuessNumber.API"
RUN dotnet build "GuessNumber.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GuessNumber.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GuessNumber.API.dll"]

