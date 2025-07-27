// SPDX-License-Identifier: MPL-2.0

async function toggleIncognitoDesktop(tab: browser.tabs.Tab) {
    const windows = await browser.windows.getAll();
    let window = windows.find((window) => window.focused && window.incognito != tab.incognito);
    if (!window) {
        window = windows.find((window) => window.incognito != tab.incognito);
    }
    if (!window) {
        window = await browser.windows.create({
            focused: true,
            incognito: !tab.incognito,
            url: tab.url,
        });
    } else {
        await browser.tabs.create({
            windowId: window.id!,
            active: true,
            url: tab.url,
        });
    }
    await browser.tabs.remove(tab.id!);
}

async function toggleIncognitoMobile(tab: browser.tabs.Tab) {
    if (tab.incognito) {
        await browser.tabs.create({
            // Oddly this creates a non-incognito tab,
            // but still in the "private" section of the tab switcher
            // window id had no effect.
            active: true,
            url: tab.url,
        });
        await browser.tabs.remove(tab.id!);
    } else {
        // We can't make a new incognito tab. See if there's an empty incognito tab to hijack.
        const newtabs = await browser.tabs.query({
            url: ["about:newtab"]
        });
        const incognitoTab = newtabs.find(tab => tab.incognito);
        if (!incognitoTab) {
            throw new Error("No new incognito tab to use")
        }
        await browser.tabs.update(incognitoTab.id!, {
            active: true,
            url: tab.url
        })
        await browser.tabs.remove(tab.id!);
    }
}

async function actionListener(tab: browser.tabs.Tab, info?: browser.pageAction.OnClickData) {
    try {
        if (browser.windows) {
            await toggleIncognitoDesktop(tab);
        } else {
            await toggleIncognitoMobile(tab);
        }
    } catch (e) {
        console.error(`Failed to toggle incognito:\n${JSON.stringify(e)}`);
        throw e;
    }
}

browser.action.onClicked.addListener(actionListener)