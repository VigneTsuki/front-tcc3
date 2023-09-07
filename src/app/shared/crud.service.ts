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

export class Sala {
  salas?: SalaLista[]
}

export class SalaLista {
  bloco?: string;
  numeracao?: string;
  id?: string;
}

export class Aluno {
  alunos?: AlunoLista[]
}

export class AlunoLista {
  codigo?: string;
  nome?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  endpoint = 'http://localhost:5165';
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

  BuscarSalas(): Observable<Sala> {
    return this.httpClient
      .get<Sala>(this.endpoint + '/Sala')
      .pipe(retry(1), catchError(this.processError));
  }

  BuscarAlunos(): Observable<Aluno> {
    return this.httpClient
      .get<Aluno>(this.endpoint + '/Alunos')
      .pipe(retry(1), catchError(this.processError));
  }

  CriarMateria(materiaData: any): Observable<any> {
    return this.httpClient.post(this.endpoint + '/Materia', materiaData)
      .pipe(retry(1),catchError(this.processError));
  }

  CriarCronograma(cronogramaData: any): Observable<any> {
    return this.httpClient.post(this.endpoint + '/Cronograma', cronogramaData)
      .pipe(retry(1),catchError(this.processError));
  }

  CriarMatricula(idAluno: string, idMateria: string): Observable<any> {
    return this.httpClient.post(this.endpoint + '/Matricular?idaluno=' + idAluno + '&idmateria=' + idMateria, null)
      .pipe(retry(1),catchError(this.processError));
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
