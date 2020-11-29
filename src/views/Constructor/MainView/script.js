export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      news: [
        {
          tagLink: "https://www.gpbspace.ru/blog/?tags=%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%B8%D0%BD%D0%B3",
          imageLink: "https://www.gpbspace.ru/upload/iblock/39b/39baed7d007fbaf4b7154943867c312c.jpeg",
          blogLink: "https://www.gpbspace.ru/blog/2275/",
          date: '27 Ноября, 2020',
          tag: 'маркетинг',
          title: 'Как автоматизация помогает улучшить поисковый маркетинг',
          description: 'Расскажем, что такое поисковый маркетинг, и так ли важна автоматизация',
        },
        {
          tagLink: "https://www.gpbspace.ru/blog/?tags=%D0%94%D0%91%D0%9E",
          imageLink: "https://www.gpbspace.ru/upload/iblock/6c5/6c5432b8b8ba4b98c2cf0aed9359662a.jpg",
          blogLink: "https://www.gpbspace.ru/blog/2281/",
          date: '9 Ноября, 2020',
          tag: 'ДБО',
          title: 'Газпромбанк предоставил клиентам доступ к платежному сервису «Кошелек Pay»',
          description: 'Держателем Mastercard стал доступен новый платежный сервис',
        },
        {
          tagLink: "https://www.gpbspace.ru/blog/?tags=%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5",
          imageLink: "https://www.gpbspace.ru/upload/iblock/d94/d942bb86b30333ee1bdf2ad219c20f2f.jpg",
          blogLink: "https://www.gpbspace.ru/blog/2280/",
          date: '2 Ноября, 2020',
          tag: 'событие',
          title: 'Спорт за гранью реальности',
          description: 'Газпромбанк выходит в другую реальность!',
        },
      ]
    }

  },
  mounted() {
  },
  methods: {

  }
}
