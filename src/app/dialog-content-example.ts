import { Component, ViewChild, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, of, Observable } from "rxjs";
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm
} from "@angular/forms";
import {
  catchError,
  tap,
  map,
  switchMap,
  mergeMap,
  concatMap,
  toArray,
  filter,
  first
} from "rxjs/operators";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: "dialog-content-example",
  templateUrl: "dialog-content-example.html"
})
export class DialogContentExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "dialog-content-example-dialog",
  templateUrl: "dialog-content-example-dialog.html",
  styleUrls: ["style.css"]
})
export class DialogContentExampleDialog {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  name = "Angular";
  todoUrl = "https://jsonplaceholder.typicode.com/todos";
  userUrl = "https://jsonplaceholder.typicode.com/users";

  index = 1;

  tempGroup: FormGroup = new FormGroup({});
  // make the form controls here
  todosForUsers1$ = of(1).pipe(
    switchMap(id => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`)),
    tap(item => {
      // console.log("After concatMap", JSON.stringify(item));
      // this.tempGroup.addControl(, new FormControl(""));
      let a = 0;
      item.flatMap(s => {
        this.tempGroup.addControl("firstName" + a, new FormControl(""));
        a += 1;
      });
    })
  );

  onSubmit(value: any, index: number) {
    console.log(index);
    console.log(this.tempGroup.value);

    const newValue = this.tempGroup.value[this.getName(index)];
    if (newValue !== "") {
      alert(
        "you changed index: " +
          index +
          ", new value: " +
          this.tempGroup.value[this.getName(index)]
      );
    }
  }

  getName(index: any) {
    return "firstName" + index;
  }
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
