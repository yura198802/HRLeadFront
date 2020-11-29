import {DxPopup} from 'devextreme-vue';
import DxButton from 'devextreme-vue/button';
import notify from "devextreme/ui/notify";
import {DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel} from 'devextreme-vue/form';

export default {

  components: {
    DxButton,
    DxPopup, DxForm, DxSimpleItem, DxButtonItem, DxRequiredRule, DxEmptyItem, DxLabel
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
      filterModelData: {},
      propertyFilterItems: [],
      formId: 0,
      buttonId: 0,
      isLoad: true,
      calendarDate: []
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    async loadFitersDialog(formId, buttonId) {
      if (formId === null)
        return;
      this.buttonId = buttonId;
      this.formId = formId;
      this.isLoad = true;
      await this.$http.post(`/DesignerData/GetProperiesFilterPanelDialog?formId=${formId}&buttonId=${buttonId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.propertyFilterItems = response.data;
          this.setEventFilters(this.propertyFilterItems);
          this.isLoad = false;

        })
        .catch(function (error) {
          console.log(error);
          this.isLoad = false;
          notify("Не удалось получить данные для панели фильтра", 'error', 10000, 600)
        });
    },

    loadDataFilterPanel: async function (formId) {
      if (formId === null)
        return;
      this.formId = formId;
      this.isLoad = true;
      await this.$http.post(`/DesignerData/GetProperiesFilterPanel?formId=${formId}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.propertyFilterItems = response.data;
          this.setEventFilters(this.propertyFilterItems);
          this.isLoad = false;

        })
        .catch(function (error) {
          console.log(error);
          this.isLoad = false;
          notify("Не удалось получить данные для панели фильтра", 'error', 10000, 600)
        });
    },

    setEventFilters(e) {
      let index = 0;
      for (index = 0; index < e.length; ++index) {
        let element = e[index];
        if (element.editorOptions != null && element.editorOptions.onValueChanged != null) {
          this.filterModelData[element.dataField] = element.value;
          element.editorOptions.onValueChanged = async () => await this.filterSucces(element);
        }

        if (element.editorType === "dxCalendar") {
          this.calendarDate = element.sqlData;
        }
      }
    },
    async filterSucces(e) {
      if (this.isLoad === true)
        return;
      if (e.editorType == "dxCalendar" || e.editorType == "dxDateBox")
        this.filterModelData[e.dataField] = new Date(this.filterModelData[e.dataField]);
      if (this.buttonId == null || this.buttonId == 0) {
        await this.LoadFilterReference(e);

      }
      this.$emit("click:editChangeFilter", e, this.filterModelData);
      this.$http.post(`/DesignerData/SaveFilterDialogValue?formId=${this.formId}&buttonId=${this.buttonId}`, this.filterModelData, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {

        })
        .catch(function (error) {
          console.log(error);
          notify("Не удалось сохранить данные фильтра", 'error', 10000, 600)
        });
    },
    async LoadFilterReference(editModel) {
      let filters = this.propertyFilterItems.filter(function (item) {
        return  item.parentId == editModel.idProp;;
      });
      console.log(filters);
      for (const item of filters) {
        await this.LoadFilterPanel(item);
      }
    },
    LoadFilterPanel(element)
    {
      this.$http.post(`/DesignerData/GetLoadDataFilterModel?idFilter=${element.idProp}`, this.filterModelData, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          console.log(response.data);
          if (element.editorType === "dxCalendar")
            this.calendarDate = response.data;
          else if (element.editorType === "dxSelectBox")
          {
            element.editorOptions.dataSource.store = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
          notify("Не удалось сохранить данные фильтра", 'error', 10000, 600)
        });
    },
    validateForm() {
      return this.$refs["formFilter"].instance.validate();
    },
    isWeekend(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    },
    getCellCssClass(date, cell) {
      let cssClass = '';

      if (this.isWeekend(date) && cell.view === "month") {
        cssClass = 'weekend';
      }
      // console.log(this.calendarDate[0].Date);
      if (this.calendarDate != null)
        this.calendarDate.forEach((item) => {
          if (date.toJSONLocal() === item.Date) {
            cssClass = 'holyday';
            return false;
          }
        });

      return cssClass;
    }
  }
}
