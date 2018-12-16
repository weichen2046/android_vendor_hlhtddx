#!/usr/bin/env bash

if [ -z "$ANDROID_PRODUCT_OUT" ]; then
  echo "\$ANDROID_PRODUCT_OUT don't defined, did you for setup and lunch Android build environment?"
  exit 1
fi

ng build --output-path $ANDROID_PRODUCT_OUT/http_dist
