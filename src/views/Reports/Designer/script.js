//import Stimulsoft  from '@assets/stimulsoft'

import { url } from "../helper";
import {ruLocalization} from "../../../localization/ru"

export default {
  name: 'designer',
  component: {
  },
  data() {
    return {
      url:url,
      file: '',
    }
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      this.load(this.file)
    },
    load() {
      //('stimulsoft-reports-js');
      //делит меню вьюера на верхнюю и нижнюю части
      StiOptions.WebServer.url = url;
      Stimulsoft.Base.Localization.StiLocalization.setLocalization(ruLocalization);

      Stimulsoft.Report.Dictionary.StiCustomDatabase.registerCustomDatabase({
        serviceName: "MyDatabase"
        // data is only needed to specify the column types; it is enough to pass only the first line
        // if there is no data, then types are taken from types
        // and vice versa, if there are no types, the types are taken from data
      });

      // var options = new Stimulsoft.Viewer.StiViewerOptions();

      // options.toolbar.displayMode = Stimulsoft.Viewer.StiToolbarDisplayMode.Separated; //Simple;
      // options.appearance.scrollbarsMode = true;
      // options.exports.showExportToHtml = false;
      // options.appearance.fullScreenMode = true;     //полноэкранный
      // options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.Continuous;//выбор режима(во весь экран или нет)

      StiOptions.WebServer.url = `${url}`;
      var designer = new Stimulsoft.Designer.StiDesigner(null, "Designer", false);
      designer.onBeginProcessData = this.onBeginProcessData;
       designer.renderHtml("designerContent");
    },
    onBeginProcessData(e) {
      var token = this.$cookie.get('accessToken');
      e.headers.push({ key: "Authorization", value: `Bearer ${token}`});
}
  },
  mounted: function () {
    this.load();
  }
}
