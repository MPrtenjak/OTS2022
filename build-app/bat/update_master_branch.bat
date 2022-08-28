@git add build-app\build-info.json
@git commit -m "%1"
@git tag -a %1 -m "verzija %1"
@git push origin master