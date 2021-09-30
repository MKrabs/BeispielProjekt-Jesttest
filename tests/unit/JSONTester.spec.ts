import { shallowMount } from "@vue/test-utils";
import LoadJSON from "@/components/LoadJSON.vue";

describe("LoadJSON.vue", () => {
  const data = [
    {
      ID: 238064,
      Name: "Edward the Elder",
      Country: "United Kingdom",
      House: "House of Wessex",
    },
    {
      ID: 912685,
      Name: "Athelstan",
      Country: "United States of America",
      House: "House St. Franco",
    },
    {
      ID: 193873,
      Name: "Edmund",
      Country: "Portugal",
      House: "Casa de Janota",
    },
    {
      ID: 327882,
      Name: "Marc",
      Country: "Germany",
      House: "Haus der Jestes",
    },
    {
      ID: 598372,
      Name: "Dimitri",
      Country: "Russia",
      House: "палата представителей",
    },
  ];

  it("renders the JSON div", () => {
    const wrapper = shallowMount(LoadJSON);
    expect(wrapper.exists()).toBe(true);
  });

  it("Loads the Data properly", () => {
    const wrapper = shallowMount(LoadJSON);
    expect(wrapper.vm.$data.applicants).toEqual(data);
  });

  it("Saves the selected options", () => {
    const wrapper = shallowMount(LoadJSON);
    for (let i = 0; i < 4; i++) {
      wrapper.find("select").findAll("option").at(i).setSelected();
      expect(wrapper.vm.$data.selected).toEqual(data[i]);
    }
  });

  it("Renders empty selection as dash", () => {
    const wrapper = shallowMount(LoadJSON);
    const rendered = wrapper.findAll("td");
    for (let i = 0; i < rendered.length; i++) {
      expect(rendered.at(i).text()).toEqual("-");
    }
  });

  it("Renders selection when selected", async () => {
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
