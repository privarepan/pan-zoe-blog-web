const state = {
  isLoading:false,
  menuPosition:'1-0',
  token:null,
  user:null,
}

const mutations = {
  setShowLoading(state,val){
    state.isLoading = val;
  },
  setMenuPosition(state,id){
    state.menuPosition = id;
  },
  setToken(state,token){
    state.token = token;
  },
  setUser(state,user){
    state.user = user;
  }
}


export  {
  state,mutations
}
