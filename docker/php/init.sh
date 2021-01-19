#!/bin/bash
set -e

echo "[info] Waiting for mysql"
until mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD" &> /dev/null
do
  printf "."
  sleep 1
done

echo -e "[info] mysql ready"

if [ -f /var/www/composer.json ] && [ ! -d /var/www/vendor ]; then
    echo "[info] Running composer"
    composer install --no-dev --optimize-autoloader --working-dir=/var/www
fi

echo "[info] generating key"
php artisan key:generate

echo "[info] Changing permissions for storage/"
chmod -R 777 /var/www/storage/framework /var/www/storage/logs /var/www/storage/app

echo "[info] Waiting for mysql"
sleep 10

echo "[info] Migrating database"
php /var/www/artisan migrate --force || true

echo "Run: $@"
exec "$@"
