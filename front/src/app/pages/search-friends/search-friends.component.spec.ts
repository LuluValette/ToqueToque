import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendsComponent } from './search-friends.component';

describe('SearchFriendsComponent', () => {
  let component: SearchFriendsComponent;
  let fixture: ComponentFixture<SearchFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
