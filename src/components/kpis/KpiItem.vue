<template>
  <div>
    <section>
      <el-card shadow="hover">

        <section class="actions nav" v-if="!showingRegisters">
          <el-button
            :disabled="!!!prevKpi"
            icon="el-icon-back"
            @click="goingPrev"
          ></el-button>
          <el-button
            :disabled="!!!nextKpi"
            icon="el-icon-right"
            @click="goingNext"
          ></el-button>
        </section>

        <h2>{{$t('kpi-properties')}}</h2>

        <section class="properties">
          <h3><el-tag>{{$t('title')}}</el-tag> {{ selectedKpi.title }}</h3>
          <h3><el-tag>{{$t('description')}}</el-tag> {{ selectedKpi.description }}</h3>
        </section>

        <section class="fields">
          <el-table
            v-if="selectedKpi.fields"
            :default-sort="{ prop: 'id', order: 'ascending' }"
            stripe
            fit
            :row-class-name="tableRowClassName"
            :data="
              selectedKpi.fields.filter(
                (field) =>
                  !search ||
                  field.title.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%"
            max-height="280"
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
              :label="$t('value')"
              prop="value"
              sortable
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

            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="mini"
                  :placeholder="$t('search-by-name')"
                />
              </template>
            </el-table-column>
          </el-table>

          <el-empty
            v-else
            :description="$t('fields-not-found')"
          ></el-empty>
        </section>
      </el-card>
    </section>

    <!-- Only show actions buttons if we are not in a registers view -->
    <section v-if="!showingRegisters">
      <el-card shadow="hover">
        <div class="actions">
          <base-badge
            v-if="selectedKpi.enabled"
            style="margin-right: auto"
            :title="$t('active')"
            type="success"
          ></base-badge>

          <base-badge
            v-else
            style="margin-right: auto"
            :title="$t('deleted')"
            type="info"
          ></base-badge>

          <el-button
            role="show-kpi-registers"
            type="success"
            plain
            @click="$router.push($route.path + '/registers')"
            >{{$t('registers')}}</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push($route.path + '/edit')"
            >{{$t('modify')}}</el-button
          >

          <el-button
            type="warning"
            icon="el-icon-copy-document"
            plain
            @click="$router.push($route.path + '/clone')"
            >{{$t('clone')}}</el-button
          >

          <!-- Isolate delete logic in separate component -->
          <kpi-delete-button :id="selectedKpi.id"></kpi-delete-button>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
import KpiDeleteButton from '@/components/kpis/KpiDeleteButton.vue';
export default {
  props: ['id'],
  emits: ['prev', 'next'],
  components: {
    KpiDeleteButton,
  },

  data() {
    return {
      selectedKpi: null,
      search: '',
    };
  },

  computed: {
    nextKpi() {
      const allKpis = this.$store.getters['kpis/kpis'];
      let selectedKpiIndex = allKpis.findIndex(
        (kpi) => kpi.id == this.selectedKpi.id
      );
      return allKpis[++selectedKpiIndex];
    },
    prevKpi() {
      const allKpis = this.$store.getters['kpis/kpis'];
      let selectedKpiIndex = allKpis.findIndex(
        (kpi) => kpi.id == this.selectedKpi.id
      );
      return allKpis[--selectedKpiIndex];
    },
    showingRegisters(){
      return this.$route.path.includes('registers')
    },
  },

  methods: {
    goingPrev() {
      this.$emit('prev');
      this.$router.push('/kpis/' + this.prevKpi.id);
    },
    goingNext() {
      this.$emit('next');
      this.$router.push('/kpis/' + this.nextKpi.id);
    },

    tableRowClassName({ row }) {
      if (row.required) {
        return 'required-field';
      }
      return '';
    },
    fetchKpi() {
      this.selectedKpi = this.$store.getters['kpis/kpis'].find(
        (kpi) => kpi.id == this.id
      );
    },

  },
  created() {
    // Take id from props
    this.fetchKpi();
  },
};
</script>

<style>
.actions {
  display: flex;
  justify-content: space-between;
}
.properties,
.fields {
  text-align: justify;
  margin: auto;
  width: 50%;
  padding: 1rem;
}

.fields {
  width: 100%;
}

.el-table__row .required-field,
.el-table .required-field {
  font-weight: bolder;
}

.prevkpi-enter-from {
  opacity: 0;
  transform: translateX(-300px);
}

.prevkpi-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.prevkpi-enter-active,
.nextkpi-enter-active {
  transition: all 0.4s ease-out;
}

.prevkpi-leave-active,
.nextkpi-leave-active {
  transition: all 0.4s ease-in;
}

.prevkpi-enter-to,
.prevkpi-leave-from,
.nextkpi-enter-to,
.nextkpi-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.nextkpi-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.nextkpi-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>
