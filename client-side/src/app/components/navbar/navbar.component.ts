import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public totalItem : number = 0;
  public searchTerm !: string;
  public isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private toatsrService: ToastrService,
    private cartService : CartService
    ) { 

  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length
    })
    this.authService.authStatusChanged.subscribe((authenticated) => { // subscribe to authStatusChanged
      this.isLoggedIn = authenticated;
    });
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.toatsrService.success('You are now logged out', 'Success', {
      toastClass: 'alert alert-success', timeOut: 5000});
    this.router.navigate(['']);
  }
  
}