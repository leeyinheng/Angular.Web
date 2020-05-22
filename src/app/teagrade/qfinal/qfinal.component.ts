import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TeagradeserviceService} from '../service/teagradeservice.service';
import {Survey} from '../model/survey';


@Component({
  selector: 'app-qfinal',
  templateUrl: './qfinal.component.html',
  styleUrls: ['./qfinal.component.css']
})
export class QfinalComponent implements OnInit {

  Entity: Survey;

  List: Survey[];

  TotalScore: number;

  constructor(private router: Router, private service: TeagradeserviceService) { }

  ngOnInit() {

     this.List = this.service.getSurvey();

     this.TotalScore = this.service.getTotalScore();
  }


  public click1() {
    this.router.navigate(['/qsurvey']);
  }

}
