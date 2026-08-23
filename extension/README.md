# CozyLock — Cozy Corner Browser Extension

Browser-level focus lock companion for [Cozy Corner](https://cozyycorner.vercel.app/).

## Capabilities
- Enforce website blocking while Cozy Corner Focus Timer is active
- Allow access exclusively to user-customized whitelist sites set in the Cozy Corner Settings Drawer
- Redirect distraction attempts to CozyLock's atmospheric focus sanctuary screen
- Two-way live synchronization with Cozy Corner study timer sessions via BroadcastChannel & window messaging

## Development
```bash
npm install
npm run build
```
Load the `extension/` folder in Chrome via `chrome://extensions` (Developer Mode > Load Unpacked).
