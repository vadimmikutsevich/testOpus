import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import {
  QBtn, QInput, QForm, QToggle,
} from 'quasar';
import { createTestingPinia } from '@pinia/testing';
import { useProfileStore } from 'src/stores/profile';
import NewAccount from '../../../src/components/NewAccount.vue';

installQuasar({
  plugins: QBtn, QInput, QForm, QToggle,
});

describe('New account', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NewAccount, {
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
    const checkbox = wrapper.find('input[type=checkbox]');

    await inputs[0].setValue('vadzim');
    await inputs[1].setValue('miki');
    await inputs[2].setValue('set@gmail.com');
    await inputs[3].setValue('123123');
    await checkbox.trigger('click');

    expect(inputs[0].element.value).toBe('vadzim');
    expect(inputs[1].element.value).toBe('miki');
    expect(inputs[2].element.value).toBe('set@gmail.com');
    expect(inputs[3].element.value).toBe('123123');
    expect(checkbox.element).toBeTruthy();
  });

  it('inputs and checkbox should be clear after reset', async () => {
    const form = wrapper.find('.q-form');
    const inputs = wrapper.findAll('input');
    const checkbox = wrapper.find('input[type=checkbox]');

    await inputs[0].setValue('vadzim');
    await inputs[1].setValue('miki');
    await inputs[2].setValue('set@gmail.com');
    await inputs[3].setValue('123123');
    await checkbox.trigger('click');

    await form.trigger('reset');

    expect(inputs[0].element.value).toBe('');
    expect(inputs[1].element.value).toBe('');
    expect(inputs[2].element.value).toBe('');
    expect(inputs[3].element.value).toBe('');
    expect(checkbox.element).toBeTruthy();
  });

  it('register method of profile store should be called after submit', async () => {
    const submitButton = wrapper.find('.q-btn');
    const inputs = wrapper.findAll('input');
    const checkbox = wrapper.find('input[type=checkbox]');
    const profileStore = useProfileStore();

    await inputs[0].setValue('vadzim');
    await inputs[1].setValue('miki');
    await inputs[2].setValue('set@gmail.com');
    await inputs[3].setValue('123123');
    await checkbox.trigger('click');

    await submitButton.trigger('click');

    expect(profileStore.register)
      .toHaveBeenCalledWith(
        inputs[2].element.value,
        inputs[3].element.value,
        inputs[0].element.value,
        inputs[1].element.value,
        true,
      );
  });
});
