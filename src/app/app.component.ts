import { Component, HostListener } from "@angular/core";

import { NgwWowService } from "ngx-wow";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  headerBG: any;
  headerBGswap: any;

  widthThreshold = 1400;

  headerBGDefault = "url('assets/header-background-chuck-cropped.jpg')";
  headerBGsDefault = [
    "url('assets/header-background-chuck-cropped-glitch1.jpg')",
    "url('assets/header-background-chuck-cropped-glitch2.jpg')",
    "url('assets/header-background-chuck-cropped-glitch3.jpg')",
    "url('assets/header-background-chuck-cropped-glitch4.jpg')",
    "url('assets/header-background-chuck-cropped-glitch5.jpg')",
    "url('assets/header-background-chuck-cropped-glitch6.jpg')"
  ];
  headerBGHalf = "url('assets/header-background-chuck-cropped_half.jpg')";
  headerBGsHalf = [
    "url('assets/header-background-chuck-cropped-glitch1_half.jpg')",
    "url('assets/header-background-chuck-cropped-glitch2_half.jpg')",
    "url('assets/header-background-chuck-cropped-glitch3_half.jpg')",
    "url('assets/header-background-chuck-cropped-glitch4_half.jpg')",
    "url('assets/header-background-chuck-cropped-glitch5_half.jpg')",
    "url('assets/header-background-chuck-cropped-glitch6_half.jpg')"
  ];

  headerBGCurrent: any;
  headerBGsCurrent: any;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    let width = event.target.innerWidth;
    if (width > this.widthThreshold) {
      this.headerBGCurrent = this.headerBGDefault;
      this.headerBGsCurrent = this.headerBGsDefault;
    } else {
      this.headerBGCurrent = this.headerBGHalf;
      this.headerBGsCurrent = this.headerBGsHalf;
    }
    this.headerBG.style.backgroundImage = this.headerBGCurrent;
    this.headerBGswap.style.backgroundImage = this.headerBGCurrent;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    if(window.scrollY > 1000){
      document.getElementById("header").style.opacity = "0";
    }else{
      document.getElementById("header").style.opacity = "1";
    }
  }

  constructor(private wowService: NgwWowService) {}

  ngOnInit() {
    this.wowService.init();

    this.headerBG = document.getElementById("header-background");
    this.headerBGswap = document.getElementById("header-background-swap");

    // Set initial default BG
    this.headerBGCurrent =
      window.innerWidth > this.widthThreshold
        ? this.headerBGDefault
        : this.headerBGHalf;

    // Set initial swap BGs
    this.headerBGsCurrent =
      window.innerWidth > this.widthThreshold
        ? this.headerBGsDefault
        : this.headerBGsHalf;

    this.headerBG.style.backgroundImage = this.headerBGCurrent;

    setTimeout(() => {
      this.glitch();
    }, 8500);
  }

  scrollTo(elem) {
    document.querySelector(elem).scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async glitch() {
    this.headerBGswap.style.backgroundImage = this.headerBGsCurrent[
      Math.floor(Math.random() * this.headerBGsCurrent.length)
    ];

    await this.sleep(500);

    this.headerBGswap.style.opacity = "1";
    this.headerBG.style.opacity = "0";

    setTimeout(async () => {
      this.headerBGswap.style.opacity = "0";
      this.headerBG.style.opacity = "1";
      await this.sleep(this.randomNumber(250, 5000));
      this.glitch();
    }, this.randomNumber(100, 400));
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
