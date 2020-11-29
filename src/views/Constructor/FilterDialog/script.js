import { DxPopup} from 'devextreme-vue';
import DxButton from 'devextreme-vue/button';
export default {

  components: {
    FilterForm: () => import('@/views/Constructor/FilterForm/FilterForm'),
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
  },
  mounted() {
  },
  methods: {
    async openForm(formId, actionButton) {
      this.isVisibleForm = true;
      this.$refs["filterForm"].isLoad = true;
      this.$refs["filterForm"].filterModelData = {};
      if (actionButton != undefined && actionButton.CaptionDialogFormModel != undefined){
        this.captionForm = actionButton.CaptionDialogFormModel
      }
      this.actionButton = actionButton;
      await this.$refs["filterForm"].loadFitersDialog(formId,actionButton.id);
    },
    onOk(){
      console.log(this.$refs["filterForm"].validateForm());
      if (this.$refs["filterForm"].validateForm().isValid == true) {
        this.isVisibleForm = false;
        this.$emit("click:ok", this.actionButton.sysName, this.$refs["filterForm"].filterModelData, null, this.actionButton);
      }
    },
    onClose(){
        this.isVisibleForm = false
    }
  }
}
