/**
 *   对话框的基础封装:
 *   1. 标题
 *   2. 默认宽度, 高度(统一)
 *   @author: wugz
 *   @since : 2025/12/13
 */
import {defineComponent} from "vue";
import {Modal} from "@arco-design/web-vue";

const MagDialogBox = defineComponent({
  name: "MagDialogBox",
  props: {
    /* 对话框自定义属性: 基础 */
    header: {type: String, required: false, default: "对话框标题"},
    width: {type: [String, Number], required: false, default: "60%"},
    height: {type: [String, Number], required: false, default: "100%"}
  },
  setup: function (props, {attrs, slots}) {

    /**
     * 定义返回模板
     */
    return () => {
      return <Modal
          {...props}
          {...attrs}
          title-align="start"
          draggable={true}
          v-slots={{
            title: () => <span>{props.header}</span>
          }}
      >
        <div style={{height: props.height}}>
          {slots?.default?.()}
        </div>
      </Modal>
    }
  }
});

export default MagDialogBox;
