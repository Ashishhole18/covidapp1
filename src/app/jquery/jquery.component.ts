import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery' 
@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.css']
})
export class JqueryComponent implements OnInit {

  constructor() { }

  ngOnInit()
  {

    $('button').click(function()
    {
      alert("hello");
    });

  } 
   
  
  
}
