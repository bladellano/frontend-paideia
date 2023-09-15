<template>
    <a class="btn btn-sm btn-outline-secondary mx-1" @click.prevent="handleClick">
        <font-awesome-icon icon="trash" />
    </a>
</template>
  
<script>
export default {
    name: 'ButtonDelete',
    methods: {
        handleClick() {
            this.$emit('delete');
        },
    },
};
</script>
  
<style scoped></style>
  