FROM keinos/php8-jit:latest

USER root

#COPY . /app
#
#WORKDIR /app

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

#RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community mysqli php8-pdo pdo pdo_mysql php8-mysql
RUN apk add mysql-client
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql

#pdo pdo_mysql

COPY ./init.sh /init.sh
RUN chmod +x /init.sh

ENTRYPOINT ["sh", "/init.sh"]
