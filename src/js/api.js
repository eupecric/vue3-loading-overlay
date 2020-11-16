import Component from './Component.vue'
import {mount} from './mount'

const Api = (app, globalProps = {}, globalSlots = {}) => {
  return {
    show(props = globalProps, slots = globalSlots) {
      const forceProps = {
        programmatic: true
      };
      const propsData = Object.assign({}, globalProps, props, forceProps);

      const {vNode, destroy, el} = mount(Component, {
        props: propsData,
        element: document.createElement('div'),
        app,
        children: slots
      });

      return vNode;
    }
  }
};

export default Api;
