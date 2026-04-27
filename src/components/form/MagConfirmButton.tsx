/**
 *   带确认按钮基础封装:
 *   @author: wugz
 *   @since : 2026/01/09
 */
import {defineComponent, h, ref} from "vue";
import {Button, Modal} from "@arco-design/web-vue";

const MagConfirmButton = defineComponent({
  name: "MagConfirmButton",
  props: {
    /* 自定义属性: 基础 */
    header: {type: String, required: false, default: () => "系统提示"},
    message: {type: String, required: true, default: () => "确定要继续吗？"},
    onClick: {type: Function, required: false, default: () => null}
  },
  emits: ["click"],
  setup: function (props, {attrs, slots}) {
    const loadingStatus = ref(false);

    /**
     * 按钮时间
     * @param event
     */
    const onClickFunc = async (event: any) => {
      event && event.stopPropagation();
      if (loadingStatus.value) return;
      loadingStatus.value = true;

      Modal.confirm({
        title: props.header || '系统提示',
        content: () =>
            h('div', {style: 'text-align:center;'}, [
              h('span',
                  {style: 'font-size:16px;'},
                  props.message || '确定要继续吗？'
              )
            ]),
        okText: '确定',
        cancelText: '取消',
        async onOk() {
          try {
            /* 执行定义点击事件 */
            const onClickInternal: any = props?.onClick || attrs?.onClick;
            onClickInternal && await onClickInternal(event);
          } finally {
            loadingStatus.value = false;
          }
        },
        onCancel() {
          loadingStatus.value = false;
        }
      });
    }

    /**
     * 定义返回模板
     */
    return () => {
      return h(Button,
          {
            ...props,
            ...attrs,
            loading: loadingStatus.value,
            onClick: onClickFunc
          }, {
            default: () => slots?.default?.()
          });
    }
  }
});

export default MagConfirmButton;
