import 'highlight.js/styles/stackoverflow-dark.css'

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";

export const highlight = {
    install(app : any) {
        hljs.registerLanguage('json', json);
        app.use(hljsVuePlugin)
    }
  }