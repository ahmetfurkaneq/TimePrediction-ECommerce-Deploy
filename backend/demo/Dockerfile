# 1. Build aşaması
FROM maven3.9.6-eclipse-temurin-17 AS builder

WORKDIR app
COPY . .
RUN .mvnw clean package -DskipTests

# 2. Run aşaması
FROM eclipse-temurin17-jdk-alpine

WORKDIR app
COPY --from=builder apptarget.jar app.jar

EXPOSE 8080
CMD [java, -jar, app.jar]