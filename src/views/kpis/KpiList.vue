<template>
  <el-card shadow="always" class="main-card">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadKpis(true)"
        >{{ $t('update-data') }}</el-button
      >
      <el-button type="primary" v-else :loading="isLoading"
        >{{ $t('loading') }}...</el-button
      >
      <el-button type="primary" @click="$router.push('/kpis/create')" :disabled="!isAdmin()"
        >{{ $t('new-kpi') }}</el-button
      >
    </div>
    <h1>{{ $t('active-kpis') }}</h1>

    <el-table
      v-if="isLoading || hasKpis"
      v-loading="isLoading"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      stripe
      fit
      :data="
        enabledKpis.filter(
          (kpi) =>
            !search || kpi.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      max-height="600"
    >
      <el-table-column :label="$t('id')" prop="id" sortable></el-table-column>
      <el-table-column :label="$t('title')" prop="title" sortable></el-table-column>
      <el-table-column
        :label="$t('description')"
        prop="description"
        min-width="200"
      ></el-table-column>

      <el-table-column align="right" min-width="200">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            :placeholder="$t('search-by-name')"
          />
        </template>
        <template #default="scope">
          <el-button
            type="success"
            plain
            @click="$router.push('/kpis/' + scope.row.id + '/registers')"
            >{{$t('registers')}}</el-button
          >
          <el-button
            type="info"
            plain
            @click="$router.push('/kpis/' + scope.row.id)"
            >{{$t('view-details')}}</el-button
          >

          <el-button
            :disabled="!isAdmin()"
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/kpis/' + scope.row.id + '/edit')"
            >{{$t('modify')}}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else :description="$t('kpis-not-found')"></el-empty>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";
import { localStorageService } from "@/store/modules/UserStorage/actions";

export default {
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      currentUser: null,
      isLoading: false,
      error: null,
      search: "",
    };
  },
  computed: {
    enabledKpis() {
      return this.$store.getters["kpis/enabledKpis"];
    },
    hasKpis() {
      return !this.isLoading && this.enabledKpis.length > 0;
    },
  },
  methods: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === "Admin";
    },
    async loadKpis(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("kpis/loadKpis", {
          forceRefresh: refresh,
        });
        if (refresh) {
          this.notify(
            this.$t('kpis-updated-title'),
            this.$t('kpis-updated-message'),
            "success"
          );
        }
      } catch (error) {
        this.error =
          error.message || this.$t('update-data-failed');

        this.notify(this.$t('ups'), `${this.$t('error')}: ${this.error}`, "error");
      } finally {
        this.isLoading = false;
      }
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    localStorageService.currentUser.subscribe((x) => (this.currentUser = x));
    this.loadKpis();
  },
};
</script>

<style scoped>

h1 {
  font-size: 2rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
