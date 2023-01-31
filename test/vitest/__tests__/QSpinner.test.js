import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from 'src/stores/store';
import QSpinner from '../../../src/components/QSpinner.vue';

installQuasar();

describe('QSpinner', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(QSpinner, {
      global: {
        plugins: [createTestingPinia({
          fakeApp: true,
          createSpy: vi.fn,
          stubActions: false,
        })],
      },
    });
  });

  it('should be mount successfully', async () => {
    await flushPromises();
    expect(wrapper.exists()).toBe(true);
  });

  it('should be visible if isLoading in store is true', () => {
    wrapper = mount(QSpinner, {
      global: {
        plugins: [createTestingPinia({
          fakeApp: true,
          createSpy: vi.fn,
          stubActions: false,
        })],
      },
    });

    const store = useStore();

    store.isLoading = true;

    expect(wrapper.isVisible()).toBe(true);
  });
});
