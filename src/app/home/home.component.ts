import { Component, OnInit } from '@angular/core';
import { AllcasesService } from '../allcases.service';
import { All } from './all';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { count } from 'rxjs/operators';
import { CoronsNews } from './coronanews';
import { Router } from '@angular/router';
import { Country } from '../bycountry/country';
import { CountryData } from '../searchcountry/countrydata';
import { CountryInfo } from '../bycountry/countryInfor';
import * as $ from 'jquery' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 alls:All;
 dated:any;
 
 count1:any;
 count:any=0;
 news:any;
 search:string="";
 condata:any;
 actnews:CoronsNews[];
 country:Country;
  flag:CountryData;
  conFlag:string="";
  conInfo:CountryInfo;
  country1:Country;
  conInfo1:CountryInfo
  constructor(private serv:AllcasesService,private route:Router) {
    this.alls=new All(0,0,0,0);
    this.conInfo=new CountryInfo(0,0,0,"","","");
    this.country=new Country("",this.conInfo,0,0,0,0,0,0,0,0,0);
    this.flag=new CountryData("","");
    this.conInfo1=new CountryInfo(0,0,0,"","","");
    this.country1=new Country("",this.conInfo,0,0,0,0,0,0,0,0,0);  
   }

  ngOnInit() {

    $(document).ready(function(){ 
      $(window).scroll(function(){ 
          if ($(this).scrollTop() > 100) { 
              $('#scroll').fadeIn(); 
          } else { 
              $('#scroll').fadeOut(); 
          } 
      }); 
      $('#scroll').click(function(){ 
          $("html, body").animate({ scrollTop: 0 }, 600); 
          return false; 
      }); 
  });

    
    this.serv.getAllCases().subscribe(
      prdo=>{
        this.alls= prdo;
        console.log(this.alls);
        console.log(this.alls.updated);
        this.dated=new Date(this.alls.updated);
        sessionStorage.setItem('dated',this.dated);
      }
    )
    console.log(this.dated);
    this.serv.getCoronaNews().subscribe(
      data=>{
        this.news= data;
        this.actnews=this.news['articles'];
        console.log(this.news);
        console.log(this.actnews);
      }
    )
    this.serv.getCoronaIdiaNewsCountry().subscribe(
      data=>{
        this.country= data;
        this.conInfo=this.country.countryInfo

        console.log(this.country);
      }
    )
    this.serv.getIndianFlag().subscribe(
      data=>{
        this.condata= data;
        this.flag.name=this.condata[0]['name'];
        this.flag.flag=this.condata[0]['flag'];
        console.log(this.flag.name);
        console.log(this.flag.flag);
        console.log(this.condata);
      }
    )

      this.serv.getCoronaNewsByCountry().subscribe(
        data=>{
          this.country1= data;
        this.conInfo1=this.country.countryInfo
        console.log(this.conInfo1.flag)

        }
      )

  }
  getCountry()
  {
    console.log(this.search);
    this.route.navigate(['/searchcountry',this.search]);
    
  }

  getData(value)
  {
    this.serv.getCoronaNewsCountry(value).subscribe(
      data=>{
        this.country= data;
      this.conInfo=this.country.countryInfo;
      }
    )
    console.log(value);
  }

}
