FROM cgr.dev/chainguard/laravel:latest

WORKDIR /app

COPY . .

#descarta las dependencias no necesaria para correr la app (--no-dev --optimize-autoloader)
RUN composer install --no-dev --optimize-autoloader \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

