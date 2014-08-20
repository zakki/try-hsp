OBJS = mylib.cmo edit.cmo

all:
	cd src && make all

dist: all
	rm -rf dist
	mkdir dist
	cp -r resources/* dist
	cp -r ace-builds/ dist
	cp -r samples/ dist
	cp *.html src/*.js dist

update-tsd:
	tsd update --save --overwrite
