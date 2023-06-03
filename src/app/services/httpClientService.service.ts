import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ApiService {

  

  serverApiDev = "http://127.0.0.1:8000/api";
  serverApiProd = "http://b0a4672.online-server.cloud/api";

  serverApi=this.serverApiDev;

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getAll(table:string){
    console.log(`(global)Requesting ${table}...`);
    return this.http.get(`${this.serverApi}/${table}.json`);
  }

  getId(table:string, id:number){
    console.log(`(global)Requesting ${table} with id:`,id);
    return this.http.get(`${this.serverApi}/${table}/${id}.json`);
  }

  getLevels(){
    console.log('(global)Solicitando niveles...');
    return this.http.get(`${this.serverApi}/levels.json`).pipe(
        map((response: any) => {
            const sortedResult = response.sort((
                a: { level_name: number; id_priority: { priority_name: number; }; }, 
                b:  { level_name: number; id_priority: { priority_name: number; }; }) => {
                  // Comparar por primer campo deseado
        if (a.level_name < b.level_name) {
            return -1; // a debe aparecer antes que b
          } else if (a.level_name > b.level_name) {
            return 1; // a debe aparecer después de b
          } else {
            // Si los primeros campos son iguales, comparar por segundo campo deseado
            if (a.id_priority.priority_name < b.id_priority.priority_name) {
              return -1; // a debe aparecer antes que b
            } else if (a.id_priority.priority_name > b.id_priority.priority_name) {
              return 1; // a debe aparecer después de b
            } else {
              return 0; // a y b tienen los mismos valores en los campos deseados
            }
          }
        });
        return sortedResult;
      })
    );
  }

  getPriorities(){
    console.log('(global)Solicitando prioridades...');
    return this.http.get(`${this.serverApi}/priorities.json`)
    .pipe(map((response: any) => {
            const sortedResult = response.sort((a: { priority_name: number; }, b: { priority_name: number; }) => {
                // Comparar los campos 'campoDeseado' de a y b
                if (a.priority_name < b.priority_name) {
                  return -1; // a debe aparecer antes que b
                } else if (a.priority_name > b.priority_name) {
                  return 1; // a debe aparecer después de b
                } else {
                  return 0; // a y b tienen el mismo valor en el campo deseado
                }
              });
              return sortedResult;
        })
      );}


  // POST --------------------------------------------------------------------------
  postInTable(table:string, tableEntity: any) {
    console.log(`(global)Saving ${table}...`);
    return this.http.post(`${this.serverApi}/${table}.json`, tableEntity);
  }
  // PUT ---------------------------------------------------------------------------
  putInTable(table:string, id:number, tableEntity: any) {
    console.log(`(global)Updating ${table}...`);
    return this.http.put(`${this.serverApi}/${table}/${id}`, tableEntity);
  }
  // DELETE-------------------------------------------------------------------------
  deleteFromTable(table:string, id: string | number) {
    console.log(`(global)Deleting ${table} with id:`,id);
    return this.http.delete(`${this.serverApi}/${table}/${id}`);
  }
}