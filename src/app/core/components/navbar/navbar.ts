import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserProfile } from '../../models/interfaces/profile.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  router = inject(Router);

  user : UserProfile = JSON.parse(localStorage.getItem("user") ?? "{}")

  linkList = [
    {
      "icon": "ph-house",
      "href": "/home",
      "active": false
    },
    {
      "icon": "ph-magnifying-glass",
      "href": "/search",
      "active": false
    },
    {
      "icon": "ph-chat-teardrop-dots",
      "href": "/chat",
      "active": false
    },
    {
      "icon": "ph-user",
      "href": `/profile/${this.user.nickname}`,
      "active": false
    }
  ];

  constructor (){
    this.linkList.forEach(link => {
      if(link.href == this.router.url){
        link.active = true;
      }
    })
  }
}
