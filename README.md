# wrapper
The Meta Web Application Wrapper using Electron, for a native touch

It just wraps the web application at app.meta.sc in a native window.

## Electron Information

[Quick Start Guide](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md)
[Docs](https://github.com/atom/electron/tree/master/docs)

## Development
- Clone this repository with `git clone git@github.com:rastech/wrapper.git`
- Install [node.js](https://nodejs.org) if necessary
- `npm install -g electron-prebuilt' [More info on electron-prebuilt here](https://github.com/mafintosh/electron-prebuilt)

Now you can just run `electron` to run electron:

```
electron meta-wrapper
```

main.js controls the native app 
index.html is the page loaded by the native app, webview

## Distribution

[Distribution](https://github.com/atom/electron/blob/master/docs/tutorial/application-distribution.md)

[Packaging](https://github.com/atom/electron/blob/master/docs/tutorial/application-packaging.md)

[electron-packager : A Handy Tool for Packaging](https://github.com/maxogden/electron-packager)


## Notes

Although this wrapper is now capable of going through the integrations flow, right now it just redirects to the browser for integrations. Most users are already signed in to their integrations in their browser, making the authentication step easier. It also appears more secure to the user.

Right now when the main window is closed but the app is not quit the main window is simply hidden, to avoid reloading the page the next time the user activates the app.