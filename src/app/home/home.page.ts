import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  lat;
  long;
  time;
  Data: any[] = [{ locationtime: 1648669065144, latitude: 40, longitude: -79 }];

  constructor(
    private geo: Geolocation,
    private db: DataService,
    private toast: ToastController,
    private router: Router
  ) { }

  // ngOnInit(){
  // this.geo.getCurrentPosition({
  //   enableHighAccuracy: true
  // }).then((res) => {
  //   this.lat = res.coords.latitude;
  //   this.long = res.coords.longitude;
  //   this.time = res.timestamp;
  // }).catch((err) => {
  //   console.log(err);
  // });
  // }

  ngOnInit() {

    this.db.dbState().subscribe(
      async (res) => {
        if (res) {
          this.db.fetchLocations().subscribe(async item => {
            this.Data = item;
            let toast = await this.toast.create({
              message: 'db loaded',
              duration: 3000
            });
            toast.present();
          })
        } else {
          let toast = await this.toast.create({
            message: 'Res is empty',
            duration: 3000
          });
          toast.present();
        }
      }
    );

        this.geo.getCurrentPosition({
      enableHighAccuracy: true
    }).then((res) => {
      this.time = res.timestamp;
      this.lat = res.coords.latitude;
      this.long = res.coords.longitude;
      //Store location
      this.db.addLocation(
        res.timestamp,
        res.coords.latitude,
        res.coords.longitude
      ).then(async (res) => {
        let toast = await this.toast.create({
          message: 'Location Added',
          duration: 3000
        });
        toast.present();
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // storeData(){
  //   this.db.dbState().subscribe(async res=>{
  //     let toast = await this.toast.create({
  //       message:`DB state: ${res}`,
  //       duration: 3000
  //     });
  //     toast.present();
  //     if(res){}else{
  //       this.db.init().then(res=>{


  //       }).catch(async error=>{
  //         let toast = await this.toast.create({
  //           message:`error: ${error}`,
  //           duration: 3000
  //         });
  //         toast.present();
  //       })
  //     }
  //   });
  // }

  deleteLocation(locationtime) {
    this.db.deleteLocation(locationtime).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Location deleted',
        duration: 3000
      });
      toast.present();
    })
  }

}
