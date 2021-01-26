import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../../services/posts.service';
import {Router} from '@angular/router';
import {Post} from '../../models/Posts.models';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  fileIsUploading = false;
  fileURL: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private postService: PostsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  onSavePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const createAt = new Date().toString();
    const like = 0;
    const dislike = 0;
    const newPost = new Post(title, content, createAt, like, dislike);
    if (this.fileURL && this.fileURL !== '') {
      newPost.photo = this.fileURL;
    }
    this.postService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }

  // tslint:disable-next-line:typedef
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then(
      // @ts-ignore
      (url: string) => {
        this.fileURL = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  // tslint:disable-next-line:typedef
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
