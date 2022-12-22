import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey:string = "zUYzR2CQA6jcMBmFmyJcBVC9Fdv9FNPD";
  private servicioGifUrl = "https://api.giphy.com/v1/gifs";


  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  } 

  get resultado(){
    return [...this.resultados];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resul")!) || [];
  }

  buscarGifs(query:string){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);

      this._historial = this._historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }
    // console.log(this._historial);

    const params = new HttpParams()
    .set("api_key",this.apiKey)
    .set("limit", "10")
    .set("q", query);
    
    this.http.get<SearchGifsResponse>(`${this.servicioGifUrl}/search`, {params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados =  resp.data;
      localStorage.setItem("resul" ,  JSON.stringify(this.resultados));
      
    })
    
  }



}
