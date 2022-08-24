# Task Agile Application

<p align="justify">
Task Agile is a application like Trello, task management application. This project adopt Agile methodologies 
through the life-cycle and practice <b>Domain-Driven Design</b> and <b>Test-Driven Development</b>.
</p>

## Contents
* [Overview](https://github.com/gusrylmubarok/task-agile-web)
* [Stories](https://github.com/gusrylmubarok/task-agile-web/blob/main/documents/USERSTORIES.md)
* [Data Modeling](https://github.com/gusrylmubarok/task-agile-web/blob/main/documents/DATAMODELING.md)
* [Code Design](https://gusrylmubarok.medium.com/merancang-stabilitas-dan-ekstensibilitas-code-design-93873b933593)
* [REST API]()
* [Backend Side]()
* [Frontend Side]()
* [Monitoring]()
* [Deploying]()

## Installation
* Clone this project
```bash
git clone git@github.com:gusrylmubarok/task-agile-web.git
```
* Open project in your favorite `IDE` or `Text Editor`
* Configuration Database Server (recommendation use podman or docker)

podman container
```bash
podman run --name mysqldb --restart=always -e MYSQL_DATABASE='tast-agiledb' -e MYSQL_USER='your-user' -e MYSQL_PASSWORD='your-password' -e MYSQL_ROOT_PASSWORD='root' -p 3306:3306 docker.io/library/mysql
```
docker container
```bash
docker run --detach --name=mysqldb --restart=always -e MYSQL_DATABASE='tast-agiledb' -e MYSQL_USER='your-user' -e MYSQL_PASSWORD='your-password' -e MYSQL_ROOT_PASSWORD='root' -p 3306:3306 --volume=/root/docker/mysqldb/conf.d:/etc/mysql/conf.d mysql:latest 
```

* Run locally
```bash
mvn clean install build && mvn spring-boot:run
```

## TODO
- [x] Setup Project
- [ ] Make Frontend Side
- [ ] Make Backend Side

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/gusrylmubarok/task-agile-web/blob/main/LICENSE.md)

## References
- [Building Application with Spring 5 and VueJS 2](https://www.packtpub.com/free-ebook/building-applications-with-spring-5-and-vuejs-2/9781788836968)
- [Agile Manifesto](https://agilemanifesto.org/)
- [Agile Article: Indonesia](https://gusrylmubarok.medium.com/menyingkap-tabir-pengetahuan-metodologi-agile-37f40645ecf8)
