import { mount } from 'svelte'
import Example from './Example.svelte'

const app = mount(Example, {
    target: document.getElementById('app')!,
})

export default app
