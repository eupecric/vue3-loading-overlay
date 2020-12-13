<template>
  <div class="card vld-parent mb-3" ref="formContainer">
    <div class="card-body">
      <h5 class="card-title">Use as plugin</h5>

      <div class="form-group m-0">
        <label>Loader shape</label>
        <select
          class="form-control-sm text-capitalize"
          v-model="viewmodel.loader"
        >
          <option v-for="item in ['spinner', 'dots', 'bars']" :key="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="input-full-page-2"
          v-model="viewmodel.fullPage"
        />
        <label class="custom-control-label" for="input-full-page-2"
          >Full page?</label
        >
      </div>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="input-cancel-2"
          v-model="viewmodel.canCancel"
        />
        <label class="custom-control-label" for="input-cancel-2"
          >User can cancel?</label
        >
      </div>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="input-slot-2"
          v-model="viewmodel.useSlot"
        />
        <label class="custom-control-label" for="input-slot-2"
          >Use slot? (replace shape)</label
        >
      </div>

      <div class="form-group m-0">
        <label>Color</label>
        <input type="color" v-model="viewmodel.color" />
      </div>

      <div class="form-group m-0">
        <label>Background color</label>
        <input type="color" v-model="viewmodel.bgColor" />
      </div>

      <div class="form-group">
        <label>Height</label>
        <input
          type="range"
          min="10"
          step="5"
          max="256"
          v-model.number="viewmodel.height"
        />
        <span class="text-muted">{{ viewmodel.height }}</span>
      </div>

      <div class="form-group">
        <label>Width</label>
        <input
          type="range"
          min="10"
          step="5"
          max="256"
          v-model.number="viewmodel.width"
        />
        <span class="text-muted">{{ viewmodel.width }}</span>
      </div>

      <div class="form-group mt-3">
        <button
          class="btn btn-outline-primary btn-sm"
          @click.prevent="simulate"
        >
          Show loader
        </button>
      </div>
    </div>
  </div>
</template>

<script lang= "ts">
import {
  reactive,
  ref,
  h,
  defineComponent,
  createSlots,
  renderSlot,
  RendererOptions,
} from "vue";
// Import component
import { useLoading } from "../../src/index";

const CustomSlot = defineComponent({
  template: `<div class="custom-slot" :style="{color:color}"><h3>Wait ...</h3></div>`,
});

export default {
  setup() {
    const formContainer = ref<any>(null);

    const viewmodel = reactive({
      fullPage: true,
      canCancel: true,
      useSlot: false,
      loader: "dots",
      timeout: 3000, //ms
      color: "#00ab00",
      bgColor: "#4b4b4b",
      height: 64,
      width: 64,
    });
    const whenCancelled = () => {
      console.log("User cancelled the loader.");
    };

    const simulate = () => {
      let slots = viewmodel.useSlot
        ? {
            // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
            default: (props: any) => h(CustomSlot, props),
          }
        : {};

      let loader = useLoading();
      loader.show(
        {
          container: viewmodel.fullPage ? null : formContainer.value,
          canCancel: viewmodel.canCancel,
          onCancel: whenCancelled,
          color: viewmodel.color,
          backgroundColor: viewmodel.bgColor,
          height: viewmodel.height,
          width: viewmodel.width,
          loader: viewmodel.loader,
          opacity: 0.3,
        },
        slots
      );

      // simulate async call
      setTimeout(() => {
        loader.hide();
      }, viewmodel.timeout);
    };

    return {
      viewmodel,
      simulate,
      formContainer,
    };
  },
  components: {
    CustomSlot,
  },
};
</script>

