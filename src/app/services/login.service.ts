import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../models/user';
import { Auth, createUserWithEmailAndPassword,sendEmailVerification, signInWithEmailAndPassword,sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, docData, setDoc, doc, updateDoc, collection, where, onSnapshot } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: any;
  constructor(
    private auth: Auth,
    private fs: Firestore,

  ) { }

  async signUp(user: User): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);
    const uid = credential.user.uid;
    const userRef = doc(this.fs, `users/${uid}`);
    return setDoc(userRef, { username: user.username, email: user.email, name: '', ap_pat: '', ap_mat: '', numberPhone: '' });
  }

  singIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  singOut(): Promise<void> {
    return this.auth.signOut();
  }

  async update(user: User, id): Promise<any> {
    const userRef = doc(this.fs, `users/${id}`);
    return await updateDoc(userRef, { name: user.name, ap_pat: user.ap_pat, ap_mat: user.ap_mat, username: user.username, numberPhone: user.numberPhone })
  }

  getUserById(id): Observable<User> {
    const userDocRef = doc(this.fs, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>
  }

  getUserLogged() {
    return this.auth.currentUser.uid;
  }

  async sentResetPassword(email){
    return await sendPasswordResetEmail(this.auth, email);
  }

  userVerifiedMail(){
    return this.auth.currentUser.emailVerified;
  }

  async sendEmailToVerification(){
    return await sendEmailVerification(this.auth.currentUser)
  }
}
