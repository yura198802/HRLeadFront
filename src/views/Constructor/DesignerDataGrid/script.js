import {
  DxDataGrid, DxColumn, DxLookup, DxHeaderFilter, DxSearchPanel, DxFilterRow, DxScrolling, DxExport,
  DxSummary, DxTotalItem, DxSelection, DxPaging, DxPager
} from 'devextreme-vue/data-grid';
import {DxToolbar, DxPopup, DxButton} from 'devextreme-vue';
import {DxTabPanel} from 'devextreme-vue/tab-panel';
//import {DxLoadPanel} from 'devextreme-vue/load-panel';
import DxValidationGroup from 'devextreme-vue/validation-group';
import {DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel} from 'devextreme-vue/form';
import {DxScrollView} from 'devextreme-vue/scroll-view';
import {DxLoadPanel} from 'devextreme-vue/load-panel';
import notify from 'devextreme/ui/notify';
import Vue from 'vue';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import {exportDataGrid} from 'devextreme/excel_exporter';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'Home',
  components: {
    DxValidationSummary,
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxLookup,
    DxHeaderFilter,
    DxSearchPanel,
    DxFilterRow,
    DxPopup,
    DxForm,
    DxSimpleItem, DxLoadPanel,
    DxLabel,
    DxButtonItem,
    DxValidationGroup,
    DxButton,
    DxRequiredRule,
    DxEmptyItem,
    DxScrollView,
    DxScrolling,
    notify,
    DxExport,
    DxSummary,
    DxTotalItem,
    DxSelection,
    DxPaging,
    DxPager, Splitpanes, Pane, DxTabPanel
  },
  props: {
    templateData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tabPageDetails: [],
      models: [],
      keyModel: 'Id',
      jsonResult: {},
      modelsData: [],
      fieldWhere: '',
      columns: [],
      heighttPanel: window.innerHeight / 1.17,
      elementCloseBtn: {
        widget: 'dxButton',
        location: 'after',
        options: {
          icon: 'close',
          type: 'danger',
          hint: 'Закрыть',
          validationGroup: 'DesignerModelEditor',
          onClick: () => this.closeFormEditor()
        }
      },
      validateMessageErrorBySave: '',
      toolbarContentDetail: [],
      modelId: -1,
      propertyItems: [],
      modelSolution: {},
      isVisibleEditForm: false,
      captionEditFormModel: '',
      modelDetailId: 0,
      selectionMode: 'multiple',
      editModel: {},
      keyValue: -1,
      widthDetail: '80%',
      heightDetail: '80%',
      keyEditId: -1,
      isChengeValue: false,
      loadingVisible: false,
      focusedRowKey: -1,
      pageSizes: [25, 50, 100]
    }

  },
  computed: {
    dataGrid: function () {
      return this.$refs["dataGrid"].instance;
    },
    tabPanel: function () {
      if (this.selectedTabPanel == null)
        return null;
      return this.$refs["coreView" + this.selectedTabPanel.idModel];
    }
  },
  mounted() {
  },
  methods: {
    onFocusedRowChanged(e) {
      this.keyValue = e.row.key;
      this.selectedFieldModelData = e.row.data;
      this.focusedRowKey = this.keyValue;
    },
    onExporting(e) {
      if (this.modelSolution == null)
        return;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet();
      const nameExcel = `${this.modelSolution.text}.xlsx`;

      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        autoFilterEnabled: true
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(new Blob([buffer], {type: 'application/octet-stream'}), nameExcel);
        });
      });
      e.cancel = true;
    },
    async loadDataModel(modelId, sysNameDialogForm, selectionMode) {
      if (selectionMode != null)
        this.selectionMode = selectionMode;
      this.models = [];
      this.keyValue = -1;
      this.sele
      if (modelId == -1 || modelId == 0 || modelId == null)
        return;

      this.modelId = modelId;
      console.log(this.modelId);
      this.loadingVisible = true;

      const vm = this
      await this.$http.post(`/DesignerData/GetDataList`, {
        formId: modelId, formIdByDetail: 0, fieldWhere: vm.fieldWhere,
        sysNameDialogForm: sysNameDialogForm
      }, {
        headers: {
          Authorization: `Bearer ${vm.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          vm.keyModel = response.data.keyField;
          vm.columns = JSON.parse(response.data.columns);
          vm.models = JSON.parse(response.data.data);
          vm.propertyItems = JSON.parse(response.data.formProperty);
          vm.widthDetail = `${response.data.formModel.widthDetail}%`;
          vm.heightDetail = `${response.data.formModel.heightDetail}%`;
          vm.setEventsEditBox(vm.propertyItems);
          if (vm.focusedRowKey == -1 && vm.models.length > 0) {
            vm.focusedRowKey = vm.models[0][vm.keyModel];
          }

          this.loadingVisible = false;
        })
        .catch(function (error) {
          console.log(error);
          this.loadingVisible = false;
          notify("Не удалось получить данные", 'error', 10000, 600)
        });
    },
    setEventsEditBox(e) {
      let index = 0;
      for (index = 0; index < e.length; ++index) {
        let element = e[index];
        if (element.editorOptions != null && element.editorOptions.onValueChanged != null) {
          element.editorOptions.onValueChanged = () => this.valueChandged();
        }
        if (element.items != null)
          this.setEventsEditBox(element.items);
      }
    },
    getSelectedIds() {

      if (this.selectionMode === "single") {
        return this.selectedFieldModelData;
      }
      let keyIds = [];
      let index = 0;
      var elements = this.dataGrid.getSelectedRowsData();
      for (index = 0; index < elements.length; ++index) {
        let elementid = elements[index][this.keyModel];
        keyIds.push(elementid);
      }
      if (elements.length === 0)
        keyIds = [this.keyValue];
      return keyIds;
    },
    refresh() {
      this.loadDataModel(this.modelSolution, this.modelDetailId, this.fieldWhere);
    },
    onRowDblClick: function (e) {
    },
  }
}
