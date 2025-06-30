docker stop language-course-db
docker rm language-course-db
docker run -d --name language-course-db -p 34567:27017 --network language-course-editor_be mongo:8