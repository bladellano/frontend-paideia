<template>
    <router-link :to="to" class="btn btn-sm btn-outline-primary">
        <font-awesome-icon icon="edit"/>
    </router-link>
</template>
  
<script>
export default {
    name: 'ButtonEdit',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
    },
};
</script>
  
<style scoped></style>
  