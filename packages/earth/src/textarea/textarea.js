/*
 * @Author: Just be free
 * @Date:   2021-12-29 13:41:28
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-12-30 17:51:11
 * @E-mail: justbefree@126.com
 */

import { defineComponent } from "../modules/component";
import { getPropertyValue } from "../modules/dom/style";
import { getScroller } from "../modules/dom/scroll";
import { clearBr } from "../modules/utils";
export default defineComponent({
  name: "Textarea",
  props: {
    value: String,
    maxHeight: {
      type: Number,
      default: 200,
    },
    fixedCursor: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scrollElement: null,
      minHeight: 24,
      wrapped: false,
      focused: false,
    };
  },
  computed: {
    className() {
      return `${this.focused ? "focused" : "blured"}-${
        this.wrapped ? "wrapped" : "unwrapped"
      }`;
    },
  },
  methods: {
    autoWrap(elem) {
      let scrollTop,
        extra = 0,
        height,
        padding = 0,
        minHeight = this.minHeight,
        maxHeight = this.maxHeight,
        style = elem.style;
      if (elem._length === elem.value.length) return;
      elem._length = elem.value.length;
      padding =
        parseInt(getPropertyValue(elem, "padding-top")) +
        parseInt(getPropertyValue(elem, "padding-bottom"));
      scrollTop = this.scrollElement.scrollTop;
      elem.style.height = minHeight + "px";
      if (elem.scrollHeight - padding > minHeight) {
        this.wrapped = true;
      } else {
        this.wrapped = false;
      }
      if (elem.scrollHeight > minHeight) {
        if (maxHeight && elem.scrollHeight > maxHeight) {
          height = maxHeight - padding;
          style.overflowY = "auto";
        } else {
          height = elem.scrollHeight - padding;
          style.overflowY = "hidden";
        }
        style.height = height + extra + "px";
        scrollTop += parseInt(style.height) - elem.currHeight;
        this.scrollElement.scrollTop = scrollTop;
        elem.currHeight = parseInt(style.height);
      }
    },
    handleInput(e) {
      this.$emit("change", { e, wrapped: this.wrapped, focused: this.focused });
      this.$emit("input", clearBr(e.target.value));
      this.autoWrap(e.target);
    },
    handleFocus(e) {
      const value = e.target.value;
      this.focused = true;
      this.$emit("focus", { e, wrapped: this.wrapped, focused: this.focused });
      if (this.fixedCursor && value !== "") {
        e.target.value = "";
        this.$emit("input", "");
        const timer = setTimeout(() => {
          e.target.value = value;
          this.$emit("input", clearBr(value));
          clearTimeout(timer);
        }, 0);
      }
    },
    handleBlur(e) {
      this.focused = false;
      this.$emit("blur", { e, wrapped: this.wrapped, focused: this.focused });
    },
  },
  mounted() {
    this.scrollElement = getScroller(this.$el);
    this.minHeight = parseInt(getPropertyValue(this.$el, "height"));
  },
  render(h) {
    const props = this.$props;
    return h(
      "textarea",
      {
        class: ["yn-textarea", this.className],
        attrs: { ...props },
        domProps: { value: this.value },
        on: {
          input: this.handleInput,
          focus: this.handleFocus,
          blur: this.handleBlur,
        },
      },
      []
    );
  },
});