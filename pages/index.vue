<template>
  <div>
      <article :key="data" v-for="(item,data) in articles">
        <nuxt-link :to="{ name: 'article-id', params:{ id: articles[data].id  } }"><h2>{{ articles[data].Title }}</h2></nuxt-link>
        <p>{{ ToText(articles[data].Content)|ellipsis}}</p>
      </article>
  </div>
</template>

<script>
export default {
  data(){
    return {
      articles: [
          { id: Number,Title: '加载中', Content: '', Author: '',categorie: '',Time: '',url: ''}
      ]
    }
  },
  filters: {
    ellipsis: function(value) {
        let i = 100;
        if(value.length > i){
            return value.slice(0,i)+'...'
        }
        return value
    }
  },
  beforeCreate(){
    this.$axios.get('Article.php',{
        params: {
            data: 'getAllArticle'
        }
    }).then((response)=>
        this.articles = response.data
    ).catch(function(err){
        console.log(err);
    })
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
  }
}
</script>

<style lang="scss" scoped>
div { 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    article {
      padding: 15px;
      a {
        color: #000000;
        text-decoration: none;
      }
    }
}
</style>