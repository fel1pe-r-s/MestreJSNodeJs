# 🌡️ Future Tasks: Weather Dashboard (Gdash)

## 1. Climate Logs API
**Prompt**: "In the NestJS backend, create a \`WeatherLogsModule\`. Implement a \`GET /weather/logs\` endpoint that queries the MongoDB \`weather\` collection. Add filters for \`city\` and \`date_range\`. Use Mongoose for the query."

## 2. Health Monitoring
**Prompt**: "Implement a global health check at \`GET /health\`. Use NestJS Terminus to check: 1. MongoDB connectivity. 2. RabbitMQ heartbeat. 3. Disk/Memory usage. Return a 200 OK only if all critical services are healthy."

## 3. Worker Robustness
**Prompt**: "Update the Go Worker to handle RabbitMQ reconnection logic. Use a backoff strategy to ensure that if the RabbitMQ container restarts, the worker reconnects automatically without crashing."
