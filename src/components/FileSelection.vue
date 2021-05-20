<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Local File">
            <b-field>
              <b-upload v-model="localFile" drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <b-icon icon="upload" size="is-large"></b-icon>
                    Drop your files here or click to upload
                  </div>

                  <span v-if="localFile" class="tag is-primary">
                    {{
                      localFile.name.slice(0, 20) +
                        (localFile.name.length > 20 ? "..." : "")
                    }}
                    <button
                      class="delete is-small"
                      type="button"
                      @click.prevent="localFile = null"
                    ></button>
                  </span>
                </section>
              </b-upload>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Web URL">
            <b-field
              label="URL"
              :type="webURLError ? 'is-danger' : ''"
              :message="webURLError"
            >
              <b-input
                type="url"
                @input="webURLError = null"
                v-model="webURL"
                maxlength="1024"
              >
              </b-input>
            </b-field>
          </b-tab-item>

          <b-tab-item :visible="!!octokit" label="Gist" icon="github">
            <tree v-if="gistTreeConfig" :config="gistTreeConfig"></tree>
            <b-button
              size="is-small"
              v-if="currentPage > 0"
              @click="
                currentPage = currentPage - 1;
                listGists();
              "
              icon-left="chevron-left"
            >
              Previous
            </b-button>
            <b-button
              size="is-small"
              @click="
                currentPage = currentPage + 1;
                listGists();
              "
              icon-left="chevron-right"
            >
              Next
            </b-button>
          </b-tab-item>

          <b-tab-item :visible="!!octokit" label="Github" icon="github">
            <div class="columns" v-if="userInfo">
              <div class="column">
                <b-select
                  sytle="width: 100px;"
                  placeholder="Select a user/organization"
                  v-model="selectedUser"
                  @input="listRepos()"
                >
                  <option :value="userInfo.login">{{ userInfo.login }}</option>
                  <option
                    v-show="orgas"
                    v-for="orga in orgas"
                    :value="orga.login"
                    :key="orga.id"
                  >
                    {{ orga.login }}
                  </option>
                </b-select>
              </div>
              <div class="column">
                <b-select
                  sytle="width: 100px;"
                  v-if="repos"
                  placeholder="Select a repo"
                  v-model="selectedRepo"
                  @input="listBranches()"
                >
                  <option
                    v-for="repo in repos"
                    :value="repo.name"
                    :key="repo.id"
                  >
                    {{ repo.name }}
                  </option>
                </b-select>
              </div>
              <div class="column">
                <b-select
                  sytle="width: 100px;"
                  v-if="branches"
                  placeholder="Select a branch"
                  v-model="selectedBranch"
                  @input="getTree()"
                >
                  <option
                    v-for="branch in branches"
                    :value="branch.name"
                    :key="branch.id"
                  >
                    {{ branch.name }}
                  </option>
                </b-select>
              </div>
            </div>

            <tree v-if="githubTreeConfig" :config="githubTreeConfig"></tree>
          </b-tab-item>
          <b-tab-item :visible="!octokit" label="Github" icon="github">
            <div class="buttons">
              <b-button
                size="is-small"
                type="is-primary"
                expanded
                @click="connectGithub()"
                icon-left="github"
              >
                Connect Github
              </b-button>
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          :disabled="!hasSelected"
          label="Select"
          @click="fileSelected()"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import TreeWidget from "./TreeWidget.vue";
import { githubUrlRaw } from "../utils";
import Authenticator from "netlify-auth-providers";
import { Octokit } from "@octokit/rest";

export default {
  name: "file-selection",
  props: ["title", "selected"],
  components: {
    tree: TreeWidget
  },
  data() {
    return {
      localFile: null,
      webURL: null,
      webURLError: null,
      gistTreeConfig: null,
      githubTreeConfig: null,
      selectedGistFile: null,
      selectedGithubFile: null,
      currentPage: 0,
      activeTab: 0,
      orgas: null,
      userInfo: null,
      repos: null,
      branches: null,
      selectedUser: null,
      selectedRepo: null,
      selectedBranch: null
    };
  },
  mounted() {
    if (this.octokit) {
      this.listOwners();
      this.listGists();
    }
  },
  computed: {
    urlValid() {
      return !!this.webURL && !this.webURLError;
    },
    hasSelected() {
      if (this.activeTab === 0) {
        return !!this.localFile;
      }
      if (this.activeTab === 1) {
        return this.urlValid;
      } else if (this.activeTab === 2) {
        return !!this.selectedGistFile;
      } else if (this.activeTab === 3) {
        return !!this.selectedGithubFile;
      } else {
        return false;
      }
    },
    ...mapState({
      octokit: state => state.octokit
    })
  },
  methods: {
    async connectGithub() {
      if (!this.octokit) {
        await this.loginGithub();
      }
      this.listOwners();
      this.listGists();
    },
    async listOwners() {
      this.selectedUser = null;
      this.selectedRepo = null;
      this.selectedBranch = null;
      this.userInfo = (await this.octokit.rest.users.getAuthenticated()).data;
      this.orgas = (
        await this.octokit.rest.orgs.listForAuthenticatedUser()
      ).data;
      this.selectedUser = this.userInfo.login;
      await this.listRepos();
    },
    async listRepos() {
      this.selectedRepo = null;
      this.selectedBranch = null;
      if (this.selectedUser === this.userInfo.login)
        this.repos = (
          await this.octokit.rest.repos.listForAuthenticatedUser()
        ).data;
      else
        this.repos = (
          await this.octokit.rest.repos.listForOrg({ org: this.selectedUser })
        ).data;
    },
    async listBranches() {
      this.selectedBranch = null;
      const repo = this.repos.filter(
        repo => repo.name === this.selectedRepo
      )[0];
      this.branches = (
        await this.octokit.rest.repos.listBranches({
          owner: repo.owner.login, // the repo maybe owned by users other than this.selectedUser
          repo: this.selectedRepo
        })
      ).data;

      this.selectedBranch = repo.default_branch;
      if (this.selectedBranch) {
        await this.getTree();
      }
    },
    async getTree() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$el
      });
      const self = this;
      const repo = this.repos.filter(
        repo => repo.name === this.selectedRepo
      )[0];
      const buildNodes = async sha => {
        const data = (
          await self.octokit.rest.git.getTree({
            owner: repo.owner.login, // the repo maybe owned by users other than this.selectedUser
            repo: repo.name,
            tree_sha: sha
          })
        ).data;
        const nodes = [];
        for (let fileObj of data.tree) {
          if (fileObj.type === "tree") {
            const itm = {
              title: fileObj.path,
              isExpanded: false,
              children: [],
              data: fileObj
            };
            nodes.push(itm);
          } else {
            const itm = {
              title: fileObj.path,
              isExpanded: false,
              data: fileObj,
              isLeaf: true
            };
            nodes.push(itm);
          }
        }

        return nodes.sort(function(a, b) {
          const x = a.isLeaf;
          const y = b.isLeaf;
          if (x === true && !y) return 1;
          if (y === true && !x) return -1;
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
      };
      try {
        const branch = this.branches.filter(
          b => b.name === this.selectedBranch
        )[0];
        this.selectedGithubFile = null;
        this.githubTreeConfig = {
          node_select_callback(node) {
            if (node[0].data.type === "blob")
              self.selectedGithubFile = node[0].data;
            else self.selectedGithubFile = null;
            self.$forceUpdate();
          },
          async node_toggle_callback(node) {
            if (!node.isExpanded) {
              node.children = await buildNodes(node.data.sha);
              self.$forceUpdate();
            }
            return node;
          },
          nodes: await buildNodes(branch.commit.sha)
        };
        this.$forceUpdate();
        // eslint-disable-next-line no-useless-catch
      } catch (e) {
        throw e;
      } finally {
        loadingComponent.close();
      }
    },
    async listGists() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$el
      });
      try {
        const gists = await this.octokit.rest.gists.list({
          per_page: 10,
          page: this.currentPage
        });
        const self = this;
        this.selectedGistFile = null;
        this.gistTreeConfig = {
          node_select_callback(node) {
            // only select if a gist file is selected
            if (node[0].data.raw_url) self.selectedGistFile = node[0].data;
            else self.selectedGistFile = null;
            self.$forceUpdate();
          }
        };
        this.gistTreeConfig.nodes = [];

        for (let gist of gists.data) {
          const itm = {
            title: gist.id,
            isExpanded: false,
            children: [],
            data: gist
          };
          for (let k of Object.keys(gist.files)) {
            itm.children.push({ title: k, isLeaf: true, data: gist.files[k] });
          }
          this.gistTreeConfig.nodes.push(itm);
        }
        // eslint-disable-next-line no-useless-catch
      } catch (e) {
        throw e;
      } finally {
        loadingComponent.close();
      }
    },
    loginGithub() {
      return new Promise((resolve, reject) => {
        const authenticator = new Authenticator({ site_id: "app.imjoy.io" });
        authenticator.authenticate(
          { provider: "github", scope: "user" },
          async (err, data) => {
            if (err) {
              this.$store.commit("setOctokit", null);
              alert("Error Authenticating with GitHub: " + err);
              reject(err);
              return;
            }
            this.$store.commit(
              "setOctokit",
              new Octokit({
                auth: data.token
              })
            );
            this.activeTab = 2;
            resolve();
          }
        );
      });
    },
    async fileSelected() {
      if (this.activeTab === 0) {
        this.selected(this.localFile, this.localFile.name);
        this.$emit("close");
      }
      if (this.activeTab === 1) {
        const http = new XMLHttpRequest();
        http.open("HEAD", this.webURL);
        http.onload = async () => {
          if (http.readyState == http.DONE) {
            if (http.status != 404 && !this.webURLError) {
              const url = (await githubUrlRaw(this.webURL)) || this.webURL;
              this.selected(
                url,
                url
                  .split("/")
                  .pop()
                  .split("#")[0]
                  .split("?")[0]
              );
              this.$emit("close");
            } else {
              this.webURLError = "Invalid URL";
            }
          }
        };
        http.onerror = () => {
          this.webURLError = "Invalid URL";
        };
        http.send();
      }
      // gist
      else if (this.activeTab === 2) {
        console.log(this.selectedGistFile);
        this.selected(
          this.selectedGistFile.raw_url,
          this.selectedGistFile.filename
        );
        this.$emit("close");
        // github repo
      } else {
        const repo = this.repos.filter(
          repo => repo.name === this.selectedRepo
        )[0];
        const result = (
          await this.octokit.rest.repos.getContent({
            owner: repo.owner.login,
            repo: repo.name,
            path: this.selectedGithubFile.path
          })
        ).data;
        console.log("===>", this.selectedGithubFile);
        this.selected(result.download_url, this.selectedGithubFile.path);
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="css"></style>
