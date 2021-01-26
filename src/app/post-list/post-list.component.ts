import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../services/posts.service';
import {Router} from '@angular/router';
import {Post} from '../models/Posts.models';
import {Subscription} from 'rxjs';
import { registerLocaleData} from '@angular/common';
import localFr from '@angular/common/locales/fr';
import localFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localFr, 'fr-FR', localFrExtra);

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  postSubscription: Subscription;
  buttonLove = 'neutre';
  constructor(private postService: PostsService, private router: Router) {
  }
  ngOnInit(): void {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.getPosts();
    this.postService.emitPosts();
  }
  // tslint:disable-next-line:typedef
  onNewPost(){
    this.router.navigate(['/posts', 'new']);
  }
  // tslint:disable-next-line:typedef
  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }
  // tslint:disable-next-line:typedef
  onLove(post: Post){
    this.postService.lovePost(post);
    this.buttonLove = 'like';
  }
  // tslint:disable-next-line:typedef
  onDontlove(post: Post){
    this.postService.dontLove(post);
    this.buttonLove = 'dislike';
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
