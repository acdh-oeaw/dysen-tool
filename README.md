# dysen-tool

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Updating Data
To update the static data asset, simply overwrite the file src/store/data.json keeping the same structure and property names.

**Important note:** Don't forget to remove the code which generates random sentiment scores. These lines are in the src/store/store.js and commented with `// Start: Temp: Random sentiment score` and `// End: Temp: Random sentiment score`. Currently these lines to be removed are between 45-47 and 55-57.

## Updating Text Content
To update the text content for the modal popups, edit the following files:
* src/components/App.vue : edit the content inside the <b-modal id="howto-modal" ...> element to update the modal popup fired from the top navigation.
* src/components/BubbleChart.vue : edit the content inside the <b-modal id="scatter-modal" ...> element to update the modal popup fired from info button on the bubble chart.
* src/components/FreqChart.vue : edit the content inside the <b-modal id="freq-modal" ...> element to update the modal popup fired from info button on the frequency line chart.
* src/components/SentimentChart.vue : edit the content inside the <b-modal id="sentiment-modal" ...> element to update the modal popup fired from info button on the sentiment line chart.


* You can also edit the src/components/App.vue file to update the textual content on the top navigation.
