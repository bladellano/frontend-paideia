<template>
    <div class="accordion" id="accordion">
        <slot></slot>
    </div>
</template>

<script>
import MenuAccordionItemVue from './MenuAccordionItem.vue'

export default {
    name: "MenuAccordion",
    components: { MenuAccordionItemVue }
}
</script>

<style>

</style>