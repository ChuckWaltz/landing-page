import { Component } from "@angular/core";

import { NgwWowService } from "ngx-wow";

import "rxjs/add/observable/interval";
import { I18nSelectPipe } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  private sub;

  headerBG: any;
  headerBGswap: any;

  widthThreshold = 1200;

  headerBGDefault = "url('assets/header-background-chuck-cropped.jpg')";
  headerBGs = [
    "url('assets/header-background-chuck-cropped-glitch1.jpg')",
    "url('assets/header-background-chuck-cropped-glitch2.jpg')",
    "url('assets/header-background-chuck-cropped-glitch3.jpg')",
    "url('assets/header-background-chuck-cropped-glitch4.jpg')",
    "url('assets/header-background-chuck-cropped-glitch5.jpg')",
    "url('assets/header-background-chuck-cropped-glitch6.jpg')"
  ];

  constructor(private wowService: NgwWowService) {}

  ngOnInit() {
    this.wowService.init();

    this.headerBG = document.getElementById("header-background");
    this.headerBGswap = document.getElementById("header-background-swap");
    this.headerBG.style.backgroundImage = this.headerBGDefault;

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
    this.headerBGswap.style.backgroundImage = this.headerBGs[
      Math.floor(Math.random() * this.headerBGs.length)
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
