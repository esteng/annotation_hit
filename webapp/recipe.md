# Recipe for running 
- Mturk now fails because chunk.js files are missing
    - used to just ignore that 
- so I have to host the HIT as a script and import it using a `\<script\>` tag 
- this document describes how to set it up

## Setting up a github page for react 
- I followed this tutorial: https://github.com/gitname/react-gh-pages?tab=readme-ov-file
    - set up a project called `annotation_hit` that hosts the react app 
- the new HIT template no longer builds the project and copies in the files 
    - we now build the project to get the css
    - we copy in the css into the html file 
    - we copy in skeleton.html 
    - we then add a pointer to the js script, which is hosted via github pages  

## Building new versions 
- If you want to build new versions/update
    - go to `~/annotation_hit/webapp` and run `npm run build`
    - go to this dir and update the html template 
    - update the mturk project 
