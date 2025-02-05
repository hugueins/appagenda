import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListPage } from './person-list.page';

describe('PersonListPage', () => {
  let component: PersonListPage;
  let fixture: ComponentFixture<PersonListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
