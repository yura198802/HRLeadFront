import { url } from "../helper";
import { ruLocalization } from "../../../localization/ru";

export default {
  name: "viewer",
  props: {
    templateData: {
      type: Object,
      default: () => {
      }
    }
  },
  component: {},
  data() {
    return {
      url: url,
      file: "",
      viewerContent:'viewerContent',
    };
  },
  methods: {
    async loadReport() {

    },
    load(id) {
      this.viewerContent = this.viewerContent;
      console.log(this.$el);

      Stimulsoft.Base.Localization.StiLocalization.setLocalization(
        ruLocalization
      );
      StiOptions.WebServer.url = url;
      var options = new Stimulsoft.Viewer.StiViewerOptions();
      //options.toolbar.showOpenButton = false;
      options.toolbar.showButtonCaptions = false;
      options.toolbar.showFullScreenButton = false;
      options.toolbar.showAboutButton = false;
      options.toolbar.showBookmarksButton = false;
      Stimulsoft.Viewer.StiToolbarDisplayMode.Separated; //Simple;
      options.appearance.parametersPanelSortDataItems = false;//Отключить автосортировку
      options.appearance.scrollbarsMode = true;
      options.appearance.fullScreenMode = true; //полноэкранный
      options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.Continuous; //выбор режима(во весь экран или нет)
      var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
      var report = new Stimulsoft.Report.StiReport();
      report.load(this.file);
      viewer.onBeginProcessData = this.onBeginProcessData;
      viewer.report = report;

      console.log(this.viewerContent);
      viewer.renderHtml(this.viewerContent);//
    },
    onBeginProcessData(e) {
      var token = this.$cookie.get("accessToken");
      e.headers.push({ key: "Authorization", value: `Bearer ${token}` });
    },
    async getFile(id) {
      const vm = this;
      await this.$http
        .post(`/DesignerData/GetStimulsoftReport?id=${id}`, "", {
          headers: {
            Authorization: `Bearer ${this.$cookie.get("accessToken")}`
          }
        })
        .then(response => {
          debugger
          vm.file = response.data;
        })
        .catch(function(error) {
          debugger
        });
    },
    loader: async function (id) {
      if (id == -1)
        return;
      this;
        await this.$http
          .post(`/DesignerData/GetStimulsoftReport?id=${id}`, {}, {
            headers: {
              Authorization: `Bearer ${this.$cookie.get("accessToken")}`
            }
          })
          .then(response => {
            this.file = response.data;
          })
          .catch(function(error) {
          });

          this.load(id);
    },
  },
  mounted: async function() {
  }
}
