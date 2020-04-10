import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllcasesService } from '../allcases.service';
import { Country } from '../bycountry/country';
import { CountryData } from './countrydata';
import { CountryInfo } from '../bycountry/countryInfor';

@Component({
  selector: 'app-searchcountry',
  templateUrl: './searchcountry.component.html',
  styleUrls: ['./searchcountry.component.css']
})
export class SearchcountryComponent implements OnInit {

  
  name:string="";
  dated:any;
  country:Country;
  flag:CountryData;
  condata:any;
  conInfo:CountryInfo
  constructor(private route:ActivatedRoute,private srv:AllcasesService,private router:Router) {
    this.conInfo=new CountryInfo(0,0,0,"","","");
    this.country=new Country("",this.conInfo,0,0,0,0,0,0,0,0,0);
    this.flag=new CountryData("","");
   }

  ngOnInit() {
    this.name=this.route.snapshot.paramMap.get('con');
    console.log(this.country);
    this.srv.getCoronaNewsCountry(this.name).subscribe(
      data=>{
        this.country= data;
        console.log(this.country);
        console.log(this.country.cases);
      }


    )
    this.srv.getCountryFlag(this.name).subscribe(
      data=>{
        this.condata= data;
        this.flag.name=this.condata[0]['name'];
        this.flag.flag=this.condata[0]['flag'];
        console.log(this.flag.name);
        console.log(this.flag.flag);
        console.log(this.condata);
      }


    )
    this.dated=sessionStorage.getItem('dated');
  }
  goChart()
{
  console.log("Hello");
  this.router.navigate(["/chart",this.name]);
}

}

