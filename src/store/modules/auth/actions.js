let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
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
    const expiresIn = 1200 * 1000; // 1200 seconds of active session
    const expirationDate = new Date().getTime() + expiresIn;

    // localStorage.setItem('token', responseData.idToken);
    // localStorage.setItem('userId', responseData.localId);
    localStorage.setItem("token", "tokendeprueba");
    localStorage.setItem("userId", 1);
    localStorage.setItem("tokenExpiration", expirationDate);

    console.log(expirationDate);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      // token: responseData.idToken,
      // userId: responseData.localId,
      token: "tokendeprueba",
      userId: 1,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) return;

    timer = setTimeout(function () {
      context.commit("setAutoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("logout");
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
