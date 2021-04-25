<template>
  <el-card shadow="always" class="main-card">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadFields(true)">{{
        $t('update-data')
      }}</el-button>
      <el-button type="primary" v-else :loading="isLoading">{{
        $t('loading')
      }}</el-button>
      <el-button type="primary" @click="$router.push('/fields/create')">{{
        $t('new-field')
      }}</el-button>
    </div>
    <h1>{{ $t('available-fields') }}</h1>
    <el-table
      v-if="isLoading || hasFields"
      v-loading="isLoading"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      stripe
      fit
      :data="
        fields.filter(
          (field) =>
            !search || field.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      max-height="600"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        :label="$t('id')"
        prop="id"
        sortable
      ></el-table-column>
      <el-table-column
        :label="$t('title')"
        prop="title"
        sortable
      ></el-table-column>
      <el-table-column
        :label="$t('description')"
        prop="description"
        min-width="200"
      ></el-table-column>
      <el-table-column
        :label="$t('required')"
        prop="requiredText"
        sortable
      ></el-table-column>

      <el-table-column
        :label="$t('fillable')"
        prop="fillableText"
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
          <el-button
            type="info"
            plain
            @click="$router.push('/fields/' + scope.row.id)"
            >{{ $t('view-details') }}</el-button
          >

          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/fields/' + scope.row.id + '/edit')"
            >{{ $t('modify') }}</el-button
          >
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
    fields() {
      return this.$store.getters['fields/fields'];
    },
    hasFields() {
      return !this.isLoading && this.$store.getters['fields/hasFields'];
    },
  },
  methods: {
    async loadFields(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('fields/loadFields', {
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
        this.error =
          error.message || this.$t('update-data-failed');

        this.notify(this.$t('ups'), `${this.$t('error')}: ${this.error}`, 'error');
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    tableRowClassName({ row }) {
      if (row.required) {
        return 'required-field';
      }
      return '';
    },
  }, // methods

  created() {
    this.loadFields();
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
