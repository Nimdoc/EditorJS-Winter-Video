import App from './App.svelte'

export default class WinterVideo {
  constructor({ data }) {

    if (!data || Object.keys(data).length === 0) {
      this.data = {
        file: {
          url: ''
        },
        caption: '',
        alt: '',
        withBorder: false,
        withBackground: false,
        stretched: false,
      }
    } else {
      this.data = data;
    }

    this.el = document.createElement('div');

    this.app = new App({
      target: this.el,
      props: {
        data: this.data,
      }
    })

    this.app.$on('updateData', this.updateData);
  }

  static get toolbox() {
    return {
      title: 'Winter Video',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  updateData = (data) => {
    if (!data.detail) {
      return;
    }

    this.data = data.detail;
  }

  render() {
    return this.el;
  }

  save(blockContent) {
    return this.data;
  }
}
