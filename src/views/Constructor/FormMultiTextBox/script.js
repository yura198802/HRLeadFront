import DxButton from 'devextreme-vue/button';
import DxTextArea from 'devextreme-vue/text-area';
import DxForm, {
  DxSimpleItem,
  DxLabel
} from 'devextreme-vue/form';
import get from "@babel/runtime-corejs2/helpers/esm/get";

export default {

  components: {
    DxButton, DxTextArea, DxForm, DxSimpleItem,
    DxLabel
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
      valueReady:true,
      value: []
    }
  },
  computed: {
    // valueTmp: {
    //   get: function () {
    //     return this.value;
    //   },
    //   set: function (newValue) {
    //     this.value = newValue;
    //   }
    // }

  },
  mounted() {
  },
  methods: {
    click() {
      if (this.value.length == 0) {
        this.value.push({id: 1, value: ''});
      } else {
        let maxValue = this.value[this.value.length - 1].id;
        this.value.push({id: maxValue + 1, value: ''});
      }
    },
    dataLoad: function (items) {
      this.valueReady = false;
      console.log(1, items);
      console.log(2, this.value);
      // this.value.splice(0, this.value.length -1);
      this.value = [...items, ...this.value];
      console.log(3, this.value);
      this.valueReady = true;
    },
    trash(item) {
      let ind = this.value.lastIndexOf(item);
      this.value.splice(ind, 1);
    },
    getPhonesOptions: function (e, index) {
      this.value[e.element.id].value = e.value;
    },
  }
}
