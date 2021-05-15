<template>
  <el-card shadow="always" class="main-card">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadConf(true)">{{
        $t('update-data')
      }}</el-button>
      <el-button type="primary" v-else :loading="isLoading"
        >{{ $t('loading') }}...</el-button
      >
    </div>
    <h1>{{ $t('config') }}</h1>

    <el-table
      v-if="isLoading || hasConf"
      v-loading="isLoading"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      stripe
      fit
      :data="
        conf.filter(
          (confParam) =>
            !search ||
            confParam.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      max-height="600"
    >
      <el-table-column :label="$t('id')" prop="id" sortable></el-table-column>
      <el-table-column
        :label="$t('title')"
        prop="title"
        sortable
      ></el-table-column>

      <el-table-column
        :label="$t('description')"
        prop="description"
      ></el-table-column>

      <el-table-column
        :label="$t('dependencie')"
        prop="dependencie"
        sortable
      ></el-table-column>

      <el-table-column
        :label="$t('value')"
        prop="value"
        sortable
      ></el-table-column>

      <el-table-column align="right" min-width="150">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            :placeholder="$t('search-by-name')"
          />
        </template>

        <template #default="scope">
          <el-select
            v-model="scope.row.value"
            :placeholder="$t('dynamic-fields')"
            @change="handleChange(scope.row)"
          >
            <el-option
              v-for="item in getDependencieValues(scope.row.dependencie)"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else :description="$t('fields-not-found')"></el-empty>
  </el-card>
</template>

<script>
import useNotify from '@/hooks/notify.js';

export default {
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      isLoading: false,
      error: null,
      search: '',
    };
  },
  computed: {
    conf() {
      return this.$store.getters['conf'];
    },
    hasConf() {
      return !this.isLoading && this.conf;
    },
  },
  methods: {
    async loadConf(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('loadConf', {
          forceRefresh: refresh,
        });
        if (refresh) {
          this.notify(
            this.$t('fields-updated-title'),
            this.$t('fields-updated-message'),
            'success'
          );
        }
      } catch (error) {
        this.error = error.message || this.$t('update-data-failed');

        this.notify(
          this.$t('ups'),
          `${this.$t('error')}: ${this.error}`,
          'error'
        );
      }

      this.isLoading = false;
    },
    getDependencieValues(dependencie) {
      var items = null;

      switch (dependencie) {
        case 'fields':
          items = this.$store.getters['fields/fields'];
          break;
      }

      return items;
    },
    handleError() {
      this.error = null;
    },
    handleChange(confParameter) {
      this.$store.dispatch('updateConf', confParameter);
    },
  }, // methods

  created() {
    this.loadConf();
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
.el-table .required-field {
  font-weight: bolder;
}
</style>
