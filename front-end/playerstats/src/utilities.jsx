import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const signUp = async (email, password) => {
  let response = await api.post("signup/", {
    email: email,
    password: password,
  });
  if (response.status === 201) {
    let { user, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert(response.data);
  return null;
};

export const signIn = async (email, password) => {
  let response = await api.post("login/", {
    email: email,
    password: password,
  });
  if (response.status === 200) {
    let { user, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert("credentials failed");
  return null;
};

export const logOut = async () => {
  let response = await api.post("logout/")
  if(response.status === 204){
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    return null
  }
  alert("Something went wrong during log out!")
}

export const confirmUser = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get("info/");
    if (response.status === 200) {
      return response.data.display_name;
    }
  }
  return null;
};