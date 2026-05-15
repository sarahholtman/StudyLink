# StudyLink

StudyLink is a web app that helps students find and join study groups for their courses. Users can create an account, add their courses, search for study groups, join groups, and view their joined groups from the dashboard.

This version was built as a prototype for the current project phase. The backend uses Spring Boot with a MySQL database, and the frontend uses static HTML, CSS, and JavaScript pages.

## Features

- User registration
- Basic prototype sign-in flow
- Dashboard for users
- Add and view user courses
- Search for study groups by school, course/program name, or course code
- Join study groups
- View joined study groups from the dashboard
- Backend support for group messages
- Early notification/session model structure

## Tech Used

- Java 21
- Spring Boot
- Spring Data JPA
- MySQL
- Maven Wrapper
- HTML, CSS, and JavaScript

## Project Structure

The main Spring Boot project is inside the `studylink` folder.

Main folders and files:

- `src/main/java/com/studylink/controller` — handles API requests
- `src/main/java/com/studylink/model` — contains the entity/model classes
- `src/main/java/com/studylink/repository` — contains database repositories
- `src/main/java/com/studylink/service` — contains the main application logic
- `src/main/resources/static` — contains the frontend HTML, CSS, and JavaScript files
- `src/main/resources/application.properties` — contains local database settings
- `pom.xml` — Maven project configuration

## Setup

Before running the project, make sure you have:

- Java 21
- MySQL
- A terminal or IDE that can run the Maven Wrapper

Create a MySQL database called `studylink`:

```bash
mysql -u root -p -P 3006 -e "CREATE DATABASE IF NOT EXISTS studylink;"
```

The database connection is configured in:

```text
studylink/src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3006/studylink
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Update the port, username, or password if your MySQL setup is different.

## Running the App

From the main project folder, go into the Spring Boot project:

```bash
cd studylink
```

On Mac or Linux, the Maven Wrapper may need executable permission:

```bash
chmod +x mvnw
```

Then run the app:

```bash
./mvnw spring-boot:run
```

If there is a permissions issue, you can also run:

```bash
sh ./mvnw spring-boot:run
```

On Windows, use:

```bash
mvnw.cmd spring-boot:run
```

Once the app is running, open:

```text
http://localhost:8080/index.html
```

## Main Pages

The frontend pages are located in:

```text
studylink/src/main/resources/static
```

Main pages:

- `index.html` — landing page
- `register.html` — create an account
- `login.html` — sign in page
- `dashboard.html` — user dashboard
- `study-groups.html` — search, create, and join study groups
- `my-courses.html` — add and view courses
- `account.html` — account page

## Backend Overview

The backend is organized into controllers, services, repositories, and models.

The main backend areas are:

- Account registration and prototype sign-in
- User courses
- Study groups
- Group memberships
- Messages

Most backend routes are under `/api/...`.

The project also includes some early model/service work for notifications and sessions, but those areas are not fully connected through controllers or the frontend yet.

## Running Tests

From inside the `studylink` folder, run:

```bash
./mvnw test
```

If needed, use:

```bash
sh ./mvnw test
```

The MySQL database may need to be running for the tests to pass.

## Notes

- This project is a prototype for the current development phase.
- Authentication is still basic and should be improved in a future version.
- The current frontend sign-in flow is not production-ready and should be updated to fully validate user credentials.
- Passwords should be secured with hashing before the app is used in a real environment.
- The messaging backend exists, but a full frontend messaging interface is not complete yet.
- Notification and session-related features are still incomplete or partially implemented.
- The project is currently set up for local development with MySQL.

## Future Work

- Improve the messaging system
- Add real-time communication for group messages
- Strengthen login and authentication security
- Improve frontend responsiveness
- Expand notification features
- Add profile editing
- Deploy the application to a cloud platform
