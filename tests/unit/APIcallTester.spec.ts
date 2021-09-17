import { shallowMount } from "@vue/test-utils";
import BasicAPIcall from "@/components/BasicAPIcall.vue";

describe("BasicCallAPI", () => {
  it("renders the JSON div", () => {
    const wrapper = shallowMount(BasicAPIcall);
    expect(wrapper.exists()).toBe(true);
  });
});
