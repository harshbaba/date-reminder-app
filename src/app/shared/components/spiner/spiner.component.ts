import { Component, OnInit } from '@angular/core';
import { SpinerService } from '../../services/spiner.service';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit {

  constructor(
    public spiner: SpinerService
  ) { }

  ngOnInit() {
  }

}
