### **Запуск Приложения**:

1. **Запустить команду для сборки и запуска контейнеров из корня приложения**:

```bash
docker compose up -d --build
```

2. **Зайти в контейнер приложения:**

```BASH
docker exec -ti tree-checkbox-node-1 bash
```

3. Внутри контейнера выполнить команду запуска webpack в режиме разработки:

```Bash
npm run serve
```
