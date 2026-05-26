import { defineStore } from "pinia";

export type PublicLanguage = "km" | "en";

export const usePublicLanguageStore = defineStore("publicLanguage", {
  state: () => ({
    language: "km" as PublicLanguage,
    initialized: false,
  }),

  getters: {
    isKhmer: (state) => state.language === "km",
    isEnglish: (state) => state.language === "en",
  },

  actions: {
    initLanguage() {
      if (!process.client || this.initialized) return;

      const saved = localStorage.getItem("public_language");

      if (saved === "km" || saved === "en") {
        this.language = saved;
      } else {
        this.language = "km";
        localStorage.setItem("public_language", "km");
      }

      this.initialized = true;
    },

    setLanguage(language: PublicLanguage) {
      this.language = language;

      if (process.client) {
        localStorage.setItem("public_language", language);
      }
    },

    toggleLanguage() {
      const nextLanguage = this.language === "km" ? "en" : "km";
      this.setLanguage(nextLanguage);
    },

    text(km: string, en?: string | null) {
      if (this.language === "km") {
        return km || en || "";
      }

      return en || km || "";
    },
  },
});