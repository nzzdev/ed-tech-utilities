<script>
    import {ConnectionInfoStore} from "./ConnectionInfoStore.svelte.js";
    import {onMount} from "svelte";

    let connectionInfoStore = new ConnectionInfoStore();

    onMount(() => {
        connectionInfoStore.measureConnectionSpeed({
            thresholdMbps: 3,
            timeoutMs: 2000
        });
    });
</script>
<h1>Connection Test</h1>


<p>hasMeasured: { connectionInfoStore.hasMeasured ? '✅' : 'not yet'}</p>
{#if connectionInfoStore.hasMeasured}
    <h2>{ connectionInfoStore.canUseFastConnection ? '🚀 fast' : '🌴 slow'}</h2>
{/if}