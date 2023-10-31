<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" :src="loginImage" alt="Your Logo">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录到你的账户
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">邮箱或用户名</label>
              <input id="email" name="email" type="text" v-model="credentials.identifier" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="邮箱或用户名">
            </div>
            <div>
              <label for="password" class="sr-only">密码</label>
              <input id="password" name="password" type="password" v-model="credentials.password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="密码">
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember" name="remember" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember" class="ml-2 block text-sm text-gray-900">
                记住我
              </label>
            </div>
  
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                忘记密码?
              </a>
            </div>
          </div>
  
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              登录
            </button>
          </div>
        </form>
  
        <div class="text-center">
          <button @click="handleWeChatLogin" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            微信登录
          </button>
        </div>
  
        <div class="text-center mt-4 text-sm">
          <span>还没有账号？</span>
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            注册
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Assume that 'login' and 'weChatLogin' are functions that handle
// the actual login logic (e.g., making an API request)
import { login, weChatLogin } from '@/api/auth';
import loginImage from '@/assets/img/login.png';  // 导入图片

const credentials = ref({ identifier: '', password: '' });
const router = useRouter();

const handleSubmit = async () => {
  try {
    await login(credentials.value);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

const handleWeChatLogin = async () => {
  try {
    await weChatLogin();
    router.push('/');
  } catch (error) {
    console.error('WeChat login failed:', error.message);
  }
};

</script>

  
  <style scoped>
  /* You can add more custom styles here */
  </style>
  