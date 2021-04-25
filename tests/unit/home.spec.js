import { shallowMount } from '@vue/test-utils';
import i18n from '@/plugins/i18n/index.js';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('Renders Home page', () => {
    // Arrange
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [i18n],
      },
    });

    // Assert
    expect(wrapper.text()).toMatch('KPIsss');
  });

  it('Contains cards to travel through app views', () => {
    // Arrange
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [i18n],
      },
    });

    const card = wrapper.findComponent('el-card');

    // Assert
    expect(card.exists()).toBe(true);
  });
});
