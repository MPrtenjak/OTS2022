@setlocal

@dotnet build pozdrav\pozdrav.csproj /p:Version=%1 /p:DeployOnBuild=true /p:PublishProfile=\pozdrav\Properties\PublishProfiles\FolderProfile.pubxml
@if %errorlevel% neq 0 exit /b %errorlevel%
