import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  listaResidencial: Produto[]
  listaIndustrial: Produto[]

  categoria = new Categoria()

  listaProdutos: Produto[]
  produto: Produto = new Produto()
  idProduto: number
  key = 'data'
  reverse = true


  constructor(
    private router: Router,
    private authService: AuthService,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.getAllProdutos()
    this.separarProdutoIndustrial()
  }

  separarProdutoIndustrial() {
    for (let i = 1; i < this.listaProdutos.length; i++) {
      if (this.listaProdutos[i].categoria.setor == "INDUSTRIAL") {
        this.listaIndustrial.push(this.listaProdutos[i])
      }
    }
  }

  getAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  getByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
      this.adicionarProduto()
    })
  }

  adicionarProduto() {
    this.carrinhoService.adicionar(this.produto)
  }

  cadastrarProduto() {
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.getAllProdutos()
      this.produto = new Produto()
    })
  }
}
