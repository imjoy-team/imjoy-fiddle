import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import ImJoyEditor from "@/components/ImJoyEditor.vue";
import { store } from "../../src/store";

describe("ImJoyEditor.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(ImJoyEditor, {
      propsData: { $store: store }
    });
    expect(wrapper.text()).to.include("Layers");
  });
});
