#!/bin/bash

set -e

LOG_FILE="/home/deploy/ticktrack/logs/cleanup.log"

cd /home/deploy/ticktrack

echo "[$(date)]" >> $LOG_FILE
#  -f /home/deploy/ticktrack/docker-compose.yml
/usr/bin/docker compose run --rm backend python manage.py cleanup >> $LOG_FILE 2>&1

echo >> $LOG_FILE