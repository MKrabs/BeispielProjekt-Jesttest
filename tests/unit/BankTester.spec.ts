import { shallowMount } from "@vue/test-utils";
import Bank from "@/components/BankAccount.vue";

describe("BankAccount.vue", () => {
  it("renders the Bank div", () => {
    const wrapper = shallowMount(Bank);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the Name properly", async () => {
    const User = "Marc";
    const wrapper = shallowMount(Bank, {
      propsData: { User },
    });
    expect(wrapper.find("h2").text()).toBe(User + "'s Balance: 0");
  });

  it("The money goes up by 1", async () => {
    const wrapper = shallowMount(Bank);
    const button = wrapper.find("button");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.balance).toBe(0);
    for (let i = 1; i < 10; i++) {
      await button.trigger("click");
      expect(wrapper.vm.$data.balance).toBe(i);
    }
  });

  it("The money goes up by intake", async () => {
    const wrapper = shallowMount(Bank);
    const intake = 14;
    await wrapper.setData({ intake: intake });
    const button = wrapper.find("#make");
    for (let i = 1; i < 10; i++) {
      await button.trigger("click");
      expect(wrapper.vm.$data.balance).toBe(intake * i);
    }
  });

  it("The money doubles", async () => {
    const wrapper = shallowMount(Bank);
    const balance = 14;
    await wrapper.setData({ balance: balance });
    expect(wrapper.vm.$data.balance).toBe(balance);
    await wrapper.find("#double").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(balance * 2);
  });

  it("Nothing can be bought without money", async () => {
    const wrapper = shallowMount(Bank);
    await wrapper.find("#intake").trigger("click");
    await wrapper.find("#intake").trigger("autoclicker");
    expect(wrapper.vm.$data.balance).toBe(0);
    expect(wrapper.vm.$data.intake).toBe(1);
    expect(wrapper.vm.$data.intakepersecond).toBe(0);
  });

  it("The intakepersecond can be bought", async () => {
    const wrapper = shallowMount(Bank);
    await wrapper.find("#intake").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    await wrapper.find("#make").trigger("click");
    await wrapper.find("#intake").trigger("click");
    expect(wrapper.vm.$data.intake).toBe(2);
  });

  it("The intake can be bought", async () => {
    const wrapper = shallowMount(Bank);
    const balance = 50;
    await wrapper.setData({ balance: balance });
    await wrapper.find("#autoclicker").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    expect(wrapper.vm.$data.intakepersecond).toBe(10);
  });

  it("The intake produces money", async () => {
    const wrapper = shallowMount(Bank);
    const intakepersecond = 120;
    await wrapper.setData({ intakepersecond: intakepersecond });
    await wrapper.find("#autoclicker").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    await new Promise((r) => setTimeout(r, 1000));
    expect(wrapper.vm.$data.balance).toBe(intakepersecond);
  });
});
