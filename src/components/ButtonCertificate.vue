<template>
    <router-link :to="to" class="btn btn-sm btn-outline-primary mx-1">
        Certificado
    </router-link>
</template>
  
<script>
export default {
    name: 'ButtonCertificate',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
    },
};
</script>
  
<style scoped></style>
  