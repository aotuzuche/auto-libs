#!/bin/bash

echo 'publish with proxy:'
git config --global http.https://github.com.proxy
git config --global https.https://github.com.proxy
yarn np
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
