
//登录
function login(gist,token){
  localStorage.GIST_ID=gist
  localStorage.PERSONAL_TOKEN=token
  location.href="index.html"
}

// 获取Gist
function getGist(){
  return localStorage.GIST_ID;
}

function getToken(){
  return localStorage.PERSONAL_TOKEN;
}
