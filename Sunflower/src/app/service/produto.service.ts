import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${environment.URL_BASE}/produto/`, this.token)
  }

  getByIdProduto(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${environment.URL_BASE}/produto/${id}`, this.token)
  }

  getByNomeProduto(nome: string): Observable<Produto>{
    return this.http.get<Produto>(`${environment.URL_BASE}/produto/nome/${nome}`, this.token)
  }

  // getByNomeProdutos(nome: string): Observable<Produto[]>{
  //   return this.http.get<Produto[]>(`http://localhost:8080/produto/nome/${nome}`)

  // }

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${environment.URL_BASE}/produto/`, produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${environment.URL_BASE}/produto/`, produto, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`${environment.URL_BASE}/produto/${id}`, this.token)
  }

}
