<template>
  <div>
      <article :key="data" v-for="(item,data) in articles">
        <nuxt-link :to="{ name: 'article-id', params:{ id: articles[data].id  } }">
          <h2><span>#</span>{{ articles[data].Title }}</h2>
        </nuxt-link>
        <p v-show="articles[data].subtitle==''?false:true">{{ articles[data].subtitle }}</p>
        <p>{{ ToText(articles[data].Content)|ellipsis}}</p>
        <p>{{ articles[data].Author }} 写于 {{ articles[data].Time }} {{ articles[data].categorie }} <nuxt-link :to="{ name: 'article-id', params:{ id: articles[data].id  } }">查看更多</nuxt-link></p>
      </article>
  </div>
</template>

<script>
export default {
  data(){
    return {
      articles: [
          { id: Number,Title: '', subtitle:'', Content: '', Author: '',categorie: '',Time: '',url: ''}
      ]
    }
  },
  filters: {
    ellipsis: function(value) {
        let i = 230;
        if(value.length > i){
            return value.slice(0,i)+'...'
        }
        return value
    }
  },
  async asyncData({ app }) {
    let articles = await app.$axios.get('Article.php',{ params:{ data: 'getAllArticle' }})
    return { 
      articles:articles.data,
    }
  },
  mounted() {
      this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      })
  },
  methods: {
    ToText(HTML)
    {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
    }
  },
}
</script>

<style lang="scss" scoped>
div { 
    display: block;
    width: 100%;
    height: 100%;
    margin: 0px 0px 0px 0px;
    padding: 0;
    background-color: #ffffff;
    box-sizing: border-box;
    article {
      display: block;
      border-bottom: 1px solid rgb(226, 226, 226);
      padding: 15px;
      margin: 10px 0px 10px 0px;
      background-color: #ffffff;
      margin-top: 10px;
      a {
        color: #000000;
        text-decoration: none;
        h2 {
          span {
            color: cornflowerblue;
            margin-right: 5px;
          }
        }
      }
      p {
        color: #363636;
        a {
          float: right;
        }
      }
      p:nth-last-child(1){
        color: #8d8d8d;
        a {
          color: #8d8d8d;
        }
      }
    }
    
    @media all and (min-width: 750px) {
      article{
        width: 700px;
        margin: auto;
      }
    }
}
#nav {         
    transition: 2s;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 0px;
    a {
        text-align: center;
        cursor: pointer;
        line-height: 50px;
        width: 140px;
        font-weight: 600;
        text-decoration: none;
        color: #5e5e5e;
        transition: 0.51s;
        span {
            bottom: 0;
            display: flex;
            width: 0%;
            height: 2px;
            transition: 0.51s;
            background-color: cornflowerblue;
        }
    }
}
</style>