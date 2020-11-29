
import {
  DxTreeList,
  DxColumn,
  DxColumnChooser,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxLookup,
  DxEditing
} from 'devextreme-vue/tree-list';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import { access } from '@/components/Settings/enums.js';
import {DxLoadPanel} from 'devextreme-vue/load-panel';

export default {
  name: 'Home',
  components: {
    
    DxLoadPanel,
    DxLookup,
    DxEditing,
    DxToolbar,DxItem,
    DxTreeList,
    DxColumn,
    DxColumnChooser,
    DxHeaderFilter,
    DxSearchPanel,
    DxSelection
  }, props: {
    role: {
      type: Object,
      default: ()=>{}
    },
     isShow: {
   type: Boolean,
   defalut: true
     }
  },
  data() {
    return {
      disabled:function(){
        if(this.forms.length>0){
          this.disable = this.roleId === -1
        }
        else{
          this.disable = true
        }
      },
      access:access,
      show: this.isShow,
      forms: [],
      roleId:-1,
      selectedRowKeys: [],
      height: window.innerHeight / 1.12 - 150,
      disable:true,
      acceptOptions: {
        icon: 'todo',
        hint: "Принять",
        text: "",
        type: "success",
        stylingMode:"outlined",
        onClick: () => {
          this.bindSelectedToRole();
        }
      },
      loadPanel: {
        enabled:true,
        height:90,
        indicatorSrc:"",
        shading:false,
        shadingColor:"",
        showIndicator:true,
        showPane:true,
        text:"Загрузка...",
        width:200
      }
    }
  },
  methods: {
    async initialize(id){
      this.forms=[]      
      await this.loadForms(id);
      this.disabled()      
    },
    refresh() {
      this.loadForms(this.role.id)
    },
    bindSelectedToRole() {
      this.bindModesToRole()
    },
    bindModesToRole() {
      if (this.roleId === undefined) {
        this.forms = []
        return
      }
      if (this.forms.lentgh === 0) {
        this.forms = []
        return
      }
      this.$http.post(`/ModesSet/EditAccess?idRole=${this.roleId}`, this.forms, {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
          this.forms = []
        });
    },
    loadForms:async function (idRole) {
      if (idRole === undefined || idRole === null) {
        return
      }
      this.roleId = idRole
      await this.$http.post(`/ModesSet/GetTree?idRole=${idRole}`, '', {
        headers: {
          Authorization: `Bearer ${this.$cookie.get('accessToken')}`
        }
      })
        .then((response) => {
          this.forms = response.data;
        })
        .catch(function (error) {
          console.log(error);
          this.forms = []
        });
    },
  }, computed: {
    acceptDisabled(){
      this.disabled()
      return this.disable;
    }
  }
}