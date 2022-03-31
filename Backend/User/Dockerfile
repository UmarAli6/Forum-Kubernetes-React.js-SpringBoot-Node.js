FROM openjdk:15
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","--enable-preview","-jar","/app.jar"]