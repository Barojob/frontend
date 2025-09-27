#!/bin/bash

CONTAINER_NAME="mysql"
DB_USER="root"
DB_PASS="pwd1234"
DB_NAME="mydb"

echo "'${DB_NAME}' 데이터베이스의 모든 테이블 초기화(TRUNCATE)를 시작합니다..."

COMMANDS=$(docker exec "$CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASS" -D"$DB_NAME" -NBe "SELECT CONCAT('TRUNCATE TABLE \`',TABLE_NAME,'\`;') FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${DB_NAME}'")

if [ -z "$COMMANDS" ]; then
    echo "💡 '${DB_NAME}'에 테이블이 없거나 조회에 실패했습니다. 작업을 종료합니다."
    exit 0
fi

docker exec "$CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASS" -D"$DB_NAME" -e "SET FOREIGN_KEY_CHECKS = 0; ${COMMANDS} SET FOREIGN_KEY_CHECKS = 1;"

if [ $? -eq 0 ]; then
    echo "성공: '${DB_NAME}'의 모든 테이블 데이터가 성공적으로 삭제되었습니다."
else
    echo "실패: 작업 중 오류가 발생했습니다. 컨테이너 이름이나 DB 접속 정보를 확인하세요."
fi
