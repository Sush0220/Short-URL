import { Component } from '@angular/core';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public urlInput!: string;
  public redirect!: string;
  public shortId!: string;
  public displayUrl!: string;

  constructor(private urlService: UrlService) { }

  public shortenUrl(url: string) {
    this.urlService.shortUrl(url).subscribe(data => {
      this.shortId = data.shortId;
      this.displayUrl = `${this.shortId}`;
      this.redirect = url;
    }, (err) => {
      console.error(err);
    });
  }
}
