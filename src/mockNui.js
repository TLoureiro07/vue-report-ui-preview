/**
 * Stand-in for FiveM NUI fetch calls.
 * Same endpoint names as production, but no game integration.
 */
import {
  MOCK_ADMINS,
  MOCK_REPORT_DETAILS,
  PLACEHOLDER_SCREENSHOT,
  delay,
} from './mockData.js';

export const RESOURCE_NAME = 'ui-preview-demo';

export function getParentResourceName() {
  return RESOURCE_NAME;
}

export async function mockTakeScreenshot() {
  await delay(600);
  return PLACEHOLDER_SCREENSHOT;
}

export async function mockNuiFetch(endpoint, body, vm) {
  await delay(350);

  switch (endpoint) {
    case 'ready':
      return { UI: vm.UiConfig };

    case 'gettopadmins':
      vm.updateStaffs([...MOCK_ADMINS]);
      break;

    case 'getreportdata': {
      const payload = body ? JSON.parse(body) : {};
      const detail = MOCK_REPORT_DETAILS[payload.id];
      if (detail) vm.setReportData({ ...detail });
      break;
    }

    case 'newreport':
      console.info('[preview mock] newreport', body ? JSON.parse(body) : {});
      break;

    case 'takescreenshot':
      break;

    case 'close':
    case 'conclude':
    case 'reportcancel':
    case 'bring':
    case 'bring-back':
    case 'goto':
    case 'goto-back':
    case 'spect':
    case 'chatmsg':
      console.info('[preview mock]', endpoint, body || '');
      break;

    default:
      console.info('[preview mock] unknown endpoint:', endpoint);
  }

  return { ok: true };
}

/** Patches window.fetch to intercept NUI URLs in the browser demo. */
export function installMockNui(vm) {
  window.GetParentResourceName = getParentResourceName;

  const originalFetch = window.fetch.bind(window);

  window.fetch = (url, options = {}) => {
    if (typeof url === 'string' && url.includes(`https://${RESOURCE_NAME}/`)) {
      const endpoint = url.split('/').pop();
      return mockNuiFetch(endpoint, options.body, vm).then(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
      );
    }
    return originalFetch(url, options);
  };
}
