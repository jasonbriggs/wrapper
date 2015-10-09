# Script to bundle the application

branch=${1:-'master'}
buildNumber=$(expr $(git rev-list $branch --count) - $(git rev-list HEAD..$branch --count))

# package icon
iconutil -c icns --output dist/app.icns app.iconset/

# build application
electron-packager meta-wrapper/ "Meta Search" \
	--overwrite \
	--platform="darwin" \
	--arch="all" \
	--version="0.33.6" \
	--out="dist" \
	--icon="dist/app.icns" \
	--app-bundle-id="com.rastechsoftware.MetaSearch" \
	--app-version="1.0.0" \
	--build-version="$buildNumber" \
	--sign="Developer ID Application: Rastech Software, Inc."
