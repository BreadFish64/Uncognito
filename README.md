# Uncognito

A Firefox extension to re-open the current URL of an incognito tab in a normal tab. This is helpful when Firefox is configured to open links in incognito mode by default.

<img src=uncognito.svg height=120>

### Usage

Ensure that "Run in private browsing" is enabled in [about:addons](about:addons).

#### Desktop

Click the extension button in the browser toolbar. The extension will attempt to reopen the URL in an existing private window, otherwise it will create a new window.

#### Mobile

Click the extension button in `⋮ > Extensions > Uncognito`. This currently create a non-private tab which still appears in the tab switcher. I have not found a way to create a new incognito tab using the APIs available on Android.

### Building

```shell
npm install
npm run pack
```