/*
* @Author: Just be free
* @Date:   2020-10-28 12:10:05
* @Last Modified by:   Just be free
* @Last Modified time: 2021-06-07 16:20:19
* @E-mail: justbefree@126.com
*/
import { h, withDirectives, vShow, VNode } from "vue";
import Queen, { mixins, prop, Options } from "../component/Queen";
import QFlex from "../flex";
import QFlexItem from "../flex-item";
import QPopup from "../popup";
import QSpin from "../spin";
class Props {
  modelValue = prop<boolean>({ default: false })
  title = prop<string>({ default: "标题" })
  actions = prop<Array<any>>({ default: () => [] })
  showCancel = prop<boolean>({ default: false })
  cancelText = prop<string>({ default: "取消" })
  loading = prop<boolean>({ default: false })
  iconType = prop<string>({ default: "tripleBounce" })
  iconSize = prop<number>({ default: 36 })
  iconColor?: string
}

@Options({
  name: "QActionSheet",
  emits: ["update:modelValue", "getselected", "beforeenter", "enter", "afterenter", "beforeleave", "leave", "afterleave"]
})
export default class QActionSheet extends mixins(Queen).with(Props) {
  public static componentName = "QActionSheet";
  handleChange(e: boolean): void {
    this.$emit("update:modelValue", e);
  }
  handleCancel(): void {
    this.handleChange(false);
  }
  handleItemClick(e: any) {
    if (e && e.disable) {
      return false;
    }
    this.$emit("getselected", e);
    this.handleChange(false);
  }
  createList(): VNode[] {
    const list = [];
    if (this.loading) {
      list.push(
        h("li", { class: ["q-action-sheet-loading-warpper"] }, [
          h(QSpin,
            {
              class: ["loading"],
              type: this.iconType,
              size: this.iconSize,
              color: this.iconColor
            },
            { default: () => [] }
          )
        ])
      );
    } else {
      this.actions.forEach((action: any, index: number) => {
        const className = Array.isArray(action.className)
          ? action.className
          : [action.className];
        const key = action.key || index;
        const disable = action.disable ? "disable" : "";
        list.push(
          h(
            "li",
            {
              key: key,
              class: [...className, disable],
              onClick: this.handleItemClick.bind(this, action)
            },
            [h("span", { class: [`${disable}-text`] }, { default: () => action.name })]
          )
        );
      });
    }
    if (this.showCancel) {
      list.push(
        h(
          "li",
          {
            class: ["q-action-sheet-cancel"],
            onClick: this.handleCancel
          },
          { default: () => [h("span", {}, { default: () => this.cancelText })] }
        )
      );
    }
    return list;
  }
  handleBeforeEnter() {
    this.$emit("beforeenter");
  }
  handleEnter() {
    this.$emit("enter");
  }
  handleAfterEnter() {
    this.$emit("afterenter");
  }
  handleBeforeLeave() {
    this.$emit("beforeleave");
  }
  handleLeave() {
    this.$emit("leave");
  }
  handleAfterLeave() {
    this.$emit("afterleave");
  }
  handleInput(): void {
    this.handleChange(false);
  }
  render() {
    return h("div", { class: ["q-action-sheet"] }, [
      withDirectives(h(QPopup,
        {
          onInput: this.handleInput,
          onBeforeenter: this.handleBeforeEnter,
          onEnter: this.handleEnter,
          onAfterenter: this.handleAfterEnter,
          onBeforeleave: this.handleBeforeLeave,
          onLeave: this.handleLeave,
          onAfterleave: this.handleAfterLeave,
          position: "bottom",
          style: { "max-height": "80%" }
        },
        {
          default: () => [
            h("h3", { class: ["q-action-sheet-title"] }, { default: () => this.title }),
            h("ul", { class: ["q-action-sheet-content"] }, {
              default: () => [this.createList()]
            })
          ]
        }
      ), [[vShow, this.modelValue]])
    ]);
  }
}