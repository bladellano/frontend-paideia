<template>
    <div class="accordion-item">
        <h2 
            class="accordion-header" 
            :id="headerId">
            <button 
                class="accordion-button collapsed" type="button" 
                data-bs-toggle="collapse"
                :data-bs-target="collapseTarget" 
                aria-expanded="false" 
                :aria-controls="collapseId">
                {{ text }}
            </button>
        </h2>
        <div 
            :id="collapseId" 
            class="accordion-collapse collapse" 
            :aria-labelledby="headerId"
            data-bs-parent="#accordion"
        >
            <div class="accordion-body p-1">
                <ul class="btn-toggle-nav p-0 list-unstyled fw-normal pb-1 small">
                    <slot></slot>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

let uniqueIdCounter = 0;

export default {
    name: "MenuAccordionItem",
    props:['text'],
    data() {
        return {
            uniqueId: uniqueIdCounter++,
        }
    },

    computed: {
        headerId() {
            return `heading_${this.uniqueId}`;
        },
        collapseId() {
            return `collapse_${this.uniqueId}`;
        },
        collapseTarget() {
            return `#${this.collapseId}`;
        }
    }
}
</script>

<style scoped>

.accordion-button {
  background-color: #212529 !important;
  border: none;
  color: #ffffff !important;
  width: 100%;
}

.accordion-button:hover {
  background-color: #000000 !important;
  color: #000000 !important;
}

.accordion-button::after {
  filter: brightness(100);
}

.accordion-body ul li a {
  width: 100%;
  text-align: left;
}
</style>