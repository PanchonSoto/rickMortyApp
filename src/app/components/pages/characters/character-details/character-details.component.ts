import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$!: Observable<Character>;
  constructor(private route: ActivatedRoute,
              private charaterSvc: CharacterService,
              private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params)=>{
      const id = params['id'];
      this.character$ = this.charaterSvc.getDetails(id);
    });
  }

  onGoBack(){
    this.location.back();
  }
}
