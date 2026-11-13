import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectModule } from "@openng/optimus-ui/select";

interface pos {
  x: number;
  y: number;
  z: number;
}

interface bdoNode {
  CP: number;
  has_lodging: boolean;
  is_main: number;
  is_planttown: boolean;
  is_plantzone: boolean;
  key: number;
  kind: number;
  name: string;
  pos: pos;
}

@Component({
  selector: "app-trade",
  imports: [CommonModule, SelectModule, FormsModule],
  templateUrl: "./trade.html",
})
export class Trade {
  distances: { distance: number; town: string }[] = [];
  nodes: bdoNode[] = [];
  source: pos = { x: 0, y: 0, z: 0 };
  towns: bdoNode[] = [];
  constructor() {
    fetch("https://raw.githubusercontent.com/shrddr/shrddr.github.io/refs/heads/main/workerman/data/loc.json")
      .then(response => response.json())
      .then(names => {
        fetch("https://raw.githubusercontent.com/shrddr/shrddr.github.io/refs/heads/main/workerman/data/exploration.json")
          .then(response => response.json())
          .then(nodes => {
            this.nodes = (Object.keys(nodes).map(v => ({ ...nodes[v], name: names.en.node[v] })) as bdoNode[]).filter(node => node.is_main).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
            this.towns = this.nodes.filter(node => node.is_planttown);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  getDistances = (source: pos) => {
    this.distances = this.towns
      .map(town => ({
        town: town.name,
        distance: Math.min(150, Math.sqrt((town.pos.x - source.x) ** 2 + (town.pos.y - source.y) ** 2 + (town.pos.z - source.z) ** 2) / 100 / 150),
      }))
      .sort((a, b) => b.distance - a.distance);
  };
}
