<template>
    <li class="d-grid gap-2">
        <router-link 
            class="btn btn-secondary text-start btn-sm mt-1" 
            :to="path"
        >
            {{ action }}
        </router-link>
    </li>
</template>

<script>
export default {
    props:['action','path'],
    name: "MenuAccordionChild"
}
</script>

<style></style>