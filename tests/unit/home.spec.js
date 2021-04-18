import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("Renders Home page", () => {
    // Arrange
    const wrapper = shallowMount(Home);

    // Assert
    expect(wrapper.text()).toMatch("Gestión de indicadores");
  });

  it("Contains cards to travel through app views", () => {
    // Arrange
    const wrapper = shallowMount(Home);
    const card = wrapper.findComponent("el-card");

    // Assert
    expect(card.exists()).toBe(true);
  });
});
