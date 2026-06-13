<script setup lang="ts">
import { ref } from 'vue'
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-vue-next'
import { companyFooter, sectionsFooter, legalFooter } from '~/consts/footer'

const email = ref('')
const isSubmitted = ref(false)

function handleSubscribe() {
  if (email.value) {
    isSubmitted.value = true
    email.value = ''
    setTimeout(() => { isSubmitted.value = false }, 3000)
  }
}
</script>

<template>
  <footer class="bg-slate-950 border-t border-slate-900 text-slate-400 mt-20 font-sans">
    <div class="mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        <div class="space-y-6 lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-3 group select-none w-fit">
            <div class="w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
              <span class="text-white font-bold text-lg tracking-wider">C</span>
            </div>
            <span class="text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:opacity-90">
              COBO-NEWS
            </span>
          </NuxtLink>
          
          <p class="text-sm text-slate-400/90 leading-relaxed max-w-sm">
            Delivering trusted news, dynamic profiles, and deep operational insights from Cambodia and beyond. Independent, factual, and forward-thinking.
          </p>

          <div class="space-y-3 max-w-sm pt-2">
            <h5 class="text-xs font-bold uppercase tracking-widest text-slate-300">Stay Updated</h5>
            <form @submit.prevent="handleSubscribe" class="relative flex items-center group/form">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email address" 
                required
                class="w-full h-11 bg-slate-900/60 border border-slate-800/80 rounded-xl pl-4 pr-12 text-sm text-slate-100 placeholder-slate-500 shadow-inner transition-all duration-300 focus:outline-none focus:border-red-600 focus:bg-slate-900 focus:ring-4 focus:ring-red-600/10"
              />
              <button 
                type="submit"
                class="absolute right-1.5 w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-red-500 active:scale-95 shadow-md shadow-red-600/10 overflow-hidden"
                aria-label="Subscribe"
              >
                <ArrowRight 
                  class="w-4 h-4 transition-transform duration-300" 
                  :class="isSubmitted ? 'translate-x-10' : 'group-hover/form:translate-x-0.5'" 
                />
              </button>
            </form>
            
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <p v-if="isSubmitted" class="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Thank you for subscribing!
              </p>
            </Transition>
          </div>
        </div>

        <div>
          <h4 class="text-slate-200 font-bold text-xs uppercase tracking-widest mb-5">Sections</h4>
          <ul class="space-y-3.5">
            <li v-for="item in sectionsFooter" :key="item.label">
              <NuxtLink 
                :to="item.to" 
                class="text-sm text-slate-400 hover:text-white transition-all duration-200 flex items-center group/link w-fit"
              >
                <span class="bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px] pb-0.5">
                  {{ item.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-slate-200 font-bold text-xs uppercase tracking-widest mb-5">Company</h4>
          <ul class="space-y-3.5">
            <li v-for="item in companyFooter" :key="item.label">
              <NuxtLink 
                :to="item.to" 
                class="text-sm text-slate-400 hover:text-white transition-all duration-200 flex items-center group/link w-fit"
              >
                <span class="bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px] pb-0.5">
                  {{ item.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-slate-200 font-bold text-xs uppercase tracking-widest mb-5">Legal</h4>
          <ul class="space-y-3.5">
            <li v-for="item in legalFooter" :key="item.label">
              <NuxtLink 
                :to="item.to" 
                class="text-sm text-slate-400 hover:text-white transition-all duration-200 flex items-center group/link w-fit"
              >
                <span class="bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px] pb-0.5">
                  {{ item.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-slate-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p class="text-xs text-slate-500 text-center sm:text-left order-2 sm:order-1 tracking-wide">
          &copy; {{ new Date().getFullYear() }} COBO-NEWS. All rights reserved. Cambodia News Network.
        </p>
        
        <div class="flex gap-3 order-1 sm:order-2">
          <a href="#" class="w-9 h-9 bg-slate-900/50 border border-slate-800/40 text-slate-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-red-600/20" aria-label="Facebook">
            <Facebook class="w-4.5 h-4.5" />
          </a>
          <a href="#" class="w-9 h-9 bg-slate-900/50 border border-slate-800/40 text-slate-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-red-600/20" aria-label="Twitter">
            <Twitter class="w-4.5 h-4.5" />
          </a>
          <a href="#" class="w-9 h-9 bg-slate-900/50 border border-slate-800/40 text-slate-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-red-600/20" aria-label="Instagram">
            <Instagram class="w-4.5 h-4.5" />
          </a>
          <a href="#" class="w-9 h-9 bg-slate-900/50 border border-slate-800/40 text-slate-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-red-600/20" aria-label="Youtube">
            <Youtube class="w-4.5 h-4.5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>