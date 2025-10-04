import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotationComponent } from './post-notation.component';

describe('PostNotationComponent', () => {
  let component: PostNotationComponent;
  let fixture: ComponentFixture<PostNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostNotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
