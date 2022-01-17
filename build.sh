#! /bin/sh
# Build image
docker build -t attanza/mysql-test .

# Push container
docker push attanza/mysql-test