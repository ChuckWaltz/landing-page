import { Component } from '@angular/core';

import { NgwWowService } from 'ngx-wow';

import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  private sub;

  headerBG: any;
  headerBGswap: any;

  widthThreshold = 1200;

  headerBGs = ["url('assets/header-background-chuck-cropped.jpg')", "url('assets/header-background-chuck-cropped-glitch1.jpg')", "url('assets/header-background-chuck-cropped-glitch2.jpg')", "url('assets/header-background-chuck-cropped-glitch3.jpg')", "url('assets/header-background-chuck-cropped-glitch4.jpg')", "url('assets/header-background-chuck-cropped-glitch5.jpg')", "url('assets/header-background-chuck-cropped-glitch6.jpg')"];

  constructor(private wowService: NgwWowService){

    window.addEventListener('resize', this.goMobile);

  }

  ngOnInit(){
    this.wowService.init();

    this.headerBG = document.getElementById('header-background');
    this.headerBGswap = document.getElementById('header-background-swap');
    this.headerBG.style.backgroundImage = this.headerBGs[0];

    this.goMobile();

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      console.log("Mobile!");
    }

    setTimeout(() => {
    
    this.glitchInit();
  
    }, 5000);
    
    
  }

  scrollTo(elem){
    document.querySelector(elem).scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }

  glitchInit(){
    setInterval(() => {
      this.glitch()
    }, 5000); //Interval for BG swap
  }

  randomNumber(){
    return (Math.random() * 220) + 100;
  }

  goMobile(){ //Fixes for various mobile issues.
    console.log(window.innerWidth);
    if(window.innerHeight > window.innerWidth){ //Check for Portrait orientation
      document.getElementById('header-content').style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
      document.getElementById('header-content').style.maxWidth = 'unset';
      document.getElementById('header-content').style.paddingBottom = '8vw';
      document.getElementById('header-background').style.backgroundPositionX = 'left';
      document.getElementById('header-background-swap').style.backgroundPositionX = 'left';
    }else{
      document.getElementById('header-content').style.backgroundColor = 'unset';
      document.getElementById('header-background').style.backgroundPositionX = 'right';
      document.getElementById('header-background-swap').style.backgroundPositionX = 'right';

      if( /Android|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) ) {
        console.log("Mobile!");
        document.getElementById('header-content').style.maxWidth = '70vw';
        document.getElementById('header-content').style.paddingBottom = '4vw';
      }
    }
  }

  glitch(){
    //this.headerBG.style.backgroundImage = this.headerBGs[Math.floor(Math.random() * this.headerBGs.length)];
    this.headerBGswap.style.backgroundImage = this.headerBGs[Math.floor(Math.random() * this.headerBGs.length)];

    setTimeout(() => {
      //this.headerBG.style.backgroundImage = this.headerBGs[0];
      this.headerBG.style.opacity = '0';
      this.headerBGswap.style.opacity = '1';
      setTimeout(() => {
        this.headerBGswap.style.opacity = '0';
        this.headerBG.style.opacity = '1';
      }, this.randomNumber())
    }, 500);
  }

}