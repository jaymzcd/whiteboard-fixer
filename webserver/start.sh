#!/bin/bash

source ~/.virtualenvs/whiteboard/bin/activate;
kill -9 $(pgrep -f "localhost:5000");
nohup python app.py&
