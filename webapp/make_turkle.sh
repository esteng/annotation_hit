#!/bin/bash
# run deploy script 
npm run deploy

# add css 
echo "<style type=\"text/css\">" > anno-app-turkle.html
cat build/static/css/main.*.css >> anno-app-turkle.html
echo "</style>" >> anno-app-turkle.html

cat skeleton.html >> anno-app-turkle.html

## cat the scripts into the html
main_file=$(basename $(ls build/static/js/main.*.js))

echo ${main_file} 
echo "<script type=\"text/javascript\" src=\"https://esteng.github.io/annotation_hit/static/js/${main_file}\">" >> anno-app-turkle.html
echo "" >> anno-app-turkle.html
echo "</script>" >> anno-app-turkle.html

echo "DONE"
