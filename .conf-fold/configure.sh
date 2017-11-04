pwd
yarn init -y
#Instalar gulp-cli
yarn global add gulp-cli 
yarn add gulp-cli gulp --dev
#Instalar soporte de autoprefijos
yarn add gulp-autoprefixer --dev

#Instalar soporte para sass
yarn add gulp-sass --dev

#Instalar soporte para pug
yarn add gulp-pug --dev

#Instalar soporte para pug
yarn add gulp-pug --dev

#Instalar gulp-rename
yarn add gulp-rename --dev


# Instalar cmp para svg
yarn add gulp-svg-sprites --dev


#Instalar soporte para la creacion de maps
yarn add gulp-sourcemaps --dev

#Instalar soporte pra em6

yarn add gulp-babel babel-core babel-preset-es2015 babel-preset-stage-2 --dev

yarn add gulp-watch-dir
#browser sync
yarn global add browser-sync

yarn add browser-sync --dev

#copiar gulpfile
cp ./.conf-fold/gulpfile.js gulpfile.js

#copiar estructura
rm -rf ./dev
cp -rf ./.conf-fold/dev ./

#copiar ignore

cp ./.conf-fold/.gitignore .gitignore


