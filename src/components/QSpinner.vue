<template>
    <div v-show="store.isLoading" class="absolute-center" style="z-index: 99;">
        <q-spinner-hourglass
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerHourglass</q-tooltip>
    </div>
</template>

<script>
import { useStore } from 'stores/store';

export default {
  name: 'QSpinner',
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>
