import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  somethingWentWrong(){
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-snack'];
    config.duration = 4000;

    this.snackBar.open('Something went wrong, please try again.', null, config);
  }

  errorMessage(message: string){
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-snack'];
    config.duration = 4000;

    this.snackBar.open("Error: " + message, null, config);
  }

  showMessage(message: string){
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-snack'];
    config.duration = 4000;

    this.snackBar.open(message, null, config);
  }
}
