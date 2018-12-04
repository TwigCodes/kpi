import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '@app/feedback/feedback.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import * as _ from 'lodash';

@Component({
  selector: 'nwcdkpi-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  currentEmployeeIndex = 0;
  currentFilter = 'all';

  items: Array<Partial<Employee>> = [
    {
      id: 0,
      email: 'zhangsan@nwcd.com',
      name: 'Zhang San',
      title: 'Project Manager',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
      employeeNo: 'A00001',
      reportTo: 'wangwu@nwcd.com'
    },
    {
      id: 1,
      email: 'lisi@nwcd.com',
      name: 'Li Si',
      title: 'Engineer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/E0B4CAB3-F491-4322-BEF2-208B46748D4A-200w.jpeg',
      employeeNo: 'A00002',
      reportTo: 'zhangsan@nwcd.com'
    },
    {
      id: 2,
      email: 'wangwu@nwcd.com',
      name: 'Wang Wu',
      title: 'Project Director',
      gender: false,
      avatar:
        'https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-200w.jpeg',
      employeeNo: 'A00003'
    },
    {
      id: 3,
      email: 'zhaoliu@nwcd.com',
      name: 'Zhao Liu',
      title: 'Project Manager',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
      employeeNo: 'A00004'
    },
    {
      id: 4,
      email: 'david@nwcd.com',
      name: 'David Tian',
      title: 'Engineer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
      employeeNo: 'A00005',
      reportTo: 'zhaoliu@nwcd.com'
    },
    {
      id: 5,
      email: 'michael@nwcd.com',
      name: 'Michael Sang',
      title: 'Sales',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
      employeeNo: 'A00006',
      reportTo: 'wangwu@nwcd.com'
    },
    {
      id: 6,
      email: 'liming@nwcd.com',
      name: 'Li Ming',
      title: 'UI Designer',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/344CFC24-61FB-426C-B3D1-CAD5BCBD3209-200w.jpeg',
      employeeNo: 'A00007',
      reportTo: 'zhangsan@nwcd.com'
    },
    {
      id: 7,
      email: 'wayne@nwcd.com',
      name: 'Wayne Kang',
      title: 'Deigner',
      gender: true,
      avatar:
        'https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-200w.jpeg',
      employeeNo: 'A00001',
      reportTo: 'zhaoliu@nwcd.com'
    }
  ];
  feedbackToOthers = [
    {
      targetUser: {
        id: 0,
        email: 'zhangsan@nwcd.com',
        name: 'Zhang San',
        title: 'Project Manager',
        gender: true,
        avatar:
          'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg',
        employeeNo: 'A00001',
        reportTo: 'wangwu@nwcd.com'
      },
      questionnaireId: 1
    },
    {
      targetUser: {
        id: 1,
        email: 'lisi@nwcd.com',
        name: 'Li Si',
        title: 'Engineer',
        gender: true,
        avatar:
          'https://tinyfac.es/data/avatars/E0B4CAB3-F491-4322-BEF2-208B46748D4A-200w.jpeg',
        employeeNo: 'A00002',
        reportTo: 'zhangsan@nwcd.com'
      },
      questionnaireId: 1
    }
  ];
  completedFeedbacks = [
    {
      targetUser: {
        id: 2,
        email: 'wangwu@nwcd.com',
        name: 'Wang Wu',
        title: 'Project Director',
        gender: false,
        avatar:
          'https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-200w.jpeg',
        employeeNo: 'A00003',
        reportTo: 'zhaoliu@nwcd.com'
      },
      questionnaireId: 1
    },
    {
      targetUser: {
        id: 3,
        email: 'zhaoliu@nwcd.com',
        name: 'Zhao Liu',
        title: 'Project Manager',
        gender: true,
        avatar:
          'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
        employeeNo: 'A00004',
        reportTo: 'zhaoliu@nwcd.com'
      },
      questionnaireId: 1
    }
  ];
  constructor() {}

  ngOnInit() {}

  public relationToUser(rater: Partial<Employee>): string {
    const relation =
      rater.email === this.items[this.currentEmployeeIndex].reportTo
        ? 'nwcdkpi.feedback.raters.supervisor'
        : rater.reportTo === this.items[this.currentEmployeeIndex].email
        ? 'nwcdkpi.feedback.raters.subordinate'
        : 'nwcdkpi.feedback.raters.colleague';
    return relation;
  }

  changeFilter(filter: string) {
    this.currentFilter =
      filter === 'supervisor'
        ? 'supervisor'
        : filter === 'subordinates'
        ? 'subordinates'
        : filter === 'colleagues'
        ? 'colleagues'
        : 'all';
  }

  public get filterTodo() {
    switch (this.currentFilter) {
      case 'supervisor':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.email ===
            this.items[this.currentEmployeeIndex].reportTo
        );
      case 'subordinates':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.reportTo ===
            this.items[this.currentEmployeeIndex].email
        );
      case 'colleague':
        return this.feedbackToOthers.filter(
          f =>
            f.targetUser.reportTo !==
              this.items[this.currentEmployeeIndex].email &&
            f.targetUser.reportTo ===
              this.items[this.currentEmployeeIndex].email
        );
      default:
        return this.feedbackToOthers;
    }
  }

  public get supervisor(): Partial<Employee>[] {
    return this.items.filter(
      item => item.email === this.items[this.currentEmployeeIndex].reportTo
    );
  }

  public get subordinates(): Partial<Employee>[] {
    return this.items.filter(
      item => item.reportTo === this.items[this.currentEmployeeIndex].email
    );
  }
}
