import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonEditPage } from './person-edit.page';

describe('PersonEditPage', () => {
  let component: PersonEditPage;
  let fixture: ComponentFixture<PersonEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
