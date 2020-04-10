import { Component, OnInit } from '@angular/core';
import { AllcasesService } from '../allcases.service';
import { Country } from './country';
import { Router } from '@angular/router';
import { CountryInfo } from './countryInfor';
import * as $ from 'jquery'
@Component({
  selector: 'app-bycountry',
  templateUrl: './bycountry.component.html',
  styleUrls: ['./bycountry.component.css']
})
export class BycountryComponent implements OnInit {

  country:Country;
  conInfo:CountryInfo;
  
  val:string="";
  constructor(private srv:AllcasesService,private router:Router) {
    this.conInfo=new CountryInfo(0,0,0,"","",""); 
    this.country=new Country("",this.conInfo,0,0,0,0,0,0,0,0,0);
  }
  

  ngOnInit() {
    
  
   
   

    
    this.srv.getCoronaNewsByCountry().subscribe(
      data=>{
        this.country= data;
        console.log(this.country);
      }


    )
    
    
  }

  
  getData(value)
  {
    this.srv.getSortInfo(value).subscribe(
      data=>{
        this.country=data;
        console.log(this.country);

      }
    )
  }
  
  
  goSearch(contr)
  {
    console.log(contr)
    this.router.navigate(['/searchcountry', contr]);
    

  }
  
  }


