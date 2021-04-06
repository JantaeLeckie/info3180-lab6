/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

app.component('news-list', {
  name: 'newslist',
  template: `
      <div class="news">
        <h2>News</h2>
        <div class="form-inline d-flex justify-content-center">
            <div class="form-group mx-sm-3 mb-2">
              
              <label class="sr-only" for="search">Search</label>
              <input type="search" name="search" v-model="searchTerm"
              id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
              
              <button class="btn btn-primary mb-2"
              @click="searchNews">Search</button>
            </div>
        </div>
        <div class="newnews">
          <ul class="news__list">
            <li v-for="article in articles" class="news__item">
              <h5 class="card-title">{{ article.title }}</h5>
              <img class="card-img-top" :src= article.urlToImage alt="Card image cap">
              <p class="card-text">{{ article.description }}</p>
            </li>
          </ul>
        </div>
      </div>
  `,created() {
      let self = this;
      fetch('https://newsapi.org/v2/top-headlines?country=us',
      {
        headers: {
        'Authorization': 'Bearer b3a94ea226ed4589945b11d85d8c6fae'
        }
      })
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        console.log(data);
        self.articles = data.articles;
        });
    },data() {
      return { articles: [], searchTerm: '' }
    }, 
    methods: {
      searchNews() {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q='+
     self.searchTerm + '&language=en', {
      headers: {
      'Authorization': 'Bearer b3a94ea226ed4589945b11d85d8c6fae'
      }
     })
      .then(function(response) {
      return response.json();
      })
      .then(function(data) {
      console.log(data);
      self.articles = data.articles;
      });
      }
      }
   });
  

   
app.mount('#app');