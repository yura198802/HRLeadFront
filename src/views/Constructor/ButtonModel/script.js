import { DxDataGrid, DxColumn,DxLookup,  DxHeaderFilter,  DxSearchPanel,  DxFilterRow } from 'devextreme-vue/data-grid';
import { DxToolbar,DxPopup,DxButton} from 'devextreme-vue';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import DxValidationGroup from 'devextreme-vue/validation-group';
import {   DxForm,DxTabbedItem, DxTab, DxSimpleItem,  DxButtonItem,DxGroupItem,  DxRequiredRule,DxEmptyItem,  DxLabel} from 'devextreme-vue/form';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import notify from 'devextreme/ui/notify';

export default {
  components: { DxDataGrid, DxColumn,DxToolbar,DxLookup,DxScrollView,DxGroupItem,
    DxHeaderFilter,
    DxSearchPanel,DxLoadPanel,
    DxFilterRow,DxPopup,DxForm,DxSimpleItem,DxLabel,DxButtonItem,DxValidationGroup,DxButton,DxRequiredRule,DxEmptyItem },
  props: {
    templateData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showScrollbar: 'Always',
      scrollByContent: true,
      scrollByThumb: true,
      fieldModelByDialogOptions:{},
      fieldModelByDialog:{},
      models: [],
      typeControlOptions:{},
      typeAccecOptions:{},
      typeProfileFormOptions:{},
      captionEditFormModel:'',
      loadingVisible:false,
      isVisibleEditFormModel:false,
      buttonModelData:{},
      selectedButtonModelData:{},
      editButtons: [{
        hint: 'Редактировать',
        icon: 'edit',
        onClick: () => this.editField()
      },{
        hint: 'Удалить',
        icon: 'remove',
        onClick: () => this.removeField()
      }],
      typeBtn: [
        {id:1, caption:'Normal'},
        {id:2, caption:'Success'},
        {id:3, caption:'Danger'}
      ],
      typeActionBtn:[
        {id:1, caption:'Стандартная'},
        {id:2, caption:'Текст'},
        {id:3, caption:'Импорт файла'},
        {id:4, caption:'Экспорт файла'},
        {id:5, caption: 'Форма фильтра'}
      ],
      typeBtnOptions:{},
      typeActionBtnOptions:{},
      typeStyleMode: [
        {id:1, caption:'contained'},
        {id:2, caption:'outlined'}
      ],
      typeStyleModeOptions:{},
      typeLocation: [
        {id:1, caption:'before'},
        {id:2, caption:'center'},
        {id:3, caption:'after'}
      ],
      typeLocationOptions:{},
      focusedRowKey: 1,
      toolbarContentButton: [
      {
        widget: 'dxButton',
        location: 'after',
        hint:'Добавить',
        options: {
          icon: 'add',
          onClick: () => this.addField()
        }
      },
      {
        widget: 'dxButton',
        location: 'after',
        hint:'Обновить данные',
        options: {
          icon: 'refresh',
          onClick: () => this.loadData()
        }
      },
      {
        widget: 'dxButton',
        location: 'after',
        hint:'Генерация полей из схемы БД',
        options: {
          icon: 'variable',
          onClick: () => this.generateFields()
        }
      }],
      }
    },
  mounted(){

    this.typeBtnOptions = { dataSource: this.typeBtn,displayExpr:'caption', valueExpr:'id'};
    this.typeActionBtnOptions = {dataSource: this.typeActionBtn,displayExpr:'caption', valueExpr:'id'};
    this.typeStyleModeOptions = { dataSource: this.typeStyleMode,displayExpr:'caption', valueExpr:'id'};
    this.typeLocationOptions = { dataSource: this.typeLocation,displayExpr:'caption', valueExpr:'id'};
   },
  methods:{
    onToolbarPreparing(e) {
      for (let index = this.toolbarContentButton.length-1; index >=0 ; --index)
          {
            let element = this.toolbarContentButton[index];
            e.toolbarOptions.items.unshift(element);
          }
    },
    loadData: function(e)
    {
      let id =-1;
      if (e != null)
        id = e.idModel;
      if (this.templateData.idModel != null && e == null)
        id = this.templateData.idModel;

      if (id == -1)
        return;

      this.loadingVisible = true;
      this.models = [];
        this.$http.post(`/CrmDesigner/GetButtonByForm?idForm=${id}`, '', {
          headers: {
            Authorization: `Bearer ${this.$cookie.get('accessToken')}`
          }
        })
        .then((response) => {
          this.models = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
        this.loadingVisible = false;
    },
    addField: function()
    {
      this.buttonModelData = {formId:this.templateData.idModel};
      this.loadinfoByEdit();
      this.captionEditFormModel = 'Добавление новой кнопки';
      this.isVisibleEditFormModel = true;
    },
    loadinfoByEdit()
    {
      this.$http.post(`/CrmDesigner/GetFormsAsunc`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.fieldModelByDialog = response.data;
          console.log(this.fieldModelByDetail);
          this.fieldModelByDialogOptions = {dataSource: this.fieldModelByDialog, displayExpr: 'tableName', valueExpr: 'id'};
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editField:function()
    {
        this.loadinfoByEdit();
        this.buttonModelData = JSON.parse(JSON.stringify(this.selectedButtonModelData));
        this.captionEditFormModel = `Редактирование кнопки: ${this.buttonModelData.displayName} (${this.buttonModelData.sysName})`;
        this.isVisibleEditFormModel = true;
    },
    removeField: function()
    {
      let result = confirm("Вы уверены, что хотите удалить запись?", "Внимание");
      if (result === false)
        return;

      this.$http.post(`/CrmDesigner/RemoveButtonModel?id=${this.selectedButtonModelData.id}`, '', {
        headers: {
            Authorization: `Bearer ${this.$cookie.get('accessToken')}`
          }
        })
        .then((response) => {
          this.models.splice(this.models.indexOf(this.selectedFormModel),1);
          this.loadData();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveModel:function(e)
    {
      let result = e.validationGroup.validate();
      if (result.isValid === false){
        notify("Не заполнены обязательные поля!","error")
        return;
      }
        this.$http.post(`/CrmDesigner/SaveButtonByForm`, this.buttonModelData, {
          headers: {
            Authorization: `Bearer ${this.$cookie.get('accessToken')}`
          }
        })
        .then((response) => {
          this.isVisibleEditFormModel = false;
          this.loadData();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    closeFormEditor: function()
    {
       this.isVisibleEditFormModel = false;
    },
    onFocusedRowChanged(e) {
      this.selectedButtonModelData = e.row.data;
    },
    generateFields: function()
    {
      let result = confirm("Сгенерировать кнопки по умолчанию?", "Внимание");
      if (result == false)
        return;
      this.$http.post(`/CrmDesigner/GenerateButtonMySql?formId=${this.templateData.idModel}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
      .then((response) => {
        this.loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
