import { shallowMount } from "@vue/test-utils";
import Bank from "@/components/BankAccount.vue";

describe("BankAccount.vue", () => {
  it("renders the Bank div", () => {
    const wrapper = shallowMount(Bank);
    expect(wrapper.exists()).toBe(true);
  });

  describe("renders different Names properly", () => {
    test.each`
      input            | output
      ${"User1"}       | ${"User1"}
      ${""}            | ${""}
      ${'!"§$%&/()=?'} | ${'!"§$%&/()=?'}
      ${"最近の更新"}  | ${"最近の更新"}
      ${"🐧"}          | ${"🐧"}
      ${123}           | ${"123"}
      ${null}          | ${""}
      ${undefined}     | ${""}
    `("renders the Name $input properly", async ({ input, output }) => {
      const wrapper = shallowMount(Bank, { propsData: { User: input } });
      expect(wrapper.find("h2").text().startsWith(output));
    });
  });

  describe("Clicking the DEPOSIT button increases the balance", () => {
    test.each([1, 14, 10000000])("The money goes up by %i", async (intake) => {
      const wrapper = shallowMount(Bank);
      await wrapper.setData({ intake: intake });
      const button = wrapper.find("#make");
      for (let i = 1; i < 10; i++) {
        await button.trigger("click");
        expect(wrapper.vm.$data.balance).toBe(intake * i);
      }
    });
  });

  it("Doubles the money", async () => {
    const wrapper = shallowMount(Bank);
    const balance = 14;
    await wrapper.setData({ balance: balance });
    expect(wrapper.vm.$data.balance).toBe(balance);
    await wrapper.find("#double").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(balance * 2);
  });

  describe("Nothing can be bought without money", () => {
    test.each(["intake", "autoclicker"])("Click button %s", async (button) => {
      const wrapper = shallowMount(Bank);
      await wrapper.find("#" + button).trigger("click");
      expect(wrapper.vm.$data.balance).toBe(0);
      expect(wrapper.vm.$data.intake).toBe(1);
      expect(wrapper.vm.$data.intakepersecond).toBe(0);
    });
  });

  it("The intake can be bought", async () => {
    const wrapper = shallowMount(Bank);
    const balance = 50;
    await wrapper.setData({ balance: balance });
    await wrapper.find("#autoclicker").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    expect(wrapper.vm.$data.intakepersecond).toBe(10);
  });

  it("The intakepersecond can be bought", async () => {
    const wrapper = shallowMount(Bank);
    await wrapper.find("#intake").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    await wrapper.find("#make").trigger("click");
    await wrapper.find("#intake").trigger("click");
    expect(wrapper.vm.$data.intake).toBe(2);
  });

  it("The intakepersecond produces money", async () => {
    const wrapper = shallowMount(Bank);
    const intakepersecond = 120;
    await wrapper.setData({ intakepersecond: intakepersecond });
    await wrapper.find("#autoclicker").trigger("click");
    expect(wrapper.vm.$data.balance).toBe(0);
    await new Promise((r) => setTimeout(r, 1000));
    expect(wrapper.vm.$data.balance).toBe(intakepersecond);
  });
});
