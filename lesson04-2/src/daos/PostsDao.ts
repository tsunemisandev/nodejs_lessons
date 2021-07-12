import knex from '../database/connection';
import Post from '../models/Post';
import User from '../models/User';
import postRoute from '../routes/PostRoute';

class PostsDao {
   async include(newPost: Post) {
    return knex('posts').insert({user_id: newPost.userId, title: newPost.title, content: newPost.content});
  }
  async get(id: number) {
    const post = await knex.select<Post>('title','content','id','user_id as userId').table('posts').where({id: id}).first();
    return post;
  }
  async list() {
    const rtn = new Array<Post>();
    const posts = await knex.select(['posts.*', 'users.*', 'posts.id as post_id']).table('posts')
    .innerJoin('users', 'posts.user_id', 'users.id').orderBy('created_at','desc')
    .then(data=>{
      data.forEach(data=>{
        const post = new Post({
          userId:data['user_id'],
          userName: data['name'],
          id: data['post_id'],
          title: data['title'],
          content: data['content']
        });
        rtn.push(post);
      })
    });
    return rtn;
  }
  async update(post: Post) {
    console.log(`update ${post}`)
   const updated = await knex('posts').where({ id: post.id, user_id: post.userId }).update({
      title: post.title,
      content: post.content,
    });
    console.log(`updated ${updated}`)
  }
}
export default PostsDao;
