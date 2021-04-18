#FROM chrisb9/php8-nginx:latest
FROM keinos/php8-jit:latest

USER root

EXPOSE 8080

#COPY . /app
#
#WORKDIR /app
RUN apk add --no-cache bash
# Install composer
RUN \
    echo '- Installing composer ...' && \
    EXPECTED_SIGNATURE="$(wget -q -O - https://composer.github.io/installer.sig)"; \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"; \
    ACTUAL_SIGNATURE="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"; \
    [ "$EXPECTED_SIGNATURE" != "$ACTUAL_SIGNATURE" ] && { >&2 echo 'ERROR: Invalid installer signature'; exit 1; }; \
    php composer-setup.php --quiet --install-dir=/bin --filename=composer && \
    composer --version && \
    rm composer-setup.php

#RUN apk add composer

#RUN apk add --no-cache --update --virtual buildDeps autoconf \
# && pecl install xdebug \
# && docker-php-ext-enable xdebug \
# && apk del buildDeps
RUN apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS

#RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community mysqli php8-pdo pdo pdo_mysql php8-mysql
RUN apk add mysql-client
RUN apk add --no-cache zip libzip-dev
RUN apk add --no-cache openssl-dev
#RUN apk add --no-cache openssl-dev pkg-config libssl-dev
RUN docker-php-ext-install zip

RUN set -ex \
	&& curl -L -o /usr/local/bin/pickle https://github.com/FriendsOfPHP/pickle/releases/download/v0.6.0/pickle.phar \
	&& chmod +x /usr/local/bin/pickle
RUN docker-php-ext-install mysqli pdo_pgsql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable pdo_mysql
#RUN mkdir -p /usr/src/php/ext/mongodb \
#    && curl -fsSL https://pecl.php.net/get/mongodb | tar xvz -C "/usr/src/php/ext/mongodb" --strip 1 \
#    && docker-php-ext-install mongodb
RUN pickle install mongodb && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongo.ini
#RUN echo "extension=mysql_pdo.so" >> /usr/local/etc/php/conf.d/mongo.ini
#RUN pecl upgrade mongodb-1.9.0 && docker-php-ext-enable mongodb && echo "extension=mongodb.so" >> /usr/local/etc/php/php.ini


#pdo pdo_mysql

COPY ./init.sh /init.sh
RUN chmod +x /init.sh

ENTRYPOINT ["sh", "/init.sh"]

WORKDIR /var/www
