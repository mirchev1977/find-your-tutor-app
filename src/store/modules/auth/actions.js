let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRajqckS5DIg71YEy5v5Qv1K33tDBqLkc';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRajqckS5DIg71YEy5v5Qv1K33tDBqLkc';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    let rData = '';
    if (mode === 'signup') {
      const resp = await fetch(
        `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/users/${responseData.localId}.json?auth=` + responseData.idToken,
        {
          method: 'PUT',
          body: JSON.stringify({ firstName: payload.firstName, lastName: payload.lastName, pic: payload.pic})
        }
      );

      const respData = await resp.json();
      rData = await respData;

      if (!resp.ok) {
        const error = new Error(
          respData.message || 'Failed to authenticate. Check your login data.'
        );
        throw error;
      }
    } else {
      const resp = await fetch(
        `https://find-your-tutor-app-default-rtdb.europe-west1.firebasedatabase.app/users/${responseData.localId}.json?auth=` + responseData.idToken,
        {
          method: 'GET',
        }
      );

      const respData = await resp.json();
      rData = await respData;

      if (!resp.ok) {
        const error = new Error(
          respData.message || 'Failed to authenticate1. Check your login data.'
        );
        throw error;
      }
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);
    localStorage.setItem('firstName', rData.firstName);
    localStorage.setItem('lastName', rData.lastName);
    localStorage.setItem('pic', rData.pic);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      firstName: rData.firstName,
      lastName: rData.lastName,
      pic: rData.pic,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const pic = localStorage.getItem('pic');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        pic: pic
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('pic');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
