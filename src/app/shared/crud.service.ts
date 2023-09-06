import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class Usuario {
  id?: number;
  nome?: string;
  codigo?: string;
  senha?: string;
  email?: number;
  telefone?: number;
}

export class Presenca {
  presencas?: PresencaLista [];
  diasAula?: string[];
  alunos?: string[];
}

export class PresencaLista {
  diaAula?: string;
  idAluno?: string;
  idCronograma?: string;
  nomeAluno?: string;
  presente?: string;
}

export class Materia {
  materias?: MateriaLista[]
}

export class MateriaLista {
  nome?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  endpoint = 'http://52.90.136.176:3000';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  BuscarUsuario(codigo: string): Observable<Usuario> {
    return this.httpClient
      .get<Usuario>(this.endpoint + '/Aluno?Codigo=' + codigo)
      .pipe(retry(1), catchError(this.processError));
  }

  BuscarPresencas(idMateria: string, ano: string, semestre: string): Observable<Presenca> {
    return this.httpClient
      .get<Presenca>(this.endpoint + '/Relatorio/Presenca?IdMateria=' + idMateria + '&ano=' + ano + '&semestre=' + semestre)
      .pipe(retry(1), catchError(this.processError));
  }

  BuscarMaterias(): Observable<Materia> {
    return this.httpClient
      .get<Materia>(this.endpoint + '/Materia')
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Código erro: ${err.status}\nMensagem: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
