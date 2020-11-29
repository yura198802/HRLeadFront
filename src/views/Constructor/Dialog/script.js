import { DxPopup} from 'devextreme-vue';
import DxButton from 'devextreme-vue/button';

export default {

  components: {
    DesignerDataGrid: () => import('@/views/Constructor/DesignerDataGrid/DesignerDataGrid'),
    DxButton,
    DxPopup
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
      captionForm: '',
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
    async openForm(formId,sysNameDialogForm,selectionMode, actionButton) {
      this.isVisibleForm = true
      if (actionButton != undefined && actionButton.CaptionDialogFormModel != undefined){
        this.captionForm = actionButton.CaptionDialogFormModel
      }
      
      this.selectionMode = selectionMode;
      this.actionButton = actionButton;
      await this.$refs["dataGrid"].loadDataModel(formId,sysNameDialogForm,selectionMode,actionButton);
    },
    onOk(){
      this.isVisibleForm = false
      this.$emit("click:ok",this.$refs["dataGrid"].getSelectedIds(),this.selectionMode,this.actionButton)
    },
    onClose(){
      this.isVisibleForm = false
    }
  }
}
