<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
      
      <!-- Middle Area -->
      <div class="content flex-1 flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
        
        <!-- Logo -->
        <div class="mb-6">
          <img src="@/assets/logo.png" alt="Logo" class="logo w-32">
        </div>
        
        <!-- Form Area -->
        <div class="bg-white rounded-xl p-8 shadow-xl max-w-lg space-y-8 w-full">  
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                登录到你的账户
            </h2>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md mb-4">
                    <div class="mb-4 flex items-center relative">
                        <input id="email" name="email" type="text" v-model="credentials.identifier" required
                            class="pl-10 appearance-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="邮箱或用户名">
                        <img src="@/assets/svg/user.svg" class="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6" alt="User Icon" />
                    </div>
                    <div class="flex items-center relative">
                        <input id="password" name="password" type="password" v-model="credentials.password" required
                            class="pl-10 appearance-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="密码">
                        <img src="@/assets/svg/password.svg" class="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6" alt="Password Icon" />
                    </div>
                </div>
                <!-- 其他代码保持不变 -->
            </form>
            <!-- rest of your form area code -->
        </div>
    </div>

    <!-- Footer Area -->
    <div class="flex justify-center py-6 bg-gray-200">
        <p class="text-gray-500 text-sm">版权所有 © 2023 公司名称</p>
    </div>
  </div>
</template>

<script setup>
// 引入需要的库和函数
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { login, weChatLogin } from "@/api/auth";

// 定义响应式数据
const credentials = ref({ identifier: "", password: "" });
// 获取路由实例
const router = useRouter();

// 定义提交处理函数
const handleSubmit = async () => {
  try {
      await login(credentials.value);
      router.push("/");
  } catch (error) {
      console.error("Login failed:", error.message);
  }
};

// 定义微信登录处理函数
const handleWeChatLogin = async () => {
  try {
      await weChatLogin();
      router.push("/");
  } catch (error) {
      console.error("WeChat login failed:", error.message);
  }
};
</script>

<style scoped>
/* 自定义样式 */
.logo {
  margin-left: 300px;
}
.shadow-xl {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}
.rounded-xl {
    border-radius: 1rem;
}

/* 动态效果 */
input:focus, button:focus {
    border-color: #ff9900;
}
.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
}
.content {
  width: 1700px;
  margin: 0 auto;
}
.login-box {
    max-width: 400px;  
}

/* 添加Google Material Icons的样式 */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
