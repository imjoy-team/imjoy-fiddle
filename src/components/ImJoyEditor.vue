<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://imjoy.io/static/img/imjoy-logo-black.png"
            alt="ImJoy"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-dropdown label="New">
          <b-navbar-item
            href="#"
            v-for="t in templates"
            @click="loadTemplate(t.url)"
            :key="t.name"
          >
            {{ t.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="#" @click="run">
          <b-icon icon="play"></b-icon> Run
        </b-navbar-item>
        <!-- <b-navbar-item href="#" @click="save">
          <b-icon icon="content-save"></b-icon> Save
        </b-navbar-item> -->
        <b-navbar-item href="#" @click="exportFile()">
          <b-icon icon="file-download-outline"></b-icon> Export
        </b-navbar-item>
      </template>

      <!-- <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->
    </b-navbar>
    <div class="editor">
      <codemirror
        ref="cmEditor"
        v-model="code"
        :options="cmOptions"
      ></codemirror>
    </div>
  </div>
</template>

<script>
import { version } from "../../package.json";
import { setupImJoyAPI } from "../imjoyAPI";
// require component
import { codemirror } from "vue-codemirror";

// base style
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/mbo.css";
// language
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/markdown/markdown.js";

import "codemirror/mode/vue/vue.js";
// active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
// import 'codemirror/addon/fold/indent-fold.js'
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
export default {
  name: "ImJoyEditor",
  components: { codemirror },
  data() {
    return {
      version: version,
      code: "",
      api: null,
      templates: [
        {
          name: "default",
          url:
            "https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/webWorkerTemplate.imjoy.html"
        },
        {
          name: "window",
          url:
            "https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/windowTemplate.imjoy.html"
        },
        {
          name: "web-worker",
          url:
            "https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/webWorkerTemplate.imjoy.html"
        },
        {
          name: "web-python",
          url:
            "https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/webPythonTemplate.imjoy.html"
        },
        {
          name: "native-python",
          url:
            "https://raw.githubusercontent.com/imjoy-team/ImJoy/master/web/src/plugins/nativePythonTemplate.imjoy.html"
        }
      ],
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        keyMap: "sublime",
        indentUnit: 0,
        smartIndent: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "mbo",
        hintOptions: {
          completeSingle: false
        },
        mode: {
          name: "htmlmixed",
          tags: {
            docs: [[null, null, "markdown"]],
            config: [
              ["lang", /^json$/, "javascript"],
              ["lang", /^yaml$/, "yaml"],
              [null, null, "javascript"]
            ],
            script: [
              ["lang", /^python$/, "python"],
              [null, null, "javascript"]
            ]
          }
        },
        extraKeys: {
          Ctrl: "autocomplete",
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Esc(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      }
    };
  },
  mounted() {
    // inside an iframe
    if (window.self !== window.top) {
      setupImJoyAPI({ editor: this.editor }).then(api => {
        this.api = api;
      });
    }
    // reset the height whenever the window's resized
    window.addEventListener("resize", this.updateSize);
    this.updateSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateSize);
  },
  computed: {
    editor() {
      return this.$refs.cmEditor.codemirror;
    }
  },
  methods: {
    updateSize() {
      const bbox = document.body.getBoundingClientRect();
      this.editor.setSize(bbox.width, bbox.height - 52);
      setTimeout(this.editor.refresh(), 1);
    },
    async loadTemplate(url) {
      const blob = await fetch(url).then(r => r.blob());
      const temp = await new Response(blob).text();
      this.code = temp;
    },
    async run() {
      const p = await this.api.getPlugin(this.editor.getValue());
      p.run();
    },
    save() {},
    exportFile() {
      this.api.exportFile(this.editor.getValue(), "myPlugin.imjoy.html");
    }
  }
};
</script>

<style lang="css">
.editor {
  height: calc(100vh - 52px);
}
.mdi {
  margin-right: 10px;
}
</style>
