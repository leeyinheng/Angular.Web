import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-love',
  templateUrl: './love.component.html',
  styleUrls: ['./love.component.css']
})
export class LoveComponent implements OnInit {

   MaleUrl = '../../../assets/Photos/linepair_men_page.jpg';

   FemaleUrl = '../../../assets/Photos/linepair_ladies_page.jpg';

   Imgurl = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.gender)
    .subscribe(params => {
        if (params.gender === '男性') {
          this.Imgurl = this.MaleUrl;
        } else {
          this.Imgurl = this.FemaleUrl;
        }
    });
  }

}
