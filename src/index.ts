import { ComponentInternalInstance, h, render } from "vue";
import LoadingVue from "./main/Component.vue";
import './css/index.css';


function createComponent(component: any, props: any, parentContainer: Element) {
    const vnode = h(component, props)
    const container = document.createElement('div')
    parentContainer.appendChild(container);
    render(vnode, container);

    return vnode.component
}

function removeElement(el: Element) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
};


export default LoadingVue;

export function useLoading(globalProps: any = {}, globalSlots: any = {}) {
    let instance: ComponentInternalInstance | any = null;

    const loading = {
        show(props: any = globalProps, slots: any = globalSlots) {
            const forceProps = {
                programmatic: true,
                lockScroll: true,
                isFullPage: false
            };
            const propsData = Object.assign({}, globalProps, props, forceProps);
            let container = propsData.container;

            if (!propsData.container) {
                container = document.body;
                propsData.isFullPage = true;
            }

            instance = createComponent(LoadingVue, propsData, container);
            const mergedSlots = Object.assign({}, globalSlots, slots);
            Object.keys(mergedSlots).map((name) => {
                if (instance != null) {
                    instance.slots[name] = mergedSlots[name]
                }
            });
        },
        hide() {
            if (instance != null) {
                instance.ctx.hide();
                let root = instance.vnode.el;
                removeElement(root.parentElement);
            }
        }
    }
    return loading
}
