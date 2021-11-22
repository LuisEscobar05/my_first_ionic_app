import { Injectable } from '@angular/core';
import {switchMap, map,} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {User} from '../models/user';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {Firestore, addDoc } from '@angular/fire/firestore';
import { collection, onSnapshot, serverTimestamp, query, orderBy} from '@firebase/firestore';
import { signInWithEmailAndPassword } from '@firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth:Auth,
    private fs:Firestore,

  ) { }

  async signUp(user,email,password):Promise <any>{
    const credential = await createUserWithEmailAndPassword(this.auth,email,password);
    const uid = credential.user.uid;
    const userRef = collection(this.fs, 'users');

    return addDoc(userRef,{uid,user,email});

  }

  singIn(email,password){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  singOut(): Promise<void>{
    return this.auth.signOut();
  }
}
