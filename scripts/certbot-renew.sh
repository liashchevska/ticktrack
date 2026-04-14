#!/bin/bash

set -e

LOG_FILE="/home/deploy/ticktrack/logs/certbot-renew.log"

echo "[$(date)]" >> $LOG_FILE

cd /home/deploy/ticktrack

echo "CERTBOT RENEW" >> $LOG_FILE
/usr/bin/docker compose run --rm certbot renew >> $LOG_FILE 2>&1

echo "RESTART NGINX" >> $LOG_FILE
/usr/bin/docker compose restart nginx >> $LOG_FILE 2>&1

echo >> $LOG_FILE