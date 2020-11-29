import {
  DxDataGrid, DxColumn, DxLookup, DxHeaderFilter, DxSearchPanel, DxFilterRow, DxScrolling, DxExport,
  DxSummary, DxTotalItem, DxSelection, DxPaging, DxPager
} from 'devextreme-vue/data-grid';
import {DxToolbar, DxPopup, DxButton, DxDrawer} from 'devextreme-vue';
import {DxTabPanel} from 'devextreme-vue/tab-panel';
import {DxLoadPanel} from 'devextreme-vue/load-panel';
import DxValidationGroup from 'devextreme-vue/validation-group';
import {DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel} from 'devextreme-vue/form';
import {DxScrollView} from 'devextreme-vue/scroll-view';
import notify from 'devextreme/ui/notify';
import DxDateBox from 'devextreme-vue/date-box';
import Vue from 'vue';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import {exportDataGrid} from 'devextreme/excel_exporter';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {DxFileUploader} from 'devextreme-vue/file-uploader';
import FilterForm from '../FilterForm/FilterForm'
import FormMultiArea from '../FormMultiTextBox/FormMultiTextBox'

export default {
  name: 'Home',
  components: {
    DxFileUploader,
    CoreView: () => import('@/views/Constructor/CoreView/CoreView'),
    Dialog: () => import('@/views/Constructor/Dialog/Dialog'),
    FilterDialog: () => import('@/views/Constructor/FilterDialog/FilterDialog'),
    FilterForm,FormMultiArea,
    DxValidationSummary,
    DxDataGrid,
    DxColumn,
    DxToolbar, DxDrawer,
    DxLookup,
    DxHeaderFilter,
    DxSearchPanel,
    DxLoadPanel, DxDateBox,
    DxFilterRow,
    DxPopup,
    DxForm,
    DxSimpleItem,
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
      //#region upLoaderFile
      actionActiveBtn: {},
      multiplefiles: false,
      accept: '*.*',
      //#endregion
      openState: false,
      horizontal:true,
      dialogSysName: '',
      hideDetailPane: true,
      tabPageDetails: [],
      maxSizePanelGrid: 100,
      selectedTabPanel: {},
      models: [],
      dateNow: new Date(),
      keyModel: 'Id',
      jsonResult: {},
      minSizeLeftPanel:40,
      maxSizeLeftPanel:70,
      modelsData: [],
      fieldWhere: '',
      isEdit:false,
      columns: [],
      heighttPanel: window.innerHeight / 1.17,
      loadingVisible: false,
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
      isVisibleEditFormDialog: false,
      validateMessageErrorBySave: '',
      toolbarContentDetail: [],
      actionClcik: '',
      modelId: -1,
      propertyItems: [],
      modelSolution: {},
      objParent: null,
      isVisibleEditForm: false,
      captionEditFormModel: '',
      modelDetailId: 0,
      editModel: {},
      keyValue: -1,
      hideFilterPanel: true,
      widthDetail: '80%',
      heightDetail: '80%',
      isAutoWidthColumn: true,
      isVisibleFooter: true,
      selectedOpenMode: 'shrink',
      keyEditId: -1,
      isChengeValue: false,
      focusedRowKey: -1,
      multipleMode: 'multiple',
      pageSizes: [25, 50, 100],
      loadPanel: {
        enabled: true,
        height: 90,
        indicatorSrc: "",
        shading: false,
        shadingColor: "",
        showIndicator: true,
        showPane: true,
        text: "Загрузка...",
        width: 200
      },
    }

  },
  computed: {
    dialog: function () {
      return this.$refs["dialogAction"].instance;
    },
    dataGrid: function () {
      return this.$refs["dataGrid"].instance;
    },
    dateTimeDialog: function () {
      return this.$refs["dateTimeDialog"].instance;
    },
    tabPanel: function () {
      if (this.selectedTabPanel == null)
        return null;
      return this.$refs["coreView" + this.selectedTabPanel.idModel];
    },
    filterForm: function()
    {
      return this.$refs["filterForm"];
    },
    //#region upLoaderFile
    chooseFileOrFiles: function () {
      return this.singlefile ? "Выбрать файл" : "Выбрать файлы";
    },
    //#endregion
  },
  mounted() {
  },
  methods: {
//#region upLoaderFile
    async handleFileUpload(e) {
      this.file = this.$refs.file.files[0];
      await this.previewFile();
      this.refresh();
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64); // Comment this if not using base64
      const bytes = new Uint8Array(binaryString.length);
      return bytes.map((byte, i) => binaryString.charCodeAt(i));
    },
    async previewFile() {
      let formData = new FormData();
      formData.append('FormFileCollection', this.$refs.file.files[0]);
      formData.append('Ids', this.getSelectedIds());
      await this.$http.post(`/DesignerData/ImportFile?formId=${this.modelId}&sysname=${this.actionActiveBtn.sysName}`,
        formData
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$cookie.get('accessToken')}`
          }
        })
        .then(response => {
          this.refresh();
        })
        .catch(error => {
          a = error;
        });
    },
//#endregion
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
    loadButtons: function (modelId, modelFilter) {
      this.$http.post(`/DesignerData/GetButtons`, {formId: modelId, filterModel: modelFilter}, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.toolbarContent = JSON.parse(JSON.stringify(response.data));
          this.dataGrid.repaint();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onRowDblClick: function () {
      if (this.isEdit == true)
        this.edit();
    },

    loadButtonsDetail: function (modelId) {

      this.getDetailInfo(modelId);
      this.$http.post(`/DesignerData/GetButtonsDetail`, {formId: modelId}, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.toolbarContentDetail = JSON.parse(JSON.stringify(response.data));
          let index = 0;
          for (index = 0; index < this.toolbarContentDetail.length; ++index) {
            let element = this.toolbarContentDetail[index];
            element.onClick = () => this.actionDetail(element);
          }
          this.toolbarContentDetail.push(this.elementCloseBtn);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadReport(report){
      if (report == null)
      return;
    },
    loadDataModel: async function (model, idModelDetail, fieldWhere, objParent, modelFilter) {
      if (model == null)
        return;
      this.objParent = objParent;
      let modelId = model.idModel;
      if (modelId == -1 || modelId == 0 || modelId == null)
        return;
      if (this.modelId == -1) {
        this.loadButtonsDetail(modelId);
      }

       if (model.orientation == 1)
       {
         this.horizontal = true;
       }
       else {
         this.horizontal = false;
         this.minSizeLeftPanel = 30;
         this.maxSizePanelGrid = 40;
       }
      this.loadButtons(modelId, modelFilter);
      this.modelDetailId = idModelDetail;
      this.fieldWhere = fieldWhere;
      this.modelId = modelId;
      this.modelSolution = model;
      this.loadingVisible = true;

      if (modelFilter == null) {
        await this.filterForm.loadDataFilterPanel(modelId);
        if (this.filterForm.propertyFilterItems.length > 0) {

          this.hideFilterPanel = false;
          this.openState = true;
        }

        if (this.hideFilterPanel === false) {
          this.refresh();
          return null;
        }
      }
      this.dataGrid.beginCustomLoading();
      await this.$http.post(`/DesignerData/GetDataList`, {
        formId: modelId,
        formIdByDetail: idModelDetail,
        fieldWhere: fieldWhere,
        filterModel: modelFilter
      }, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.keyModel = response.data.keyField;
          this.columns = JSON.parse(response.data.columns);
          this.propertyItems = JSON.parse(response.data.formProperty);
          this.setEventsEditBox(this.propertyItems);
          this.models = JSON.parse(response.data.data);
          this.widthDetail = `${response.data.formModel.widthDetail}%`;
          this.heightDetail = `${response.data.formModel.heightDetail}%`;
          this.isAutoWidthColumn = !response.data.formModel.isNotAutoWidthColumn;
          this.isVisibleFooter = !response.data.formModel.isNotVisibleFooter;
          this.loadingVisible = false;
          this.dataGrid.endCustomLoading();
          if (this.focusedRowKey == -1 && this.models.length > 0) {
            this.focusedRowKey = this.models[0][this.keyModel];
          }
        })
        .catch(function (error) {
          console.log(error);
          notify("Не удалось получить данные", 'error', 10000, 600)
          this.loadingVisible = false;
          this.dataGrid.endCustomLoading();
        });
    },

    actionTextButton(e) {
      this.$refs["dialogAction"].captionForm = e.CaptionDialogFormModel;
      this.$refs["dialogAction"].openForm(e.DialogFormModelId, e.sysName, 'single', e);
      this.dialogSysName = e.sysName;
    }
    ,
    setEventsEditBox(e) {
      let index = 0;
      for (index = 0; index < e.length; ++index) {
        let element = e[index];
        if (element.editorOptions != null && (element.editorOptions.buttons != null)) {
          if (element.editorOptions.buttons.length === 2 && element.editorOptions.buttons[1].name === "more") {
            element.editorOptions.buttons[1].options.onClick = () => this.actionTextButton(element.editorOptions.buttons[1]);
          }
        }
        if (element.editorOptions != null && element.editorOptions.onValueChanged != null) {
          element.editorOptions.onValueChanged = () => this.valueChandged();
        }
        if (element.template != null && element.template == "multiarea" && this.$refs["multiarea"] != null)
        {
          this.$refs["multiarea"].dataLoad(this.editModel[element.dataField]);
        }
        if (element.items != null)
          this.setEventsEditBox(element.items);
      }
    },
    onToolbarPreparing(e) {
      if (this.toolbarContent == null)
        return;
      for (let index = this.toolbarContent.length - 1; index >= 0; --index) {
        let element = this.toolbarContent[index];
        e.toolbarOptions.items.unshift(element);
        if (element.sysName == "Edit")
          this.isEdit =  true;
        if (element.typeAction != null) {
          if (element.typeAction === "ImportFile") {

            this.importSysName = element.options.sysname;
            // element.options.onClick() = ()=>{
            //   var a = "";
            // };
          }
        }
        element.onClick = () => this.action(element);
      }
    },
    onFocusedRowChanged(e) {
      this.keyValue = e.row.key;
      this.selectedFieldModelData = e.row.data;
      this.focusedRowKey = this.keyValue;
      if (this.tabPanel != null)
        this.tabPanel.loadDataDetailModel(this.keyValue, this.selectedTabPanel.fieldWhere, this);
    },
    onSelectionChanged(e) {
      console.log(this.selectedTabPanel);
      this.selectedTabPanel = e.addedItems[0];
      if (this.tabPanel != null)
        this.tabPanel.loadDataDetailModel(this.keyValue, this.selectedTabPanel.fieldWhere);
    },
    actionDetail(e) {
      if (e.sysName == 'Save')
        this.saveModel();
      else this.actionDetailSysname(e);
    },
    filterClick() {
      this.toolbarContent.push({
        sysName: 'filter',
        widget: 'dxButton',
        location: 'before',
        visible: !this.openState == false ? true : false,
        options: {

          icon: 'filter',
          onClick: (e) => {
            this.openState = !this.openState
            this.toolbarContent.splice(-1, 1)
            this.dataGrid.repaint();
          }

        }
      });
      this.openState = !this.openState
      this.dataGrid.repaint();
    },
    action(e) {
      this.actionActiveBtn = e;
      if (e.sysName == 'filter')
        return;
      if (e.sysName == 'Add')
        this.add();
      else if (e.sysName == 'Edit')
        this.edit();
      else if (e.sysName == 'Copy')
        this.copy();
      else if (e.sysName == 'Delete')
        this.delete();
      else if (e.sysName == 'Print')
        this.print();
      else if (e.sysName == 'Refresh')
        this.refresh();
      else if (e.typeAction == "ImportFile") {
        let fileInputElement = this.$refs.file;
        fileInputElement.accept = e.dopInfo;
        fileInputElement.click();
      } else if (e.typeAction == "ExportFile") {
        this.actionExport(e.sysName);
      }
      else if (e.typeAction == "DialogFilter")
      {
        this.$refs["dialogFilterAction"].captionForm = e.CaptionDialogFormModel;
        this.$refs["dialogFilterAction"].openForm(this.modelSolution.idModel, e);
        this.dialogSysName = e.sysName;
      }
      else if (e.DialogFormModelId != 0) {
        this.$refs["dialogAction"].captionForm = e.CaptionDialogFormModel;
        this.$refs["dialogAction"].openForm(e.DialogFormModelId, e.sysName);
        this.dialogSysName = e.sysName;
      } else if (e.sysName.endsWith("Date")) {
        this.actionClcik = e.sysName;
        this.isVisibleEditFormDialog = true;
      } else this.actionSysName(e.sysName, null, null,e);
    },
    actionOkByFormDialog(e, selectionMode, txtBtn) {
      if (selectionMode !== 'single') {
        this.actionSysName(this.dialogSysName, null,e, null);
        this.dialogSysName = '';
      } else this.updateFieldModel(e, txtBtn)
    },
    updateFieldModel(model, txtBtn) {
      for (let index = 0; index < txtBtn.OtherParam.length; ++index) {
        let element = txtBtn.OtherParam[index];
        this.editModel[element.FieldModel] = model[element.FieldDialog];
      }
      this.$refs['formEditro'].instance.updateData(this.editModel);
    },
    actionExport(sysName) {
      let ids = this.getSelectedIds();
      if (ids.length === 0)
        return;
      this.$http.post(`/DesignerData/ActionExportResult?sysname=${sysName}&formId=${this.modelId}`, {
        Ids: ids
      }, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          let files = response.data;
          files.forEach(s =>
          {
            this.createAndDownloadBlobFile(this.base64ToArrayBuffer(s.fileContent), s.fileName, s.typeFile)
          });

        })
        .catch(function (error) {
          notify("Не удалось выполнить действие", 'error', 10000, 600)
          console.log(error);
        });
    },
    createAndDownloadBlobFile(body, filename, extension) {
      const blob = new Blob([body]);
      const fileName = `${filename}.${extension}`;
      if (navigator.msSaveBlob) {
        // IE 10+
        //console.log("Файл сохранен.");
        navigator.msSaveBlob(blob, fileName);
      } else {
        const link = document.createElement('a');
        // Browsers that support HTML5 download attribute
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute("type", blob.type);
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          let wnd = null;
          //if(!document.documentMode && window.msWriteProfilerMark)
          if (navigator.appVersion.indexOf("Chrome") != -1 && navigator.appVersion.indexOf("Edg"))
            wnd = window.open(link); // Microsoft Edge
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          //console.log("Файл загружен.");
          if (wnd != null)
            wnd.close();
        } else {
          console.log("Загрузка файла невозможна.");
          return;
        }
        let url = "";
        window.open(url);
      }
    },
    actionDetailSysname(element)
    {
      this.$http.post(`/DesignerData/ActionByDetailModel?sysname=${element.sysName}&formId=${this.modelId}`,this.editModel,
 {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          if (response.data != null)
            this.editModel = response.data;
        })
        .catch(function (error) {
          notify("Не удалось выполнить действие", 'error', 10000, 600)
          console.log(error);
        });
    },
    actionSysName(sysName, otherInfo, Ids,actionButton) {
      console.log('sdfsdfsdf');
      if (Ids!=null && Ids.length === 0)
        return;
      if (actionButton != null && actionButton.Message != null &&  actionButton.Message != "") {
        let result = confirm(actionButton.Message, "Внимание");
        if (result === false)
          return;
      }
      let ids = Ids === null ? this.getSelectedIds() : Ids;
      this.$http.post(`/DesignerData/ActionByModel?sysname=${sysName}&formId=${this.modelId}`, {
        OtherInfo: otherInfo,
        Ids: ids
      }, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          notify("Действие успешно выполненно", 'success', 10000, 600);
          if (this.objParent != null) {
            this.objParent.refresh();
            this.objParent.focusedRowKey = -1;
          }
          this.refresh();
        })
        .catch(function (error) {
          notify("Не удалось выполнить действие", 'error', 10000, 600)
          console.log(error);
        });
    },
    async getProppertys() {
      await this.$http.post(`/DesignerData/GetEditModel?id=${0}&formId=${this.modelId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.propertyItems = JSON.parse(response.data.formProperty);
          this.setEventsEditBox(this.propertyItems);
        })
        .catch(function (error) {
          notify("Не удалось получить данные", 'error', 10000, 600)
          console.log(error);
        });
    },
    async add() {
      this.validateMessageErrorBySave = '';
      this.keyEditId = 0;
      this.validateMessageErrorBySave = '';
      await this.getProppertys();
      this.editModel[`${this.fieldWhere}`] = this.modelDetailId;
      if (this.modelDetailId != null)
        this.editModel = JSON.parse(`{"${this.keyModel}":0, "${this.fieldWhere}":${this.modelDetailId}}`);
      else this.editModel = JSON.parse(`{"${this.keyModel}":0}`);
      this.captionEditFormModel = `${this.modelSolution.text}. Добавление новой записи`;
      this.isVisibleEditForm = true;


    },
    edit() {
      if (this.models.length == 0)
        return;
      this.validateMessageErrorBySave = '';
      let id = this.keyValue;
      this.keyEditId = id;
      this.$http.post(`/DesignerData/GetEditModel?id=${id}&formId=${this.modelId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.editModel = JSON.parse(response.data.data);
          this.propertyItems = JSON.parse(response.data.formProperty);
          this.editModel[`${this.fieldWhere}`] = this.modelDetailId;
          this.captionEditFormModel = `${this.modelSolution.text}. Редактирование записи`;
          this.isVisibleEditForm = true;
          this.setEventsEditBox(this.propertyItems);
        })
        .catch(function (error) {
          notify("Не удалось получить данные", 'error', 10000, 600)
          console.log(error);
        });
    },
    async copy() {
      this.validateMessageErrorBySave = '';
      let id = this.keyValue;
      this.keyEditId = id;
      await this.getProppertys();
      await this.$http.post(`/DesignerData/GetEditModel?id=${id}&formId=${this.modelId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.editModel = JSON.parse(response.data.data);
          Vue.set(this.editModel, this.keyModel, 0);
          if (this.modelDetailId != null)
            this.editModel[this.fieldWhere] = this.modelDetailId;
          this.keyEditId = 0;
          this.captionEditFormModel = `${this.modelSolution.text}. Добавление новой записи`;
          this.isVisibleEditForm = true;
        })
        .catch(function (error) {
          notify("Не удалось получить данные", 'error', 10000, 600)
          console.log(error);
        });

    },
    getSelectedIds() {
      let keyIds = [];
      let index = 0;
      var elements = this.dataGrid.getSelectedRowsData();
      for (index = 0; index < elements.length; ++index) {
        let elementid = elements[index][this.keyModel];
        keyIds.push(elementid);
      }
      if (keyIds.length === 0)
        keyIds.push(this.keyValue);
      return keyIds;
    },
    delete() {
      if (this.models.length == 0)
        return;
      let result = confirm("Вы уверены, что хотите удалить запись?", "Внимание");
      if (result == false)
        return;

      let elements = this.dataGrid.getSelectedRowsData();
      let keyIds = [];
      if (elements.length > 0)
        keyIds = this.getSelectedIds();
      else keyIds = [this.keyValue];

      this.$http.post(`/DesignerData/RemoveEntity?formId=${this.modelId}&typeEditor=1`, keyIds, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.refresh();
          if (response.data.errors.length > 0) {
            notify(`${response.data.errors[0].description}`, 'error', 10000, 600);
          } else {
            notify("Данные удалены", 'success', 10000, 600);
            if (elements.length == 0) {
              let indexRow = this.models.indexOf(this.selectedFieldModelData);
              this.models.splice(indexRow, 1);
            } else {
              for (let index = 0; index < elements.length; ++index) {
                let indexRow = this.models.indexOf(elements[index]);
                this.models.splice(indexRow, 1);
              }
            }
          }
          this.isVisibleEditForm = false;
        })
        .catch(function (error) {
          notify("При удалении данных произошла ошибка", 'error', 10000, 600)
          console.log(error);
        });
    },
    async refresh() {
      await this.loadDataModel(this.modelSolution, this.modelDetailId, this.fieldWhere, null, this.filterForm.filterModelData);

    },
    async getDetailInfo(formId) {
      await this.$http.post(`/DesignerData/GetDetailInfoModels?formId=${formId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.tabPageDetails = response.data;
          this.hideDetailPane = this.tabPageDetails.length === 0;
          if (this.tabPageDetails.length === 0)
            this.maxSizePanelGrid = 60;
          else this.selectedTabPanel = this.tabPageDetails[0];
        })
        .catch(function (error) {
          notify("Получение данных деталей", 'error', 10000, 600)
          console.log(error);
        });
    },
    async afterSaveModel() {
      this.$http.post(`/DesignerData/AfterSaveModel?formId=${this.modelId}&idModel=${this.keyEditId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.isVisibleEditForm = false;
        })
        .catch(function (error) {
          notify("После сохранения данных произошла ошибка", 'error', 10000, 600)
          console.log(error);
        });
    },

    async saveModel(e) {
      let resValidate = await this.validateRule();
      if (resValidate === false) {
        notify(this.validateMessageErrorBySave, 'error', 10000, 600)
        return;
      }

      this.$http.post(`/DesignerData/SaveModel?formId=${this.modelId}&typeEditor=1`,
        {
          SaveModel: this.editModel,
          FilterModel:this.filterModelData
        }, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.afterSaveModel();
          if (response.data.errors.length > 0) {
            notify(`${response.data.errors[0].description}`, 'error', 10000, 600);
          }
          if (this.keyEditId == 0) {
            this.models.push(JSON.parse(response.data.result));
          } else {
            let indexRow = this.dataGrid.getRowIndexByKey(this.keyEditId);
            Vue.set(this.models, indexRow, JSON.parse(response.data.result));
          }
        })
        .catch(function (error) {
          notify("При сохранении данных произошла ошибка", 'error', 10000, 600)
          console.log(error);
        });
    },
    closeFormEditor() {
      if (this.isChengeValue == true) {
        let result = confirm("Данные на форме поменялись. Все равно выйти?", "Внимание");
        if (result == false)
          return;
      }
      this.isVisibleEditForm = false;
      this.editModel = {};
    },
    onInitialized: function (e) {
      this.isChengeValue = false;
    },
    valueChandged() {
      this.isChengeValue = true;
    },
    async validateRule() {
      this.validateMessageErrorBySave = '';
      await this.$http.post(`/DesignerData/ValidateRuleEntity?formId=${this.modelId}`, this.editModel, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          if (response.data.errors.length > 0)
            this.validateMessageErrorBySave = response.data.errors[0].description;
        })
        .catch(function (error) {
          console.log(error);
        });
      return this.validateMessageErrorBySave == '';
    }
  }
}
