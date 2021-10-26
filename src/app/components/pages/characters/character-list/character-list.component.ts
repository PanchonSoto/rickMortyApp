import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { filter, take  } from 'rxjs/operators'

import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[]=[];
  info: RequestInfo = {
    next: '',
  }
  private pageNum=1;
  private query!: string;
  private hideScrollHeight=200;
  private showScrollH=500;

  constructor(private characterSvc: CharacterService, 
              private route: ActivatedRoute,
              private router: Router) { 
                this.onUrlChanged();
            }

  ngOnInit(): void {
    /* this.getDataFromService(); */
    this.getCharactersByQuery();
  }

  private onUrlChanged() {
    this.router.events.pipe(
      filter((Event) => Event instanceof NavigationEnd)).subscribe(
        ()=> {
          this.characters=[];
          this.pageNum = 1;
          this.getCharactersByQuery();
      }
    )
  }

  private getCharactersByQuery() {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService() {
    this.characterSvc.searchCharacters(this.query,this.pageNum)
    .pipe(
      take(1)
    ).subscribe((res:any)=>{
      if(res?.results?.length){
        const { info, results } = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
      } else {
        this.characters = [];
      }
    })
  }
  
}
