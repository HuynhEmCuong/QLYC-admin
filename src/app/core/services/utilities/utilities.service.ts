import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

constructor() { }

setAttributeForField(targetForm, attribute, field, value) {
  targetForm.instance.getEditor(field).option(attribute, value);
}

}
