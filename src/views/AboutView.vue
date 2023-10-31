<template>
  <div class="about">
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import request from '@/utils/request';

onMounted(async () => {
  const email = 'cx3262881792@gmail.com';  // 替换为你想要发送的邮箱地址
  try {
    const response = await request({
      method: 'get',
      url: 'orders/a',
      // params: { email }
    });
    console.log('Response:', response);  // 输出服务器的响应
  } catch (error) {
    console.error('Error:', error);  // 输出任何错误
  }
});
</script>
