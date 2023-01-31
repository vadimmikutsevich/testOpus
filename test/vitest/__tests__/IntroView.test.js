/* eslint-disable no-unused-expressions */
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { QBtn } from 'quasar';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import IntroView from '../../../src/components/IntroView.vue';

installQuasar({ plugins: QBtn });

describe('IntroView component', () => {
  const viewHandlerSpy = vi.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(IntroView, {
      props: {
        viewHandler: viewHandlerSpy,
      },
    });
  });

  it('should mount successfully', async () => {
    await flushPromises();
    expect(wrapper.exists()).toBe(true);
  });

  it('viewHandler should be called', async () => {
    const button = wrapper.findAll('.q-btn');

    await button[0].trigger('click');
    await button[1].trigger('click');

    expect(viewHandlerSpy).toHaveBeenCalledWith('login');
    expect(viewHandlerSpy).toHaveBeenCalledWith('account');
  });
});
