export default {
  name: 'Home',
  data(){
    return{
      login: 'Administrator',
      password: 'Pass123$',
      remember: false,
      // login: '',
      // password: ''
    }
  },
  methods: {
    
    Auth(){
      let cookie = this.$cookie
      let router = this.$router
      this.$http.post('/Authorize/Login', {
        "login": this.login,
        "password": this.password
      })
      .then(function (response) {
        router.push({path: '/dashboard'})
      })
      .catch(function (error) {
      });
      
    }
  }
}