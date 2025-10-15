# `@nzz/et-utils-connection-measures`

Reads connection infos and/or measures the speed for a high/low resolution decision

## Usage

```bash
npm install @nzz/et-utils-connection-measures
```

### Run the speed test
```
connectionInfo = new ConnectionInfo();
connectionInfo.measureConnectionSpeed({
        thresholdMbps: 30,
        timeoutMs: 1000,
      });
```

### Use the results
```
{#if connectionInfo.hasMeasured}
    <!-- put the component with a high/low res difference -->
{/if}

function initHighOrLowRes() {  
  if (connectionInfo.canUseFastConnection) {
      \\ do high resolution stuff 
  } else {
      \\ do low resolution stuff
  }
}
```

## Contribute
### Example
Run the example while developing the speed test further

```
npm run dev
```
