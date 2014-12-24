#!/bin/bash

cd mjpg_streamer/mjpg-streamer/mjpg-streamer
./mjpg_streamer -i "./input_uvc.so -r 1280x720" -o "./output_http.so -w ./www" &> /dev/null &
cd ../../../node
sudo node interface.js