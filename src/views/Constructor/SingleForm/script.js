import { DxButton,DxDrawer, DxToolbar,DxPopup,DxSelectBox} from 'devextreme-vue';
import {DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel} from 'devextreme-vue/form';
import notify from "devextreme/ui/notify";

export default {

  components: {
    DxButton,DxDrawer,DxToolbar,DxPopup,DxSelectBox,DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel
  },
  props: {
    templateData: {
      type: Object,
      default: () => {
      },
    }
  },
  data() {
    return {
      propertyItems: [],
      editModel: {},
      toolbarContent: [
        {
          widget: 'dxButton',
          location: 'before',
          options: {
            icon: 'save',
            text: 'Сохранить',
            type:'success   ',
            stylingMode:'outlined',
            onClick: () => this.saveModel()
          }
        },
        {
          widget: 'dxButton',
          location: 'before',
          options: {
            icon: 'refresh',
            hint: 'Обновить данные',
            text: 'Обновить',
            onClick: () => this.refresh()
          }
        }],
      isVisibleForm: false,
      formModelId: -1,
      selectionMode: 'multiple',
      actionButton: null,
    }
  },
  computed: {
    dataGrid: function () {
      return this.$refs["dataGrid"].instance;
    },
  },
  mounted() {
  },
  methods: {
    saveModel()
    {
      this.$http.post(`/DesignerData/SaveModelSingleForm?formId=${this.formModelId}`, this.editModel, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          notify("Данные успешно сохранены", 'success', 10000, 600)
        })
        .catch(function (error) {
          console.log(error);
          notify("Не удлаось сохранить данные", 'error', 10000, 600)
        });
    },
    refresh()
    {
      this.loadData(this.formModelId)
    },
    getProperys: async function (formId) {
      await this.$http.post(`/DesignerData/GetProppertysSingleForm?formId=${formId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.propertyItems = JSON.parse(response.data);
        })
        .catch(function (error) {
          console.log(error);
          notify("Не удалось получить данные", 'error', 10000, 600)
        });
    },
    loadData: async function (modelId) {
      if (modelId == null)
        return;
      this.formModelId = modelId;

      await this.getProperys(modelId);
      await this.$http.post(`/DesignerData/GetFormDataSingle?formId=${modelId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.editModel = response.data;
        })
        .catch(function (error) {
          console.log(error);
          notify("Не удалось получить данные", 'error', 10000, 600)
        });
    },
  }
}
