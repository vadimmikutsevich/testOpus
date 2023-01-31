import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { QBtn, QInput, QForm } from 'quasar';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { useProfileStore } from 'src/stores/profile';
import { createTestingPinia } from '@pinia/testing';
import LoginPopup from '../../../src/components/LoginPopup.vue';

installQuasar({ plugins: QBtn, QInput, QForm });

describe('LoginPopup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginPopup, {
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

  it('input items change data after typing', async () => {
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('test@gmail.com');
    await inputs[1].setValue('123123');

    expect(inputs[0].element.value).toBe('test@gmail.com');
    expect(inputs[1].element.value).toBe('123123');
  });

  it('inputs should be clear after reset', async () => {
    const form = wrapper.find('.q-form');
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('set@gmail.com');
    await inputs[1].setValue('123123');

    await form.trigger('reset');

    expect(inputs[0].element.value).toBe('');
    expect(inputs[1].element.value).toBe('');
  });

  it('fetchAuth method of profile store should be called after submit', async () => {
    const submitButton = wrapper.find('.q-btn');
    const inputs = wrapper.findAll('input');
    const profileStore = useProfileStore();

    await inputs[0].setValue('set@gmail.com');
    await inputs[1].setValue('123123');

    await submitButton.trigger('click');

    expect(profileStore.fetchAuth)
      .toHaveBeenCalledWith(inputs[0].element.value, inputs[1].element.value);
  });
});
