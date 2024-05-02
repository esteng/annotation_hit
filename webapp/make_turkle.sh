#!/bin/bash
# npm run-script build

echo "<style type=\"text/css\">" > anno-app-turkle.html
cat build/static/css/main.*.css >> anno-app-turkle.html
echo "</style>" >> anno-app-turkle.html

cat skeleton.html >> anno-app-turkle.html

## cat the scripts into the html
main_file=$(ls ~/annotation_hit/webapp/build/static/js/main.*.js)
echo "<script type=\"text/javascript\" src=\"https://esteng.github.io/annotation_hit/${main_file}\">" >> anno-app-turkle.html
# cat build/static/js/*.chunk.js >> anno-app-turkle.html
# echo "" >> anno-app-turkle.html
# cat build/static/js/main.*.js >> anno-app-turkle.html
# echo "" >> anno-app-turkle.html

# cat build/static/js/bundle.js >> anno-app-turkle.html
echo "" >> anno-app-turkle.html

echo "</script>" >> anno-app-turkle.html
#
echo "DONE"