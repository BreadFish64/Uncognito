// SPDX-License-Identifier: MPL-2.0

async function pageActionListener(tab: browser.tabs.Tab, info?: browser.pageAction.OnClickData) {
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

browser.pageAction.onClicked.addListener(pageActionListener);