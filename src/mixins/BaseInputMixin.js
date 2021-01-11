export const BaseInputMixin = {
    inheritAttrs: false, // Attributes inherited at root element by default
    props: {
        label: {
            type: String,
            default: ''
        },
        value: [String, Number]
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value)
            // I can use @input on its parent component
        }
    }
}
