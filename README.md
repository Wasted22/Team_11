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

**Паттерны**

![Class diagram](https://www.planttext.com/api/plantuml/png/XL4zQyCm4DtrAmvFzf20rq0WeUtGeP2XeRDg7RP0EWdfF1JZ_rvzE27jq6xtteDtxzwT8il0ipL2i6Q3y8xIzZtiuCd86E5Pop58AuGO2Zvx3ui0sE_X4fp7m1fZGedQ0HgqI1oh_eOyENKN1qUHmpom2srto4QLbdID-86VlkqAeKdpmrXYO4pCUijmSNx-8uNFygigSqoHyiRuEr-Mc3MD6s39M2Rh55PkoQGUriqmfPSqRDeaIHdSR8sEZ7H3jfxzRmTBiNsfaTRKI3dhv-P9ApmRSz_TTl3OKMea_wFf6t378pHMqbTJVLB1unXmJ3wEX3WXgVJaRm00)