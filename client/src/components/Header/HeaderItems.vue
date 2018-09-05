<template>
    <header class="main-header">
        <slot></slot>
    </header>
</template>

<script type="text/javascript">
import Headroom from 'headroom.js';

export default {
  
  mounted() {
        var headroom  = new Headroom(this.$el);
        headroom.init();
  },
};
</script>