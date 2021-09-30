import { shallowMount } from "@vue/test-utils";
import BasicAPIcall from "@/components/BasicAPIcall.vue";
import axios from "axios";

describe("BasicCallAPI", () => {
  it("renders the JSON div", () => {
    const wrapper = shallowMount(BasicAPIcall);
    expect(wrapper.exists()).toBe(true);
  });

  test.each([
    ["/json", "disabled"],
    ["/text", undefined],
    ["/txet", undefined],
    ["/python", "disabled"],
  ])("$output input when %a[0] is selected", async (path, output) => {
    const wrapper = shallowMount(BasicAPIcall);
    await wrapper.setData({ selected: path });
    expect(wrapper.find("#textfield").attributes()["disabled"]).toBe(output);
    expect(wrapper.find("input[type=checkbox]").attributes()["disabled"]).toBe(
      output
    );
  });
});

jest.mock("axios", () => {
  return {
    get: (url: string) =>
      Promise.resolve({ data: url === "/text" ? url.slice(5) : "Mocked text" }),
  };
});

describe("When API call is successful", () => {
  it("should show loading", async () => {
    const wrapper = shallowMount(BasicAPIcall);
    wrapper.find("form").trigger("submit");
    expect(wrapper.vm.$data.axiosResponse).toStrictEqual({
      data: "Loading...",
      type: "Loading...",
      timeItTook: 0,
    });
  });

  it("should return a mocked Text", async () => {
    const wrapper = shallowMount(BasicAPIcall);
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.axiosResponse.data).toBe("Mocked text");
  });

  it("should catch an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(() => ({}));
    const wrapper = shallowMount(BasicAPIcall);
    wrapper.find("form").trigger("submit");
    await new Promise((r) => setTimeout(r, 3000));
    expect(wrapper.vm.$data.axiosResponse.type).toBe("Error");
  });

  it("should catch an error faster", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(() => ({}));
    const wrapper = shallowMount(BasicAPIcall);
    wrapper.find("form").trigger("submit");
    await new Promise((r) => setTimeout(r, 50));
    expect(wrapper.vm.$data.axiosResponse.type).toBe("Error");
  });
});
