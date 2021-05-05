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

    if (!response.ok || !responseData) {
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }

    localStorage.setItem('token', 'tokendeprueba');
    localStorage.setItem('user', data.user);

    context.commit('setUser', {
      token: 'tokendeprueba',
      user: data.user,
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    context.commit('logout');
  },
};
