import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Carousel } from '../models/carousel';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private firestore: Firestore) { }

  getImg(){
    const ref = collection(this.firestore, 'carousel');
    return collectionData(ref, {idField: 'id'}) as Observable<Carousel[]>;
  }
}
