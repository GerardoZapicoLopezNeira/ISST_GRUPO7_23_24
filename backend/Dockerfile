FROM openjdk:21
EXPOSE 9090
ADD target/spring-docker.jar spring-docker.jar
ENTRYPOINT ["java", "-jar", "spring-docker.jar"] 
