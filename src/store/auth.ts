import { defineStore } from 'pinia';

interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  getters: {
    // 获取用户信息
    currentUser: (state) => state.user,

    // 检查是否已登录
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,

    // 获取用户角色
    userRole: (state) => state.user?.role || '',
  },

  actions: {
    // 登录
    async login(credentials: { username: string; password: string }) {
      try {
        // 这里应该调用实际的登录API
        // 模拟登录成功
        const mockUser: User = {
          id: 1,
          username: credentials.username,
          name: 'admin',
          role: 'admin',
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        // 保存到状态
        this.user = mockUser;
        this.token = mockToken;
        this.isAuthenticated = true;

        // 保存到本地存储
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        return { success: true };
      } catch (error) {
        console.error('登录失败:', error);
        return { success: false, error };
      }
    },

    // 登出
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // 初始化认证状态（从本地存储恢复）
    initAuth() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          this.user = user;
          this.token = token;
          this.isAuthenticated = true;
        } catch (error) {
          console.error('解析用户信息失败:', error);
          this.logout();
        }
      }
    },

    // 检查token是否有效（这里可以添加token过期检查逻辑）
    checkTokenValidity() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return false;
      }

      // 这里可以添加token过期检查逻辑
      // 例如：检查token是否过期，如果过期则清除状态

      return true;
    },
  },
});