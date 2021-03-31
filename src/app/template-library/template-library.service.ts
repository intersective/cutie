import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {DemoService} from '@services/demo.service';
import {RequestService} from '../shared/request/request.service';
import {Observable} from 'rxjs/Observable';

export interface Template {
  uuid: string;
  name: string;
  description?: string;
  leadImageUrl?: string;
  leadVideoUrl?: string;
  type?: string;
}

export interface Category {
  name: string;
  type: string;
  leadImage: string;
  color: string;
  isLarge: boolean;
}

export interface CategorisedTemplates {
  category: Category;
  templates: Template[];
}

@Injectable({
  providedIn: 'root'
})
export class TemplateLibraryService {

  constructor(
    private request: RequestService,
    private demo: DemoService,
  ) { }

  getTemplates(): Observable<Template[]> {
    if (environment.demo) {
      return this.demo.getTemplates().pipe(map(this._handleTemplates));
    }
    return this.request.graphQLQuery(
      `query templates {
        templates {
          uuid
          name
          description
          leadImageUrl
          leadVideoUrl
          type
        }
      }`,
      {},
    ).pipe(map(this._handleTemplates));
  }

  private _handleTemplates(res) {
    if (!res.data) {
      return [];
    }
    return res.data.templates;
  }

  getCategories(): Category[] {
    return [
      {
        'leadImage': '',
        'name': 'Team Projects',
        'type': 'team project',
        'color': 'rgba(0,64,229, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Internships',
        'type': 'internship',
        'color': 'rgba(85, 2, 136, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Simulations',
        'type': 'simulation',
        'color': 'rgba(229, 69, 0, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Mentoring',
        'type': 'mentoring',
        'color': 'rgba(221, 0, 59, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Accelerators',
        'type': 'accelerator',
        'color': 'rgba(37, 105, 120, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Skills Portfolios',
        'type': 'skill portfolio',
        'color': 'rgba(9, 129, 7, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Others',
        'type': 'other',
        'color': 'rgba(69, 40, 48, 0.7)',
        'isLarge': false
      }
    ];
  }

}
