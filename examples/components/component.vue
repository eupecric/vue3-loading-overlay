<template>
  <div class="card vld-parent mb-3">
    <loading
      :active="viewmodel.isLoading"
      :can-cancel="viewmodel.canCancel"
      :on-cancel="viewmodel.whenCancelled"
      :is-full-page="viewmodel.fullPage"
      :height="viewmodel.height"
      :width="viewmodel.width"
      :color="viewmodel.color"
      :loader="viewmodel.loader"
      :background-color="viewmodel.bgColor"
    >
      <template v-if="viewmodel.useSlot" v-slot:default
        ><h3>Loading ...</h3></template
      >
    </loading>
    <div class="card-body">
      <h5 class="card-title">Use as component</h5>

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
          id="input-full-page-1"
          v-model="viewmodel.fullPage"
        />
        <label class="custom-control-label" for="input-full-page-1"
          >Full page?</label
        >
      </div>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="input-cancel-1"
          v-model="viewmodel.canCancel"
        />
        <label class="custom-control-label" for="input-cancel-1"
          >User can cancel?</label
        >
      </div>

      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="input-slot-1"
          v-model="viewmodel.useSlot"
        />
        <label class="custom-control-label" for="input-slot-1"
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

<script lang="ts">
import { reactive } from "vue";
import Loading from "../../index";

export default {
  setup() {
    const viewmodel = reactive({
      isLoading: false,
      fullPage: true,
      canCancel: true,
      useSlot: false,
      loader: "spinner",
      color: "#007bff",
      bgColor: "#ffffff",
      height: 128,
      width: 128,
      timeout: 3000,
    });

    const simulate = () => {
      viewmodel.isLoading = true;
      // Simulate async call
      setTimeout(() => {
        viewmodel.isLoading = false;
      }, viewmodel.timeout);
    };

    const whenCancelled = () => {
      console.log("User cancelled the loader.");
      viewmodel.isLoading = false;
    };
    return {
      viewmodel,
      simulate,
      whenCancelled,
    };
  },

  components: {
    Loading,
  },
  methods: {
    simulate() {},
    whenCancelled() {},
  },
};
</script>
