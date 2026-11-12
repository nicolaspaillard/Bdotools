import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "@openng/optimus-ui/button";
import { FileUploadModule, FileUploadHandlerEvent } from "@openng/optimus-ui/fileupload";

interface Character {
  filename: string;
  image: string;
}

@Component({
  selector: "app-face-customizer",
  imports: [CommonModule, FileUploadModule, DragDropModule, ButtonModule],
  templateUrl: "./face-customizer.component.html",
  styles: ``,
})
export class FaceCustomizerComponent {
  characters: Character[] = [];
  convert = (preview: HTMLImageElement, { width, height }: { height?: number; width?: number }) => (width ? (width * preview.width) / preview.naturalWidth : height ? (height * preview.height) / preview.naturalHeight : 0);

  drop = (event: CdkDragDrop<Character[]>) => moveItemInArray(this.characters, event.previousIndex, event.currentIndex);

  loadCharacters = (event: FileUploadHandlerEvent) => {
    this.characters = [];
    for (let file of event.files) this.characters.push({ filename: file.name, image: URL.createObjectURL(file) });
    if (localStorage.getItem("order")) {
      const order: string[] = JSON.parse(localStorage.getItem("order")!);
      this.characters.sort((a, b) => order.indexOf(a.filename) - order.indexOf(b.filename));
    }
  };
}
