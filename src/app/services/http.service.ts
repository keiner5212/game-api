import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment as env } from 'src/enviroments/enviroment';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string):
    Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    let aux=env.BASE_URL+"/games/"+id;
    const gameInfoRequest = this.http.get(aux);
    console.log(gameInfoRequest);
    // const gameTrailersRequest = this.http.get(
    //   aux+"/movies"
    // );
    // const gameScreenshotsRequest = this.http.get(
    //   aux+"/screenshots"
    // );

    return forkJoin({
      gameInfoRequest,
      // gameScreenshotsRequest,
      // gameTrailersRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          // screenshots: resp['gameScreenshotsRequest']?.results,
          // trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
