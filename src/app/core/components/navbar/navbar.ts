import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  router = inject(Router);

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
      "href": "/profile",
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
