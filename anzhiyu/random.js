var posts=["2024/07/04/AOP/","2024/07/04/JSR/","2024/07/20/IoC/","2024/07/20/从n维向量空间到线性无关和线性相关/","2024/07/06/事务(transaction)/","2024/08/07/Volta/","2024/08/17/你的名字语录/","2024/01/19/卷积公式/","2024/08/22/你的名字/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };