<script setup lang="ts">
const emit = defineEmits<{
  submit: [payload: any];
  cancel: [];
}>();

const form = reactive({
  title: "",
  excerpt: "",
  is_published: false,
});

const submitForm = () => {
  emit("submit", {
    title: form.title,
    excerpt: form.excerpt,
    is_published: form.is_published,
  });
};
</script>

<template>
  <form class="rounded-3xl border border-border bg-card p-6 shadow-sm" @submit.prevent="submitForm">
    <div class="space-y-5">
      <AppInput
        v-model="form.title"
        label="Article Title"
        placeholder="Write article title..."
      />

      <AppTextarea
        v-model="form.excerpt"
        label="Excerpt"
        placeholder="Write short excerpt..."
      />

      <label class="flex items-center gap-3 text-sm font-semibold">
        <input v-model="form.is_published" type="checkbox" class="h-5 w-5" />
        Publish now
      </label>

      <div class="flex justify-end gap-3 border-t border-border pt-5">
        <AppButton type="button" variant="secondary" @click="emit('cancel')">
          Cancel
        </AppButton>

        <AppButton type="submit">
          Save Article
        </AppButton>
      </div>
    </div>
  </form>
</template>