import { Component, OnInit } from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from './template-library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template-library',
  templateUrl: './template-library.component.html',
  styleUrls: ['./template-library.component.scss'],
})
export class TemplateLibraryComponent implements OnInit {

  constructor(private service: TemplateLibraryService, private router: Router) { }

  loadingTemplates = false;
  templates: Template[] = [];
  categories: Category[] = [];
  categorisedTemplates: CategorisedTemplates[] = [];
  selectedCategory: Category = null;

  ngOnInit() {
    this.loadTemplates();
  }

  encodeURI(param) {
    return encodeURI(param);
  }

  loadTemplates() {
    this.loadingTemplates = true;

    this.categories = this.service.getCategories();

    this.service.getTemplates().subscribe(res => {
      this.templates = res;
      this.categories.forEach(category => {
        this.categorisedTemplates.push({
          category: category,
          templates: this.templates.filter(template => template.type === category.type)
        });
      });
      this.loadingTemplates = false;
    });
  }

  viewCategory(category: Category) {
    // this.router.navigate( ['templates', category.name]);
  }

  viewTemplate(template: Template) {
    console.log('View template: TO BE IMPLEMENTED');
  }

  onSearch(event: CustomEvent) {
    console.log(event.detail.value);
    if (event.detail.value) {
      this.router.navigate( ['templates', 'search', event.detail.value]);
    } else {
      this.router.navigate( ['templates']);
    }
  }

}
