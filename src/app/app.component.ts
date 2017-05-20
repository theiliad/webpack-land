import { Component } from '@angular/core';

import '../styles/styles.scss';
import '../../node_modules/ionicons/dist/css/ionicons.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss')]
})

export class AppComponent {
  categories: {}[] = [
    {title: "File Type",  tag: "filetype"},
    {title: "Component & Template",  tag: "component-template"},
    {title: "Styles",     tag: "styles"},
    {title: "Language & Framework",   tag: "language-framework"},
    {title: "Utility",    tag: "utility"},
    {title: "Testing",    tag: "testing"}
  ];

  pluginsList     = require('./plugins.json');
  filteredPlugins = this.pluginsList;

  searchTerm: string;

  constructor() {}

  search() {
    console.log(this.searchTerm);

    this.filteredPlugins = this.pluginsList.filter(tag => {
        return tag.name.indexOf(this.searchTerm) >= 0 || tag.description.indexOf(this.searchTerm) >= 0;
    }); 
  }
}