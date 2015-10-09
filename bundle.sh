# Script to bundle the application

ELECTRON_VERSION="0.33.6"

APP_NAME="Meta Search"
APP_VERSION="1.0.0"
BUNDLE_IDENTIFIER="com.rastechsoftware.MetaSearch"
SIGNING_IDENTITY="Developer ID Application: Rastech Software, Inc."

branch=${GIT_BRANCH:-'master'}
buildNumber=$(expr $(git rev-list $branch --count) - $(git rev-list HEAD..$branch --count))

package_icon() {
	iconutil -c icns --output dist/app.icns app.iconset/
}

build() {
	echo $'\n\e[31mWARNING:\e[0m Application will not be codesigned and is thus unsuitable for distribution\n'

	electron-packager meta-wrapper/ "$APP_NAME" \
		--overwrite \
		--platform="darwin" \
		--arch="all" \
		--version="$ELECTRON_VERSION" \
		--out="dist" \
		--icon="dist/app.icns" \
		--app-bundle-id="$BUNDLE_IDENTIFIER" \
		--app-version="$APP_VERSION" \
		--build-version="$buildNumber"
}

build_signed() {
	electron-packager meta-wrapper/ "$APP_NAME" \
		--overwrite \
		--platform="darwin" \
		--arch="all" \
		--version="$ELECTRON_VERSION" \
		--out="dist" \
		--icon="dist/app.icns" \
		--app-bundle-id="$BUNDLE_IDENTIFIER" \
		--app-version="$APP_VERSION" \
		--build-version="$buildNumber" \
		--sign="$SIGNING_IDENTITY"
}

package_icon
case "$1" in
"")
	build ;;
--sign)
	build_signed ;;
*)
	echo >&2 "error: invalid option: $1"; exit 1 ;;
esac
