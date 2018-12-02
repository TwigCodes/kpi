import { Component, OnInit } from '@angular/core';
import { Employee } from '@app/feedback/feedback.model';
import { NotificationService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nwcdkpi-raters-container',
  templateUrl: './raters-container.component.html',
  styleUrls: ['./raters-container.component.scss']
})
export class RatersContainerComponent implements OnInit {
  items: Array<Employee> = [
    {
      id: '0',
      email: 'zhangsan@nwcd.com',
      name: 'Zhang San',
      title: 'Project Manager',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00001',
      reportTo: 'wangwu@nwcd.com'
    },
    {
      id: '1',
      email: 'lisi@nwcd.com',
      name: 'Li Si',
      title: 'Engineer',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00002',
      reportTo: 'zhangsan@nwcd.com'
    },
    {
      id: '2',
      email: 'wangwu@nwcd.com',
      name: 'Wang Wu',
      title: 'Project Director',
      gender: false,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00003'
    },
    {
      id: '3',
      email: 'zhaoliu@nwcd.com',
      name: 'Zhao Liu',
      title: 'Project Manager',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00004'
    },
    {
      id: '4',
      email: 'david@nwcd.com',
      name: 'David Tian',
      title: 'Engineer',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00005',
      reportTo: 'zhaoliu@nwcd.com'
    },
    {
      id: '5',
      email: 'michael@nwcd.com',
      name: 'Michael Sang',
      title: 'Sales',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00006',
      reportTo: 'wangwu@nwcd.com'
    },
    {
      id: '6',
      email: 'liming@nwcd.com',
      name: 'Li Ming',
      title: 'UI Designer',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00007',
      reportTo: 'zhangsan@nwcd.com'
    },
    {
      id: '7',
      email: 'wayne@nwcd.com',
      name: 'Wayne Kang',
      title: 'Deigner',
      gender: true,
      avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      employeeNo: 'A00001',
      reportTo: 'zhaoliu@nwcd.com'
    }
  ];
  currentEmployeeIndex = 0;
  selectedRaters: Employee[] = [];
  constructor(
    private readonly notificationService: NotificationService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.selectedRaters = [...this.supervisor, ...this.subordinates];
  }

  selectRater(rater: Employee) {
    if (
      this.selectedRaters.findIndex(item => item.email === rater.email) > -1
    ) {
      this.translateService
        .get('nwcdkpi.feedback.raters.notification.existed')
        .pipe(take(1))
        .subscribe(title => {
          this.notificationService.error(title);
        });
    } else {
      this.selectedRaters = [...this.selectedRaters, rater];
    }
  }

  public get supervisor(): Employee[] {
    return this.items.filter(
      item => item.email === this.items[this.currentEmployeeIndex].reportTo
    );
  }

  public get subordinates(): Employee[] {
    return this.items.filter(
      item => item.reportTo === this.items[this.currentEmployeeIndex].email
    );
  }

  public relationToUser(rater: Employee): string {
    const relation =
      rater.email === this.items[this.currentEmployeeIndex].reportTo
        ? 'nwcdkpi.feedback.raters.supervisor'
        : rater.reportTo === this.items[this.currentEmployeeIndex].email
        ? 'nwcdkpi.feedback.raters.subordinate'
        : 'nwcdkpi.feedback.raters.colleague';
    return relation;
  }

  public isSupervisorOrSubordinates(rater: Employee) {
    return (
      rater.email === this.items[this.currentEmployeeIndex].reportTo ||
      rater.reportTo === this.items[this.currentEmployeeIndex].email
    );
  }
}
