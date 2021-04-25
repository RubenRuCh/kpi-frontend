<template>
  <div>
    <section>
      <el-card shadow="hover">
        <section class="actions nav">
          <el-button
            :disabled="!!!prevField"
            icon="el-icon-back"
            @click="goingPrev"
          ></el-button>
          <el-button
            :disabled="!!!nextField"
            icon="el-icon-right"
            @click="goingNext"
          ></el-button>
        </section>

        <h2>{{ $t('field-properties') }}</h2>

        <section class="properties">
          <h3>
            <el-tag>{{ $t('title') }}</el-tag> {{ selectedField.title }}
          </h3>
          <h3>
            <el-tag>{{ $t('description') }}</el-tag>
            {{ selectedField.description }}
          </h3>

          <h4 v-if="selectedField.type">
            <el-tag type="success">{{ $t('field-type') }}</el-tag>
            {{ selectedField.type }}
          </h4>

          <h4 v-if="selectedField.maxlength && selectedField.maxlength > 0">
            <el-tag type="success">{{ $t('maxlength') }}</el-tag>
            {{ selectedField.maxlength }} {{ $t('chars') }}
          </h4>

          <h4 v-if="selectedField.values">
            <el-tag type="danger">{{ $t('available-values') }}</el-tag>
            <el-badge v-for="value in selectedField.values" :key="value"
              ><el-button size="small">{{ value }}</el-button></el-badge
            >
          </h4>
        </section>
      </el-card>
    </section>

    <section>
      <el-card shadow="hover">
        <div class="actions">
          <el-tooltip
            v-if="selectedField.fillable"
            class="item"
            effect="dark"
            :content="$t('fillable-tooltip')"
            placement="top-start"
          >
            <base-badge
              style="margin-right: auto"
              :title="$t('fillable')"
              type="success"
            ></base-badge>
          </el-tooltip>

          <el-tooltip
            v-if="selectedField.required"
            class="item"
            effect="dark"
            :content="$t('required-tooltip')"
            placement="top-start"
          >
            <base-badge
              style="margin-right: auto"
              :title="$t('required')"
              type="warning"
            ></base-badge>
          </el-tooltip>

          <el-tooltip
            v-else
            class="item"
            effect="dark"
            :content="$t('optional-tooltip')"
            placement="top-start"
          >
            <base-badge
              style="margin-right: auto"
              :title="$t('optional')"
              type="info"
            ></base-badge>
          </el-tooltip>

          <section class="buttons">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              @click="$router.push($route.path + '/edit')"
              >{{$t('modify')}}</el-button
            >

            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              disabled
              @click="$router.push($route.path)"
              >{{$t('delete')}}</el-button
            >
          </section>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  emits: ['prev', 'next'],
  data() {
    return {
      selectedField: null,
    };
  },

  computed: {
    nextField() {
      const allFields = this.$store.getters['fields/fields'];
      let selectedFieldIndex = allFields.findIndex(
        (field) => field.id == this.selectedField.id
      );
      return allFields[++selectedFieldIndex];
    },
    prevField() {
      const allFields = this.$store.getters['fields/fields'];
      let selectedFieldIndex = allFields.findIndex(
        (field) => field.id == this.selectedField.id
      );
      return allFields[--selectedFieldIndex];
    },
  },

  methods: {
    goingPrev() {
      this.$emit('prev');
      this.$router.push('/fields/' + this.prevField.id);
    },
    goingNext() {
      this.$emit('next');
      this.$router.push('/fields/' + this.nextField.id);
    },
    fetchField() {
      this.selectedField = this.$store.getters['fields/fields'].find(
        (field) => field.id == this.id
      );
    },
  },
  created() {
    // Take id from props
    this.fetchField();
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}
.properties {
  text-align: justify;
  margin: auto;
  width: 50%;
  padding: 1rem;
}

.prevfield-enter-from {
  opacity: 0;
  transform: translateX(-300px);
}

.prevfield-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.prevfield-enter-active,
.nextfield-enter-active {
  transition: all 0.4s ease-out;
}

.prevfield-leave-active,
.nextfield-leave-active {
  transition: all 0.4s ease-in;
}

.prevfield-enter-to,
.prevfield-leave-from,
.nextfield-enter-to,
.nextfield-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.nextfield-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.nextfield-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>
