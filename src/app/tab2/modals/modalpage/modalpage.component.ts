import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.component.html',
  styleUrls: ['./modalpage.component.scss'],
})
export class ModalpageComponent implements OnInit {

  ngOnInit() {}

  // "value" passed in componentProps
  @Input() value: number;

  constructor(navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
  }

}
