import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactEditPage } from './contact-edit.page';

describe('ContactEditPage', () => {
  let component: ContactEditPage;
  let fixture: ComponentFixture<ContactEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
