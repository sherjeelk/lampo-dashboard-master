import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {Router} from '@angular/router';
import {MenuItem} from '../../models/MenuItem';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  menus: MenuItem[] = [
    //   {
    //   title: 'Dashboard',
    //   icon: 'package',
    //   link: '/pages',
    //   enable: true
    // },
    {
      title: 'Users',
      // icon: 'card-account-details-outline',
      icon:'account',
      link: '/pages/users'
    },
    {
      title: 'Coupons',
      icon: 'watermark',
      link: '/pages/',
      enable: true
    },
    // {
    //   title: 'Brands',
    //   icon: 'watermark',
    //   link: '/pages/brand',
    //   enable: true
    // },
    {
      title: 'Orders',
      icon: 'package',
      link: '/pages/orders'
    },
    // {
    //   title: 'Services',
    //   icon: 'room-service',
    //   link: '/pages/service'
    // },
    {
      title: 'Cities',
      icon: 'sitemap',
      link: '/pages/cities'
    },
    {
      title: 'Service',
      icon: 'cog',
      link: '/pages/services'
    },
    {
      title: 'Product',
      icon: 'chart-ppf',
      link: '/pages/product'
    },
    {
      title: 'Pricing',
      icon: 'currency-eur',
      link: '/pages/pricing'
    },
    // {
    //   title: 'Reviews & Ratings',
    //   icon: 'star-outline',
    //   link: '/pages/reviews'
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'bell-outline',
    //   link: '/pages/slots'
    // },
    {
      title: 'File & Images',
      icon: 'folder-multiple-image',
      link: '/pages/files'
    },
    // {
    //   title: 'Settings',
    //   icon: 'cog-outline',
    //   link: '/pages/slots'
    // },
    {
      title: 'Quick Links',
      header: true
    },
    {
      title: 'License Info',
      icon: 'card-account-details-outline',
      link: '/pages/slots'
    },
    {
      title: 'LT Dashboard',
      icon: 'monitor-dashboard',
      link: '/pages/slots'
    }];
  public expanded = true;
  public selected: any;

  constructor(private router: Router, private util: UtilService, public sideMenu: NbSidebarService,  private cdRef: ChangeDetectorRef  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.util.sideNav.subscribe((expand: boolean) => {
      console.log('Side Nav Collapsed ? ' + !expand);
      this.expanded = expand;
    });


    this.setActiveLink();
    this.router.events.subscribe(data => this.setActiveLink());
    this.cdRef.detectChanges();
  }

  setActiveLink(){
    for (const menu of this.menus) {
      if (menu.link === this.router.url){
        this.selected = menu;
      }
    }
  }
  openLink(menu: any) {
    this.selected = menu;
    this.router.navigateByUrl(menu.link);
  }
}
