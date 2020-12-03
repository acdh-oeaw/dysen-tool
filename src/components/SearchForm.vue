<template>
  <div class="col">
    <b-form-group id="select-word-group">
      <v-select
        id="select-word"
        :value="$store.state.selectedWord"
        :options="$store.state.availableWords"
        @input="onSelectedWordChange"
        :clearable="false"
      />
    </b-form-group>
  </div>
</template>

<script>

export default {
  name: 'SearchForm',
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    onSelectedWordChange(word) {
      this.$store.commit('changeSelectedWord', word);
    },
  },
  computed: {
  },
  watch: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
