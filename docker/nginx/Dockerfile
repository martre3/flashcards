FROM khromov/alpine-nginx-php8:latest
#FROM chrisb9/php8-nginx:latest

USER root

#COPY . /app
#
RUN apk add --no-cache bash
RUN apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS
RUN apk add --no-cache zip libzip-dev
#RUN docker-php-ext-install zip
#WORKDIR /app
#RUN apk add --update --virtual build_deps bash gcc g++ autoconf make openssl-dev pcre-dev
#RUN apk add --no-cache bash php-pear
# Install composer
RUN set -ex \
	&& curl -L -o /usr/local/bin/pickle https://github.com/FriendsOfPHP/pickle/releases/download/v0.6.0/pickle.phar \
	&& chmod +x /usr/local/bin/pickle

#RUN wget -P /etc/ssl/ -O cert.pem http://curl.haxx.se/ca/cacert.pem
#RUN pecl channel-update pecl.php.net/package
#RUN ls /etc/ssl

#RUN sed -i 's|$PHP -C -n -q |$PHP -C -q |' /usr/bin/pecl install mongodb
#RUN pecl install mongodb
RUN pickle install mongodb

#WORKDIR /var/www
