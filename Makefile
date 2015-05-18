OBJS = mylib.cmo edit.cmo

all:
	cd src && make all

dist: all
	rm -rf dist
	mkdir dist
	cp -r resources/* dist
	cp -r ace-builds/ dist
	cp -r samples/ dist
	cp -r data/ dist
	cp *.html src/*.js dist
	cat dist/hsp3dish.js | gzip -9 > dist/hsp3dish.js.gz
	cat dist/hsp3dish-gp.js | gzip -9 > dist/hsp3dish-gp.js.gz
	cat dist/hspcmp.js | gzip -9 > dist/hspcmp.js.gz
	cat dist/hspcmp.data | gzip -9 > dist/hspcmp.data.gz

	cat dist/hgimg4res.data | gzip -9 > dist/hgimg4res.data.gz
	cat dist/hgimg4res.js | gzip -9 > dist/hgimg4res.js.gz

update-tsd:
	tsd update --save --overwrite
