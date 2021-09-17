import { shallowMount } from "@vue/test-utils";
import LoadJSON from "@/components/LoadJSON.vue";

describe("LoadJSON.vue", () => {
  const data = [
    {
      ID: 238764,
      Name: "Edward the Elder",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
    {
      ID: 912685,
      Name: "Athelstan",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
    {
      ID: 193873,
      Name: "Edmund",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
    {
      ID: 327882,
      Name: "Edred",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
    {
      ID: 598372,
      Name: "Edwy",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
  ];
  it("renders the JSON div", () => {
    const wrapper = shallowMount(LoadJSON);
    expect(wrapper.exists()).toBe(true);
  });

  it("Load the Data properly", async () => {
    const wrapper = shallowMount(LoadJSON);
    expect(wrapper.vm.$data.applicants).toEqual(data);
  });

  it("Selected options should be saved in var selected", async () => {
    const wrapper = shallowMount(LoadJSON);
    for (let i = 0; i < 4; i++) {
      wrapper.find("select").findAll("option").at(i).setSelected();
      expect(wrapper.vm.$data.selected).toEqual(data[i]);
    }
  });

  it("Empty selection should be dash", async () => {
    const wrapper = shallowMount(LoadJSON);
    const rendered = wrapper.findAll("td");
    for (let i = 0; i < 4; i++) {
      expect(rendered.at(3).text()).toEqual("-");
    }
  });

  it("Selection renders when selected", async () => {
    const wrapper = shallowMount(LoadJSON);
    for (let i = 0; i < 4; i++) {
      await wrapper.find("select").findAll("option").at(i).setSelected();
      const rendered = wrapper.findAll("td");
      expect(wrapper.vm.$data.selected.ID).toEqual(+rendered.at(0).text());
      expect(wrapper.vm.$data.selected.Name).toEqual(rendered.at(1).text());
      expect(wrapper.vm.$data.selected.Country).toEqual(rendered.at(2).text());
      expect(wrapper.vm.$data.selected.House).toEqual(rendered.at(3).text());
    }
  });
});
