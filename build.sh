#!/usr/bin/env sh
# sh statt bash, weil wir im docker image kein bash haben

echo Building digitalisierung at school project
npm install -g npm || exit 1
cd frontend || exit 1

echo Installing frontend...
npm i || exit 1
echo Frontend installed

echo Building frontend...
rm -rf ./build/
npm run build || exit 1
echo Frontend build

cd ../backend/ || exit 1

echo Installing backend...
npm i || exit 1
echo Backend installed

echo Building backend...
npm run build || exit 1
echo Backend build

cd ../ || exit 1

echo Completing build...
rm -rf build/
mkdir build/ || exit 1
cp -r frontend/build build/client/ || exit 1
cp -r backend/build build/src/ || exit 1
cp -r backend/node_modules/ build/node_modules/ || exit 1
echo Build complete

