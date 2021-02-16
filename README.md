# Country Profiles

Application allows to view, insert, delete and update countries. Frontend has been developed using AngularJS and for backend it has been use Spring Boot.

## How to run
### Run application backend
```sh
git clone https://github.com/HansikaPerera/pearson-interview-backend.git
cd pearson-interview-backend
mvn spring-boot:run
```
This will deploy spring rest API at http://localhost:8080/rest/v2

### Run application frontend
 ```sh
git clone https://github.com/HansikaPerera/pearson-interview-frontend.git
cd pearson-interview-frontend
npm install
ng serve
```
This will start the frontend at http://localhost:4200
 
## Notes
* Application uses H2 in-memory database to store countries and at the moment it doesn't persist data to disk.
