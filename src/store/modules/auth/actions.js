export default {
  async login(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const authData = {
      user: data.user,
      password: data.password,
    };

    const response = await fetch(`${backendUrl}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    const responseData = await response.json();

    const plainUser = JSON.stringify(responseData);    if (!response.ok || !responseData) {
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }
    localStorage.setItem('currentUser', plainUser);

    context.commit('setUser', {
      user: 'currentUser',
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    context.commit('logout');
  },
};
