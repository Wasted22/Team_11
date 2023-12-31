# Team_11

**Описание**
> Проект команды №11, который представляет из себя маркетплейс с несколькими позициями и страницей команды!

**Установка**
- Убедитесь, что у Вас установлен "[Git desktop](https://desktop.github.com/)" и "[Docker desktop](https://www.docker.com/products/docker-desktop/)" 
- С помощью Git desktop клонируйте репозиторий используя ссылку ``` https://github.com/Wasted22/Team_11.git ```
- В командной строке перейдите в папку с клонированным проектом
- Впишите в командную строку команду ``` docker build -t market . ```
- Введите команду ``` docker run -p 8080:80 -d market ```

**Альтернативная установка**
- Убедитесь, что у Вас установлен "[Docker desktop](https://www.docker.com/products/docker-desktop/)"
- Введите команду ``` docker pull j3ckj/market_team11 ```
- Введите команду ``` docker run -p 8080:80 -d j3ckj/market_team11 ```
