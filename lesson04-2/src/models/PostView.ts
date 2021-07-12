
class PostView {
    postId:number;
    title: String;
    content: String;
    userId:number;
    userName: String;
    isEditable: boolean;

    constructor(postId: number, title: String, content: String, userId:number, userName: String, isEditable: boolean){
        this.postId = postId;
        this.title=title;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
        this.isEditable = isEditable;
    }
}

export default PostView;
