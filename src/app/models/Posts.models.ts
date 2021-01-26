export class Post{
  photo: string;
  constructor(public title: string, public content: string, public createAt: string, public like: number, public dislike: number) {
  }
}
