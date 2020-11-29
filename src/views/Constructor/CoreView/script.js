import MainView from '../MainView/MainView.vue';
import DesignerDictionary from '../DesignerDictionary/DesignerDictionary.vue';
import SingleForm from '../SingleForm/SingleForm'
import Viewer from '../../Reports/Viewer/viewer'
import diag from  '../../../components/Diag/diag.vue'
import diagSoftSkill from  '../../../components/DiagSkillSoft/diag.vue'
import RootLead from  '../RootLeadAddTemplate/RootLeadAddTemplate'


export default {
  components: {
    Users: () => import('@/components/Users/Users'),
    MainView,
    DesignerDictionary,
    Settings: () => import("@/views/Settings/settings"),
    Designer: () => import("@/views/Reports/Designer/designer"),
    diag,RootLead,diagSoftSkill,
    Viewer,
    SingleForm
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
      contentTemplate: this.templateData.typeEditorForm == "Edit" ? 'SingleForm' : this.templateData.vueComponent
    }
  },
  mounted() {
    if (this.templateData.typeEditorForm == "Edit")
    {
      this.contentTemplate = 'SingleForm';
      this.$refs.componentModel.loadData(this.templateData.idModel);
    }
    else if (this.templateData.vueComponent === "DesignerDictionary" && this.templateData.fieldWhere === null)
    {
      this.contentTemplate = this.templateData.vueComponent;
      this.$refs.componentModel.loadDataModel(this.templateData);
    this.forceUpdate
    }
    else if(this.templateData.vueComponent == "Viewer")
    {
      console.log(this.$refs.componentModel);
      this.contentTemplate = "Viewer";
      this.$refs.componentModel.loader(this.templateData.id);
    }
  },
  methods: {
    loadDataDetailModel: function (idModel, fieldWhere) {
      console.log(this.templateData.vueComponent);
      if (this.templateData.vueComponent == "DesignerDictionary") {
        this.$refs.componentModel.loadDataModel(this.templateData, idModel, fieldWhere);
      }
      else if (this.templateData.TypeEditorForm == "Edit") {

      }
      if (this.templateData.vueComponent.startsWith("diag") )
      {
        this.$refs.componentModel.getPurchases(idModel);
      }
    }

  }
}
