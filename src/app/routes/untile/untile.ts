import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "@openng/optimus-ui/button";
import { FileUploadHandlerEvent, FileUploadModule } from "@openng/optimus-ui/fileupload";
import { StepperModule } from "@openng/optimus-ui/stepper";
import JSZip from "jszip";

interface Character {
  filename: string;
  image: string;
}
const face = {
  width: 624,
  height: 804,
};
@Component({
  selector: "app-untile",
  imports: [FileUploadModule, CommonModule, ButtonModule, StepperModule, DragDropModule, StepperModule],
  templateUrl: "./untile.html",
})
export class Untile {
  bg?: string;
  characters: Character[] = [];
  constructor() {
    if (localStorage.getItem("bg")) this.bg = localStorage.getItem("bg")!;
  }
  convert = (preview: HTMLImageElement, { width, height }: { height?: number; width?: number }) => (width ? (width * preview.width) / preview.naturalWidth : height ? (height * preview.height) / preview.naturalHeight : 0);
  drop = (event: CdkDragDrop<Character[]>) => moveItemInArray(this.characters, event.previousIndex, event.currentIndex);
  generate = () => {
    localStorage.setItem("order", JSON.stringify(this.characters.map(character => character.filename)));
    let canvas = document.createElement("canvas");
    let background = document.createElement("img");
    background.src = this.bg!;
    canvas.width = background.naturalWidth;
    canvas.height = background.naturalHeight;
    canvas.getContext("2d")!.drawImage(background, 0, 0);
    let cols = Math.min(this.characters.length, 7);
    let rows = cols < 7 ? 1 : Math.ceil(this.characters.length / cols);
    let crop: { height: number; offsetX: number; offsetY: number; width: number } = { width: 0, height: 0, offsetX: 0, offsetY: 0 };
    const convert = ({ width, height }: { height?: number; width?: number }) => (width ? (width * face.height) / face.width : height ? (height * face.width) / face.height : 0);
    if (background.naturalHeight > convert({ width: background.naturalWidth / cols }) * rows) {
      crop.width = background.naturalWidth / cols;
      crop.height = convert({ width: crop.width });
      crop.offsetY = (background.naturalHeight - crop.height * rows) / 2;
    } else {
      crop.height = background.naturalHeight / rows;
      crop.width = convert({ height: crop.height });
      crop.offsetX = (background.naturalWidth - crop.width * cols) / 2;
    }
    let line = 0;
    let column = 0;
    const zip = new JSZip();
    for (let character of this.characters) {
      let buffer = document.createElement("canvas");
      buffer.width = face.width;
      buffer.height = face.height;
      buffer.getContext("2d")!.drawImage(canvas, column * crop.width + crop.offsetX, line * crop.height + crop.offsetY, crop.width, crop.height, 0, 0, face.width, face.height);
      zip.file(character.filename, buffer.toDataURL().split(",")[1], { base64: true });
      if (column === cols - 1) {
        column = 0;
        line++;
      } else column++;
    }
    zip.generateAsync({ type: "blob" }).then(content => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "characters.zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  loadBg = (event: FileUploadHandlerEvent) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onload = () => {
      this.bg = reader.result as string;
      localStorage.setItem("bg", this.bg);
    };
  };
  loadCharacters = (event: FileUploadHandlerEvent) => {
    this.characters = [];
    for (let file of event.files) this.characters.push({ filename: file.name, image: URL.createObjectURL(file) });
    if (localStorage.getItem("order")) {
      const order: string[] = JSON.parse(localStorage.getItem("order")!);
      this.characters.sort((a, b) => order.indexOf(a.filename) - order.indexOf(b.filename));
    }
  };
}
