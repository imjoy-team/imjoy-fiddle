<template>
  <div>
    <div class="lds-ellipsis" v-show="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <form v-show="false" ref="file_form">
      <input
        class="md-file"
        type="file"
        @change="fileSelected"
        ref="file_select"
        multiple
      />
    </form>
    <div class="navbar" is-block>
      <!-- <template slot="brand"> -->
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://imjoy.io/static/img/imjoy-logo-black.png"
          alt="ImJoy"
        />
      </b-navbar-item>
      <!-- </template> -->
      <!-- <template slot="start"> -->
      <b-navbar-dropdown v-if="config.show_file_menu" label="File">
        <b-navbar-item
          :disabled="loading"
          href="#"
          @click="$refs.file_select.click()"
        >
          <b-icon icon="file-code-outline"></b-icon> Open Local File
        </b-navbar-item>

        <b-navbar-item
          href="#"
          v-show="config.enable_tempates"
          v-for="t in templates"
          @click="loadTemplate(t.url)"
          :key="t.name"
        >
          <b-icon icon="file-star-outline"></b-icon>{{ t.name }} template
        </b-navbar-item>
        <b-navbar-item href="#" @click="saveFile()" v-show="config.enable_save">
          <b-icon icon="file-download-outline"></b-icon> Save File
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item
        v-if="config.show_install && api && api.installPlugin"
        :disabled="loading"
        href="#"
        @click="install"
      >
        <b-icon icon="harddisk-plus"></b-icon> Install
      </b-navbar-item>
      <b-navbar-item
        href="#"
        v-if="originalSource && codeChanged"
        @click="resetSourceCode"
      >
        <b-icon icon="backup-restore"></b-icon> Reset
      </b-navbar-item>
      <template v-for="(elm, k) in config.ui_elements || {}">
        <b-navbar-item
          v-if="elm.type === 'button'"
          :key="k"
          v-show="elm.visible"
          :style="elm.style"
          href="#"
          @click="elm.callback(code)"
        >
          <b-icon v-if="elm.icon" :icon="elm.icon"></b-icon> {{ elm.label }}
        </b-navbar-item>
        <b-navbar-dropdown
          v-else-if="elm.type === 'dropdown'"
          :key="k"
          :label="elm.label"
          v-show="elm.visible"
        >
          <b-navbar-item
            href="#"
            v-for="item in elm.items"
            :style="item.style"
            @click="item.callback(code)"
            :key="item.label"
          >
            {{ item.label }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <b-navbar-item
        :disabled="loading"
        v-if="config.enable_run_button"
        href="#"
        @click="run"
      >
        <b-icon icon="play"></b-icon> Run
      </b-navbar-item>
      <b-navbar-dropdown
        :disabled="loading"
        v-if="pluginAPI"
        label="Plugin API"
      >
        <b-navbar-item
          href="#"
          v-for="(apiFunc, name) in pluginAPI"
          @click="runPluginAPI(name)"
          :key="name"
        >
          {{ name }}
        </b-navbar-item>
      </b-navbar-dropdown>

      <b-navbar-item
        href="#"
        style="color: #ff0080cf"
        v-show="loading"
        @click="stop"
        v-if="config.enable_stop_button"
      >
        <b-icon icon="stop"></b-icon> Stop
      </b-navbar-item>
      <!-- </template> -->

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
    </div>
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

const IMJOY_MODE = {
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
};
export default {
  name: "ImJoyEditor",
  components: { codemirror },
  data() {
    return {
      config: { show_file_menu: true, show_install: false },
      version: version,
      code: "",
      loading: false,
      originalSource: null,
      api: null,
      plugin: null,
      templates: [
        {
          name: "empty",
          url: null
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
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: IMJOY_MODE,
        extraKeys: {
          Ctrl: "autocomplete",
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Esc(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          },
          Tab: cm => {
            if (cm.somethingSelected()) {
              cm.indentSelection("add");
              return;
            }

            if (this.config.indentWithTabs)
              cm.replaceSelection("\t", "end", "+input");
            else cm.execCommand("insertSoftTab");
          },
          "Shift-Tab": cm => {
            cm.indentSelection("subtract");
          },
          "Shift-Enter": () => {
            this.run();
          }
        }
      }
    };
  },
  mounted() {
    // inside an iframe
    if (window.self !== window.top) {
      setupImJoyAPI({
        setContent(content) {
          this.code = content;
        },
        getContent() {
          return this.code;
        },
        loadSourceCode: this.loadSourceCode,
        setLoader: this.setLoader,
        updateUIElement: this.updateUIElement,
        addUIElement: this.addUIElement,
        removeUIElement: this.removeUIElement
      }).then(api => {
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
    codeChanged() {
      return this.originalSource && this.originalSource !== this.code;
    },
    editor() {
      return this.$refs.cmEditor.codemirror;
    },
    pluginAPI() {
      if (!this.plugin) return null;
      const api = {};
      for (let k of Object.keys(this.plugin)) {
        if (["on", "off", "_rintf", "emit", "setup"].includes(k)) continue;
        api[k] = this.plugin[k];
      }
      return api;
    }
  },
  methods: {
    fileSelected() {
      if (!this.$refs.file_select.files) return;
      const file = this.$refs.file_select.files[0];
      this.loadCodeFromFile(file);
    },
    loadCodeFromFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const code = reader.result;
        this.originalSource = code;
        if (file.name.endsWith(".js")) {
          this.cmOptions.mode = {
            name: "javascript"
          };
        } else if (file.name.endsWith(".py")) {
          this.cmOptions.mode = {
            name: "python"
          };
        } else if (file.name.endsWith(".imjoy.html")) {
          this.cmOptions.mode = IMJOY_MODE;
        }
        this.editor.setValue(code);
      };
      reader.onerror = e => {
        console.error(e);
        this.api.showMessage(`Failed to load plugin source code, error: ${e}`);
        this.$forceUpdate();
      };
      reader.readAsText(file);
    },
    loadSourceCode(code, config) {
      this.originalSource = code;
      this.editor.setValue(code);
      this.config = config || {};
      this.config.lang = this.config.lang || "html";
      if (this.config.lang === "html") {
        this.cmOptions.mode = IMJOY_MODE;
      } else if (
        this.config.lang === "js" ||
        this.config.lang === "javascript"
      ) {
        this.cmOptions.mode = {
          name: "javascript"
        };
      } else if (this.config.lang === "py" || this.config.lang === "python") {
        this.cmOptions.mode = {
          name: "python"
        };
      }
      if (this.config.show_file_menu === undefined)
        this.config.show_file_menu = true;
      if (this.config.fold) {
        if (Array.isArray(this.config.fold)) {
          for (const l of this.config.fold) {
            this.editor.foldCode(this.editor.constructor.Pos(l, 0));
          }
        } else
          this.editor.foldCode(
            this.editor.constructor.Pos(this.config.fold, 0)
          );
      }
    },
    resetSourceCode() {
      if (this.originalSource) this.editor.setValue(this.originalSource);
    },
    updateSize() {
      const bbox = document.body.getBoundingClientRect();
      this.editor.setSize(bbox.width, bbox.height - 52);
      setTimeout(this.editor.refresh(), 1);
    },
    async loadTemplate(url) {
      if (!url) {
        this.code = "";
        return;
      }
      const blob = await fetch(url).then(r => r.blob());
      const temp = await new Response(blob).text();
      this.code = temp;
    },
    async install() {
      try {
        this.loading = true;
        this.plugin = await this.api.installPlugin({
          code: this.editor.getValue(),
          namespace: this.config.namespace
        });
        this.api.showMessage("Successfully installed plugin.");
      } catch (e) {
        this.api.showMessage(
          "Failed to install plugin, error: " + e.toString()
        );
      } finally {
        this.loading = false;
      }
    },
    async run() {
      try {
        this.loading = true;
        this.api.showProgress(0);
        this.plugin = await this.api.getPlugin(this.editor.getValue(), {
          namespace: this.config.namespace
        });
        if (!this.loading) {
          this.plugin = null;
          return;
        }
        if (!this.loading) return;
        if (this.plugin.run) {
          return await this.plugin.run({ config: {}, data: {} });
        }
        if (!this.loading) return;
      } catch (e) {
        this.api.showMessage("Failed to load plugin, error: " + e.toString());
      } finally {
        this.loading = false;
        this.api.showProgress(100);
      }
    },
    setLoader(loading) {
      this.loading = loading;
      this.$forceUpdate();
    },
    updateUIElement(k, newConfig) {
      const oldConfig = this.config.ui_elements[k];
      for (const c of Object.keys(newConfig)) {
        oldConfig[c] = newConfig[c];
      }
    },
    addUIElement(k, config) {
      this.config.ui_elements[k] = config;
      this.$forceUpdate();
    },
    removeUIElement(k) {
      delete this.config.ui_elements[k];
      this.$forceUpdate();
    },
    stop() {
      this.loading = false;
    },
    async runPluginAPI(name) {
      try {
        this.loading = true;
        if (typeof this.plugin[name] === "function") {
          if (name === "run") {
            await this.plugin[name]({ config: {}, data: {} });
          } else {
            await this.plugin[name]();
          }
        } else {
          this.api.alert(JSON.stringify(this.plugin[name]));
        }
      } catch (e) {
        this.api.showMessage(
          `Failed to run api function (${name}), error: ${e}`
        );
      } finally {
        this.loading = false;
      }
    },
    saveFile() {
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
.navbar {
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 2.6rem !important;
}
.navbar-item {
  height: 2.6rem;
}

.navbar-item[disabled],
.navbar-dropdown[disabled] {
  background-color: white;
  border-color: #dbdbdb;
  -webkit-box-shadow: none;
  box-shadow: none;
  opacity: 0.5;
  pointer-events: none;
}

.navbar-item.has-dropdown {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.navbar-item,
.navbar-link {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.navbar-dropdown {
  background-color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 2px solid #dbdbdb;
  -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
  box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
  display: none;
  font-size: 0.875rem;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.navbar-item.is-active .navbar-dropdown,
.navbar-item.is-hoverable:focus .navbar-dropdown,
.navbar-item.is-hoverable:focus-within .navbar-dropdown,
.navbar-item.is-hoverable:hover .navbar-dropdown {
  display: block;
}
.navbar-dropdown a.navbar-item {
  padding-right: 3rem;
}
.navbar-dropdown .navbar-item {
  padding: 0.375rem 1rem;
  white-space: nowrap !important;
}

.lds-ellipsis {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: calc(50% - 70px);
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, 0);
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #7957d5;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
