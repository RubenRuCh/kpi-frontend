export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async auth(context /*, payload*/) {
    // const mode = payload.mode;
    // let action = 'signInWithPassword';
    // if (mode === 'signup') action = 'signUp';

    // const response = await fetch(`${action}`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: payload.email,
    //     password: payload.password,
    //     returnSecureToken: true,
    //   }),
    // });

    // const responseData = await response.json();

    // if (!response.ok || !responseData) {
    //   const error = new Error(response.message || 'Failed to authenticate');
    //   throw error;
    // }

    // const expiresIn = +responseData.expiresIn * 1000;

    // localStorage.setItem('token', responseData.idToken);
    // localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('token', 'tokendeprueba');
    localStorage.setItem('userId', 1);

    context.commit('setUser', {
      // token: responseData.idToken,
      // userId: responseData.localId,
      token: 'tokendeprueba',
      userId: 1,
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    context.commit('logout');
  },
};
