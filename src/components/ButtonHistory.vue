<template>
    <router-link :to="to" class="btn btn-sm btn-outline-success mx-1">
        Histórico
    </router-link>
</template>
  
<script>
export default {
    name: 'ButtonHistory',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
    },
};
</script>
  
<style scoped></style>
  