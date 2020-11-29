export default {
  name: 'Home',
  data(){
    return {
      isAuth: false
    }
  },
  components: {
    Auth: () => import('@/components/AuthTesting/AuthTesting'),
    Testing: () => import('@/components/Testing/Testing')
  }
}
