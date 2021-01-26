import { Injectable } from '@angular/core';
import {Post} from '../models/Posts.models';
import {Subject} from 'rxjs';
import 'firebase';
import firebase from 'firebase';

@Injectable()
export class PostsService {
  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor() {}
  // tslint:disable-next-line:typedef
    emitPosts(){
      this.postSubject.next(this.posts);
    }
  // tslint:disable-next-line:typedef
    savePost(){
    firebase.database().ref('/posts').set(this.posts);
    }
  // tslint:disable-next-line:typedef
    getPosts(){
    firebase.database().ref('/posts')
      .on('value', (data) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
    }

  // tslint:disable-next-line:typedef
    createNewPost(newPost: Post){
    this.posts.push(newPost);
    this.savePost();
    this.emitPosts();
    console.log(this.posts);
    }
  // tslint:disable-next-line:typedef
    removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEL) => {
        if (postEL === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePost();
    this.emitPosts();
    }

  // tslint:disable-next-line:typedef
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement ...');
          },
          (error) => {
            console.log('Erreur de chargement : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }

  // tslint:disable-next-line:typedef
  lovePost(post: Post){
    post.like += 1;
    this.savePost();
    this.emitPosts();
  }
  // tslint:disable-next-line:typedef
  dontLove(post: Post){
    post.dislike += 1;
    this.savePost();
    this.emitPosts();
  }
}
