<template>
  <div class="user">
    <ElPopover
      ref="userMenuPopover"
      placement="bottom-end"
      :width="240"
      :hideAfter="0"
      trigger="hover"
      :showArrow="true"
      popperClass="user-menu-popover"
      popperStyle=""
    >
    <template #reference>
      00
    </template>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ZenUser' });
</script>