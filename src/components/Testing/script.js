export default {
  name: 'Home',
  components: {
    HeaderTesting: () => import('./Header/Header'),
  },
  data(){
    return{
      userAnswer: [],
      
      userAnswerText: '',
      currentQuestion: 1,
      questions: [],
      questionsReady: false,
      status: 'processing',
      answers: {
        candidateId:'' ,
        results: [
          
        ]
      },

    }
  },
  mounted(){
    this.getQuestions();
    this.answers.candidateId = parseInt(this.$route.query.userId)
  },
  methods: {
      getQuestions(){

        this.$http.post(`/Hr/GetQuestions?userId=${this.$route.query.userId}`)
        .then((response) => {
          this.questions = response.data.questions
        })
        .catch( (error) => {
          this.questions = [
            {
              id: 1,
              question: 'Как нельзя инициализировать переменную?',
              tags: ['JavaScript'],
              type: 'picker',
              
              answers: [
                {
                  val: 1,
                  value: 'let',
                },
                {
                  val: 2,
                  value: 'var',
                },
                {
                  val: 3,
                  value: 'this',
                },
                {
                  val: 4,
                  value: 'const',
                },
              ],
            },
            {
              id: 2,
              question: 'В каком хуке жизненного цикла стоит делать обращение к серверу?',
              tags: ['JavaScript', 'ReactJS'],
              type: 'short',
            },
            {
              id: 3,
              question: 'Напишите код, который выдаст нужными банкнотами заданную сумму. <br>В результате ожидается строка вида <pre>"50 - 1 купюра, 100 - 2 купюры, 500 - 5 купюр ..."</pre>',
              description: 'let amount = 3300, money = {"50" : 0, "100": 4, "500": 40, "1000": 4}',
              tags: ['Алгоритмы', 'JavaScript'],
              type: 'long',
            },
            {
              id: 4,
              question: 'Выберите правильные утверждения',
              tags: ['HTML', 'CSS'],
              type: 'checkboxes',
              answers: [
                {
                  val: 1,
                  value: 'HTML является языком программирования',
                },
                {
                  val: 2,
                  value: 'Для использования переменных в CSS необходимо использовать препроцессоры',
                },
                {
                  val: 3,
                  value: 'В CSS обязательно надо соблюдать регистр',
                },
                {
                  val: 4,
                  value: 'В CSS можно использовать в качестве единиц измерения только % и px',
                },
                {
                  val: 5,
                  value: 'Запись <table width="100px"> является корректной',
                },
                {
                  val: 6,
                  value: 'IE является средством для совместимости устаревших продуктов',
                },
                {
                  val: 7,
                  value: 'Браузер Safari обновляется для Windows',
                },
                {
                  val: 8,
                  value: 'Браузер Internet Explorer скоро обновится до 12 версии',
                },
              ],
            }
          ]
          this.questionsReady === true
          console.log(this.questions)
        });
      },
      setAnswer(){
        let type = this.questions[this.currentQuestion-1].type
        if(type === 'picker' || type === 'checkboxes') {
          this.answers.results.push({
              "questionId": this.questions[this.currentQuestion-1].id,
              "value": this.userAnswer.toString(),
              "time": "1000"
          })
        } else {
          this.answers.results.push({
            "questionId": this.questions[this.currentQuestion-1].id,
            "value": this.userAnswerText,
            "time": "1000"
          })
        }
        this.userAnswer = []
        this.userAnswerText = ''
      },
      next(){
        if( !(this.userAnswerText === '' && this.userAnswer.length < 1) ){
          this.setAnswer()
          this.currentQuestion++
        } 
      },
      send(){
          
          this.$http.post(`/Hr/SaveResults?userId=${this.$route.query.userId}`, this.answers)
          .then((response) => {
            this.status = 'sended'
          })
          .catch( (error) => {
            this.status = 'sended'
          })
      },
      sendAll(){
        if( !(this.userAnswerText === '' && this.userAnswer.length < 1) ){
          this.setAnswer()
          this.send()
        }
      },
      sendLose(){
        this.lose()
        this.send()
      },

      lose(){
        this.answers.results.push({
            "questionId": this.questions[this.currentQuestion-1].id,
            "value": '',
            "time": "1000"
        })
        this.currentQuestion++
      }

  }
}