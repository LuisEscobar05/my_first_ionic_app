import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note{
  id?: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})


export class ServicesService {

  constructor(private firestore: Firestore) { }

  getImg(){
    const notesRef = collection(this.firestore, 'carousel');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }
}
