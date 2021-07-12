import User from "./User";

interface IPost {
  id?: number;
  title?: String;
  content?: String;
  userId?:number;
  userName?:String;
}

class Post {
  id: number;
  title: String;
  content: String;
  userId: number;
  userName:String;

  constructor(obj?: IPost) {
    this.id = obj && obj.id || 0;
    this.title = obj && obj.title || '';
    this.content = obj && obj.content || '';
    this.userId = obj && obj.userId || 0;
    this.userName = obj && obj.userName || '';
  }
}

export default Post;
