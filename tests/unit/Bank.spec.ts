import { shallowMount } from "@vue/test-utils";
import Bank from "@/components/Bank.vue";
import BankAccount from "@/components/BankAccount.vue";

describe("Bank.vue", () => {
  describe("Unit tests", () => {
    it("Initializes and renders the Bank div properly", () => {
      const wrapper = shallowMount(Bank);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.vm.$data.accounts).toEqual([]);
      expect(wrapper.findAllComponents(BankAccount)).toHaveLength(0);
    });

    test.each`
      Names                          | Size
      ${["User1"]}                   | ${1}
      ${["User1", "User2", "User3"]} | ${3}
      ${[]}                          | ${0}
    `(
      "Should save $Size accounts as data and render $Names",
      async ({ Names, Size }) => {
        const wrapper = shallowMount(Bank);
        expect(wrapper.vm.$data.accounts).toStrictEqual([]);
        await wrapper.setData({ accounts: Names });
        expect(wrapper.vm.$data.accounts).toEqual(Names);
        expect(wrapper.findAllComponents(BankAccount)).toHaveLength(Size);
      }
    );
  });

  describe("Integration Test", () => {
    test.each`
      Names            | Size
      ${"User1"}       | ${1}
      ${""}            | ${1}
      ${'!"§$%&/()=?'} | ${1}
      ${"最近の更新"}  | ${1}
      ${"🐧"}          | ${1}
      ${123}           | ${1}
      ${null}          | ${1}
      ${undefined}     | ${1}
    `(
      "Should add $Names after submitting the Form",
      async ({ Names, Size }) => {
        const wrapper = shallowMount(Bank);
        await wrapper.setData({ Client: Names });
        await wrapper.find("#addClient").trigger("submit");
        expect(wrapper.vm.$data.accounts).toEqual([Names]);
        expect(wrapper.findAllComponents(BankAccount).length).toEqual(Size);
      }
    );
  });
});
