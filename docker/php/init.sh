#!/bin/bash
set -e

cd ./server

echo "[info] generating key"
php artisan key:generate
pecl config-set php_ini /etc/php.ini

echo "[info] Changing permissions for storage/"
chmod -R 777 /var/www/server/storage/framework /var/www/server/storage/logs /var/www/server/storage/app

sleep 5

echo "[info] Migrating database"
php artisan migrate --force || true

php artisan serve --host=0.0.0.0 --port=8080

echo "Run: $@"
exec "$@"
