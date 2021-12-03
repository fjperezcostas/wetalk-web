import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomViewComponent } from './chatroom-view.component';

describe('ChatroomViewComponent', () => {
  let component: ChatroomViewComponent;
  let fixture: ComponentFixture<ChatroomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
