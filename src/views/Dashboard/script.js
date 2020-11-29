import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import DxTreeView from 'devextreme-vue/tree-view';
import {DxTabPanel} from 'devextreme-vue/tab-panel';
import {DxItem} from 'devextreme-vue/form';
import {DxSortable} from 'devextreme-vue';
import {DxButton, DxDrawer} from 'devextreme-vue';
import DxTabs from 'devextreme-vue/tabs';


export default {
  name: 'Home',
  components: {
    CoreView: () => import('@/views/Constructor/CoreView/CoreView'),
    Users: () => import('@/components/Users/Users'),
    Splitpanes, Pane,
    DxTreeView, DxTabPanel, DxItem, DxSortable, DxDrawer, DxButton, DxTabs
  },
  data() {
    return {
      selectedIndexTab: 1,
      openState: true,
      selectedOpenMode: 'shrink',
      heightTree: window.innerHeight / 1.12,
      widthtLeftPanel: 500,
      widthtRigthPanel: innerWidth - 500,
      menus: [],
      reports: [],
      searchMode: 'contains',
      tabPages: [],
      selectedTabPanel: {},
      icons: [],
      viewHeight: document.documentElement.clientHeight
    }

  },
  mounted() {
    this.loadSolution();
    this.loadReports();
    window.addEventListener('resize', this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    menuClick() {
      this.openState = !this.openState;
    },
    preferencesClick() {
      this.selectItemMenu(
        {
          'itemData': {
            'expanded': true,
            'tableName': 'setts',
            'fieldWhere': null,
            'id': 12,
            'idModel': 17,
            'parentId': 11,
            'text': 'Настройки пользователей',
            'vueComponent': 'Settings'
          }

        }
      );
    },
    resizeHandler() {
      this.viewHeight = document.documentElement.clientHeight;
    },
    closeButtonHandler(itemData) {
      if (!itemData) return;
      this.tabPages.splice(this.tabPages.indexOf(itemData), 1);
      this.selectedTabPanel = {};
    },
    selectItemMenu: function (e) {
      if (e.itemData.tableName == '' || e.itemData.tableName == null)
        return;
      let page = this.tabPages.find(p => p.id == e.itemData.id);
      if (page == null) {
        page = e.itemData;
        this.tabPages.push(page);
      }
      this.selectedTabPanel = page;
    },
    loadSolution: function () {
      this.$http.post(`/DesignerData/GetSolutionModel`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.menus = response.data;
          this.tabPages.push(this.menus[0]);
          this.selectedTabPanel = this.menus[0];
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectItemReports: function (e) {
      // if (e.itemData.isReport !== true)
      //   return;
      // let page = this.tabPages.find(p => p.id == e.itemData.id && p.isReport != null);
      // if (page == null) {
      //   page = e.itemData;
      //   this.tabPages.push(page);
      // }
      // this.selectedTabPanel = page;
      if (e.itemData.text == '' || e.itemData.text == null)
        return;
      if (e.itemData.expanded == true)
        return;
      if (page == null)
      {
        page = e.itemData;
        this.tabPages.push(page);
      }
      this.selectedTabPanel = page;
      var flag = true;
      do {
        var page = this.tabPages.findIndex(p => p.isReport == true);
        if(page == -1){
          flag = false
        }
        else{
          this.tabPages.splice(page,1);
        }
      } while (flag);
      page = e.itemData;
      this.tabPages.push(page);
      this.selectedTabPanel = page;
    },
    loadReports: function () {
      this.$http.post(`/Reports/GetReports`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.reports = response.data;
          // this.tabPages.push(this.reports[0]);
          // this.selectedTabPanel = this.reports[0];
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
